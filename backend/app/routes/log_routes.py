from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
import uuid

from app.core.database import get_session
from app.core.dependencies import get_current_user

from app.models.domain import (
    Usuario,
    Crianca,
    Alimento,
    FeedingLog,
    SensoryFeedback,
    ProfissionalPaciente,
)

from app.schemas.log_schema import (
    FeedingLogCreate,
    FeedingLogResponse,
    FeedingLogUpdate,
)

router = APIRouter(
    prefix="/api/feeding-logs",
    tags=["Diário Alimentar & IoT"],
)


def verificar_acesso_crianca(
    session: Session,
    current_user: Usuario,
    crianca_id: str,
):
    """
    Verifica se o usuário atual pode acessar os dados da criança.

    Acesso permitido para:
    1. Responsável da criança.
    2. Profissional vinculado à criança através de ProfissionalPaciente.

    Retorna a criança caso o acesso seja permitido.
    """

    crianca = session.exec(
        select(Crianca).where(
            Crianca.id == crianca_id,
            Crianca.usuarioId == current_user.id,
        )
    ).first()

    if crianca:
        return crianca

    vinculo = session.exec(
        select(ProfissionalPaciente).where(
            ProfissionalPaciente.criancaId == crianca_id,
            ProfissionalPaciente.profissionalId == current_user.id,
        )
    ).first()

    if vinculo:
        crianca = session.get(Crianca, crianca_id)

        if crianca:
            return crianca

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Acesso negado aos dados desta criança.",
    )


@router.post(
    "/",
    response_model=FeedingLogResponse,
    status_code=status.HTTP_201_CREATED,
)
def registrar_log(
    log_in: FeedingLogCreate,
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """
    Registra uma refeição e, opcionalmente,
    múltiplos feedbacks sensoriais simultâneos.
    """

    crianca = session.exec(
        select(Crianca).where(
            Crianca.id == log_in.criancaId,
            Crianca.usuarioId == current_user.id,
        )
    ).first()

    if not crianca:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado aos dados desta criança.",
        )

    alimento = session.get(Alimento, log_in.alimentoId)

    if not alimento:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alimento não encontrado no catálogo.",
        )

    log_id = str(uuid.uuid4())

    novo_log = FeedingLog(
        id=log_id,
        usuarioId=current_user.id,
        criancaId=log_in.criancaId,
        alimentoId=log_in.alimentoId,
        reacao=log_in.reacao,
        origem=log_in.origem,
    )

    session.add(novo_log)

    feedbacks_db = []

    if log_in.feedbacks:
        for fb in log_in.feedbacks:
            novo_fb = SensoryFeedback(
                feedingLogId=log_id,
                atributo=fb.atributo,
                gostou=fb.gostou,
            )

            session.add(novo_fb)
            feedbacks_db.append(novo_fb)

    session.commit()
    session.refresh(novo_log)

    for fb in feedbacks_db:
        session.refresh(fb)

    response = FeedingLogResponse.model_validate(novo_log)
    response.feedbacks = feedbacks_db

    return response


@router.get(
    "/crianca/{crianca_id}",
    response_model=List[FeedingLogResponse],
)
def listar_logs_da_crianca(
    crianca_id: str,
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """
    Lista o histórico alimentar de uma criança.

    Permite acesso:
    - ao responsável da criança;
    - ao profissional vinculado à criança.
    """

    verificar_acesso_crianca(
        session=session,
        current_user=current_user,
        crianca_id=crianca_id,
    )

    logs = session.exec(
        select(FeedingLog)
        .where(
            FeedingLog.criancaId == crianca_id
        )
        .order_by(
            FeedingLog.timestamp.desc()
        )
    ).all()

    response_list = []

    for log in logs:
        log_resp = FeedingLogResponse.model_validate(log)

        alimento = session.get(
            Alimento,
            log.alimentoId
        )

        log_resp.alimento = alimento

        feedbacks = session.exec(
            select(SensoryFeedback).where(
                SensoryFeedback.feedingLogId == log.id
            )
        ).all()

        log_resp.feedbacks = feedbacks

        response_list.append(log_resp)

    return response_list


@router.delete(
    "/{log_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def deletar_log(
    log_id: str,
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """
    Apaga um registro e as suas respostas sensoriais.
    """

    log = session.get(FeedingLog, log_id)

    if not log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Registro não encontrado.",
        )

    if log.usuarioId != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado.",
        )

    feedbacks = session.exec(
        select(SensoryFeedback).where(
            SensoryFeedback.feedingLogId == log_id
        )
    ).all()

    for fb in feedbacks:
        session.delete(fb)

    session.delete(log)
    session.commit()

    return None


@router.patch(
    "/{log_id}",
    response_model=FeedingLogResponse,
)
def atualizar_log(
    log_id: str,
    log_update: FeedingLogUpdate,
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    """
    Atualiza a reação ou a origem de um registro existente.
    """

    log = session.get(FeedingLog, log_id)

    if not log:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Registro não encontrado.",
        )

    if log.usuarioId != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado.",
        )

    update_data = log_update.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(log, key, value)

    session.add(log)
    session.commit()
    session.refresh(log)

    response = FeedingLogResponse.model_validate(log)

    feedbacks = session.exec(
        select(SensoryFeedback).where(
            SensoryFeedback.feedingLogId == log.id
        )
    ).all()

    response.feedbacks = feedbacks

    return response
