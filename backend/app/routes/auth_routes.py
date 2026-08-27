from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.core.database import get_session
from app.core.security import create_access_token, verify_password
from app.models.domain import Usuario
from app.schemas.auth_schema import LoginRequest, TokenResponse

router = APIRouter(prefix="/api/auth", tags=["Autenticação"])


@router.post("/login", response_model=TokenResponse)
def login_autenticar(
    credentials: LoginRequest,
    session: Session = Depends(get_session)
):
    """
    Valida as credenciais do usuário e gera um token JWT.
    A API não restringe o login por perfil.
    A autorização de acesso deve ser feita nas rotas específicas.
    """

    statement = select(Usuario).where(Usuario.email == credentials.email)
    usuario = session.exec(statement).first()

    if not usuario or not verify_password(
        credentials.senha,
        usuario.senhaHash
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=60)

    access_token = create_access_token(
        data={
            "sub": usuario.email,
            "id": usuario.id,
            "perfil": usuario.perfil
        },
        expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "usuario_id": usuario.id,
        "perfil": usuario.perfil
    }
