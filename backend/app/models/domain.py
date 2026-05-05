from sqlmodel import SQLModel, Field
from typing import Optional, List
from datetime import datetime
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import ARRAY

class Usuario(SQLModel, table=True):
    __tablename__ = "usuarios"

    id: str = Field(dafault=None, primary_key=True)
    nome: str
    email: str
    telefone: str
    senhaHash: str
    criadoEm: datetime = Field(default_factory=datetime.utcnow)


class Crianca(SQLModel, table=True):
    __tablename__ = "criancas"

    id: str = Field(default=None, primary_key=True)
    usuarioId: str = Field(foreign_key="usuarios.id")
    nome: str
    idade: str
    temasPreferidos: List[str] = Field(sa_column=Column(ARRAY(String)))
    restricoesMedicas: Optional[str] = None


class Alimento(SQLModel, table=True):
    __tablename__ = "alimentos"

    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    categoria: str
    cor: str
    textura: str
    sabor: str
    cheiro: str
    temperatura: str
