from fastapi import APIRouter, Depends
from sqlmodel import Session

from app.core.database import get_session
from app.schemas.user_schema import UsuarioCreate, UsuarioResponse
from app.services.user_service import criar_usuario

router = APIRouter(prefix="/api/users", tags=["Usuários"])

@router.post("/", response_model=UsuarioResponse, status_code=201)
def registrar_usuario(user_in: UsuarioCreate, session: Session = Depends(get_session)):
    return criar_usuario(session=session, user_in=user_in)
