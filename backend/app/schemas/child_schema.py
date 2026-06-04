from pydantic import BaseModel
from typing import List, Optional
from datetime import date
import uuid

class CriancaBase(BaseModel):
    nome: str
    dataNascimento: date
    temasPreferidos: List[str] = [] 
    restricoesMedicas: Optional[str] = None

class CriancaCreate(CriancaBase):
    """Dados necessários para cadastrar (Input)"""
    pass

class CriancaUpdate(BaseModel):
    """Dados para edição parcial (Patch)"""
    nome: Optional[str] = None
    dataNascimento: Optional[date] = None
    temasPreferidos: Optional[List[str]] = None
    restricoesMedicas: Optional[str] = None

class CriancaResponse(CriancaBase):
    """Dados que saem para o Mobile (Output)"""
    id: str
    usuarioId: str

    class Config:
        from_attributes = True
