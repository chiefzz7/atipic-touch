from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from app.core.database import get_session
from app.core.dependencies import get_current_user
from app.models.domain import Usuario, Alimento
from app.schemas.food_schema import AlimentoCreate, AlimentoResponse, AlimentoUpdate

router = APIRouter(prefix="/api/foods", tags=["Catálogo de Alimentos"])

@router.post("/", response_model=AlimentoResponse, status_code=status.HTTP_201_CREATED)
def cadastrar_alimento(
    alimento_in: AlimentoCreate,
    current_user: Usuario = Depends(get_current_user), # Porteiro JWT ativo
    session: Session = Depends(get_session)
):
    """Cadastra um novo alimento no catálogo geral padronizado."""
    novo_alimento = Alimento(**alimento_in.model_dump())
    
    session.add(novo_alimento)
    session.commit()
    session.refresh(novo_alimento)
    return novo_alimento

@router.get("/", response_model=List[AlimentoResponse])
def listar_alimentos(
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Lista todos os alimentos disponíveis para seleção na refeição."""
    return session.exec(select(Alimento)).all()

@router.delete("/{alimento_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_alimento(
    alimento_id: int, # Atualizado para aceitar int
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Remove um alimento do catálogo do sistema."""
    alimento = session.get(Alimento, alimento_id)
    if not alimento:
        raise HTTPException(status_code=404, detail="Alimento não encontrado no catálogo.")
        
    session.delete(alimento)
    session.commit()
    return None

@router.patch("/{alimento_id}", response_model=AlimentoResponse)
def atualizar_alimento(
    alimento_id: int,
    alimento_update: AlimentoUpdate,
    current_user: Usuario = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """Atualiza os atributos sensoriais ou informações de um alimento existente."""
    alimento = session.get(Alimento, alimento_id)
    if not alimento:
        raise HTTPException(status_code=404, detail="Alimento não encontrado no catálogo.")
    
    update_data = alimento_update.model_dump(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(alimento, key, value)
        
    session.add(alimento)
    session.commit()
    session.refresh(alimento)
    return alimento
