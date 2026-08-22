from sqlmodel import Session, select
from fastapi import HTTPException, status
import uuid

from app.models.domain import Usuario
from app.schemas.user_schema import UsuarioCreate, ProfissionalCreate
from app.core.security import get_password_hash


def criar_usuario(session: Session, user_in: UsuarioCreate) -> Usuario:
    statement = select(Usuario).where(Usuario.email == user_in.email)
    usuario_existente = session.exec(statement).first()

    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já está sendo utilizado!"
        )

    novo_id = str(uuid.uuid4())

    db_usuario = Usuario(
        id=novo_id,
        nome=user_in.nome,
        email=user_in.email,
        telefone=user_in.telefone,
        senhaHash=get_password_hash(user_in.senha),
        perfil=user_in.perfil
    )

    session.add(db_usuario)
    session.commit()
    session.refresh(db_usuario)

    return db_usuario


def criar_profissional(
    session: Session,
    user_in: ProfissionalCreate
) -> Usuario:
    statement = select(Usuario).where(Usuario.email == user_in.email)
    usuario_existente = session.exec(statement).first()

    if usuario_existente:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já está sendo utilizado!"
        )

    novo_id = str(uuid.uuid4())

    db_usuario = Usuario(
        id=novo_id,
        nome=user_in.nome,
        email=user_in.email,
        telefone=user_in.telefone,
        senhaHash=get_password_hash(user_in.senha),
        perfil="PROFISSIONAL"
    )

    session.add(db_usuario)
    session.commit()
    session.refresh(db_usuario)

    return db_usuario
