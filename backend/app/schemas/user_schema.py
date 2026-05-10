from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UsuarioCreate(BaseModel):
    nome: str
    email: EmailStr
    telefone: str
    senha: str


class UsuarioResponse(BaseModel):
    id: str
    nome: str
    email: EmailStr
    telefone: str
    criadoEm: datetime

    class Config:
        from_attributes = True
