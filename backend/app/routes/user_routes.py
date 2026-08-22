from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.database import get_session
from app.schemas.user_schema import (
    UsuarioCreate,
    ProfissionalCreate,
    UsuarioResponse,
    UsuarioUpdate
)
from app.services.user_service import (
    criar_usuario,
    criar_profissional
)
from app.models.domain import Usuario
from app.core.dependencies import get_current_user


router = APIRouter(
    prefix="/api/users",
    tags=["Usuários"]
)


@router.post(
    "/",
    response_model=UsuarioResponse,
    status_code=201
)
def registrar_usuario(
    user_in: UsuarioCreate,
    session: Session = Depends(get_session)
):
    return criar_usuario(
        session=session,
        user_in=user_in
    )


@router.post(
    "/profissionais",
    response_model=UsuarioResponse,
    status_code=201
)
def registrar_profissional(
    user_in: ProfissionalCreate,
    session: Session = Depends(get_session)
):
    return criar_profissional(
        session=session,
        user_in=user_in
    )


@router.get(
    "/me",
    response_model=UsuarioResponse
)
def ler_meu_perfil(
    current_user: Usuario = Depends(get_current_user)
):
    """Retorna os dados do usuário logado baseado no Token JWT."""

    return current_user


@router.patch(
    "/me",
    response_model=UsuarioResponse
)
def atualizar_meu_perfil(
    user_update: UsuarioUpdate,
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Atualiza os dados do usuário logado."""

    user_data = user_update.model_dump(exclude_unset=True)

    for key, value in user_data.items():
        setattr(current_user, key, value)

    session.add(current_user)
    session.commit()
    session.refresh(current_user)

    return current_user
