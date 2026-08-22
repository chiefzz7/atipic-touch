from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    telefone: str
    senha: str
    perfil: str = "RESPONSAVEL" 


class UsuarioResponse(BaseModel):
    id: str
    nome: str
    email: EmailStr
    telefone: str
    perfil: str 
    criadoEm: datetime

    class Config:
        from_attributes = True


class UsuarioUpdate(BaseModel):
    nome: Optional[str] = None
    telefone: Optional[str] = None
    