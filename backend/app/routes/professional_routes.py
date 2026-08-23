from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import List

from app.core.database import get_session
from app.core.dependencies import get_current_professional
from app.models.domain import Usuario
from app.schemas.professional_schema import (
    ProfessionalPatientResponse,
    ProfessionalChildResponse
)
from app.services.professional_service import (
    listar_pacientes_do_profissional,
    listar_criancas_do_paciente
)


router = APIRouter(
    prefix="/api/professionals",
    tags=["Profissionais"]
)


@router.get(
    "/patients",
    response_model=List[ProfessionalPatientResponse]
)
def listar_pacientes(
    current_professional: Usuario = Depends(get_current_professional),
    session: Session = Depends(get_session)
):
    """
    Lista os responsáveis que possuem crianças vinculadas
    ao profissional autenticado.
    """

    return listar_pacientes_do_profissional(
        session=session,
        profissional=current_professional
    )


@router.get(
    "/patients/{responsavel_id}/children",
    response_model=List[ProfessionalChildResponse]
)
def listar_criancas(
    responsavel_id: str,
    current_professional: Usuario = Depends(get_current_professional),
    session: Session = Depends(get_session)
):
    """
    Lista as crianças de um responsável que estão
    vinculadas ao profissional autenticado.
    """

    return listar_criancas_do_paciente(
        session=session,
        profissional=current_professional,
        responsavel_id=responsavel_id
    )
