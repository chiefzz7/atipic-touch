from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.core.database import get_session
from app.models.domain import Usuario
from app.schemas.auth_schema import LoginRequest, TokenResponse
from app.core.security import verify_password, create_access_token

router = APIRouter(prefix="/api/auth", tags=["Autenticação"])

@router.post("/login", response_model=TokenResponse)
def login(credenciais: LoginRequest, session: Session = Depends(get_session)):
    statement = select(Usuario).where(Usuario.email == credenciais.email)
    usuario = session.exec(statement).first()

    if not usuario or not verify_password(credenciais.senha, usuario.senhaHash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas!",
            headers={"WWW-Autenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": usuario.id})

    return {"access_token": access_token, "token_type": "bearer"}
