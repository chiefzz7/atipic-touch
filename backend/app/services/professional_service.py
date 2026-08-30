from sqlmodel import Session, select

from fastapi import HTTPException, status

from app.models.domain import (
    Usuario,
    Crianca,
    ProfissionalPaciente,
)


def listar_pacientes_do_profissional(
    session: Session,
    profissional: Usuario,
):
    """
    Retorna os responsáveis que possuem crianças
    vinculadas ao profissional autenticado.
    """

    statement = (
        select(Crianca, Usuario)
        .join(
            ProfissionalPaciente,
            ProfissionalPaciente.criancaId == Crianca.id,
        )
        .join(
            Usuario,
            Usuario.id == Crianca.usuarioId,
        )
        .where(
            ProfissionalPaciente.profissionalId == profissional.id
        )
    )

    resultados = session.exec(statement).all()

    pacientes = {}

    for crianca, responsavel in resultados:
        if responsavel.id not in pacientes:
            pacientes[responsavel.id] = {
                "id": responsavel.id,
                "nome": responsavel.nome,
                "childrenCount": 0,
            }

        pacientes[responsavel.id]["childrenCount"] += 1

    return list(pacientes.values())


def listar_criancas_do_paciente(
    session: Session,
    profissional: Usuario,
    responsavel_id: str,
):
    """
    Retorna somente as crianças do responsável
    que estão vinculadas ao profissional autenticado.
    """

    statement = (
        select(Crianca)
        .join(
            ProfissionalPaciente,
            ProfissionalPaciente.criancaId == Crianca.id,
        )
        .where(
            ProfissionalPaciente.profissionalId == profissional.id,
            Crianca.usuarioId == responsavel_id,
        )
    )

    criancas = session.exec(statement).all()

    return criancas
