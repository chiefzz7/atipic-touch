from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session
import jwt
from jwt.exceptions import InvalidTokenError

from app.core.database import get_session
from app.core.config import SECRET_KEY, ALGORITHM
from app.models.domain import Usuario


security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    session: Session = Depends(get_session)
) -> Usuario:
    token = credentials.credentials

    credenciais_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        usuario_id = payload.get("id")

        if usuario_id is None:
            raise credenciais_exception

    except InvalidTokenError:
        raise credenciais_exception

    usuario = session.get(Usuario, usuario_id)

    if usuario is None:
        raise credenciais_exception

    return usuario


def get_current_professional(
    current_user: Usuario = Depends(get_current_user)
) -> Usuario:
    """
    Permite acesso somente a usuários com perfil PROFISSIONAL.
    """

    if current_user.perfil != "PROFISSIONAL":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso permitido somente para profissionais."
        )

    return current_user
