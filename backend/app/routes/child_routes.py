from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List
import uuid

from app.core.database import get_session
from app.core.dependencies import get_current_user
from app.models.domain import Usuario, Crianca
from app.schemas.child_schema import CriancaCreate, CriancaResponse, CriancaUpdate

router = APIRouter(prefix="/api/children", tags=["Crianças"])

@router.post("/", response_model=CriancaResponse, status_code=status.HTTP_201_CREATED)
def cadastrar_crianca(
    crianca_in: CriancaCreate,
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Cadastra a criança vinculando ao usuário logado e tratando os Arrays."""
    nova_crianca = Crianca(
        id=str(uuid.uuid4()),
        usuarioId=current_user.id,
        nome=crianca_in.nome,
        dataNascimento=crianca_in.dataNascimento,
        temasPreferidos=crianca_in.temasPreferidos,
        restricoesMedicas=crianca_in.restricoesMedicas
    )
    
    session.add(nova_crianca)
    session.commit()
    session.refresh(nova_crianca)
    return nova_crianca

@router.get("/", response_model=List[CriancaResponse])
def listar_minhas_criancas(
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Retorna a lista de crianças do cuidador atual."""
    statement = select(Crianca).where(Crianca.usuarioId == current_user.id)
    return session.exec(statement).all()

@router.patch("/{crianca_id}", response_model=CriancaResponse)
def atualizar_perfil_crianca(
    crianca_id: str,
    crianca_update: CriancaUpdate,
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Atualiza temas preferidos ou restrições médicas do perfil."""
    statement = select(Crianca).where(
        Crianca.id == crianca_id, 
        Crianca.usuarioId == current_user.id
    )
    crianca = session.exec(statement).first()
    
    if not crianca:
        raise HTTPException(status_code=404, detail="Criança não encontrada.")
    
    update_data = crianca_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(crianca, key, value)
        
    session.add(crianca)
    session.commit()
    session.refresh(crianca)
    return crianca

@router.delete("/{crianca_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_crianca(
    crianca_id: str,
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Deleta o perfil de uma criança (apenas se pertencer ao usuário logado)."""
    statement = select(Crianca).where(
        Crianca.id == crianca_id, 
        Crianca.usuarioId == current_user.id
    )
    crianca = session.exec(statement).first()
    
    if not crianca:
        raise HTTPException(
            status_code=404, 
            detail="Criança não encontrada ou você não tem permissão para excluí-la."
        )
        
    session.delete(crianca)
    session.commit()
    return None
