from sqlmodel import SQLModel, Field
from typing import Optional, List
from datetime import datetime, date
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import ARRAY

class Usuario(SQLModel, table=True):
    __tablename__ = "usuarios"
    
    id: str = Field(primary_key=True)
    nome: str
    email: str
    telefone: str
    senhaHash: str
    perfil: str = Field(default="RESPONSAVEL") 
    criadoEm: datetime = Field(default_factory=datetime.utcnow)

class ProfissionalPaciente(SQLModel, table=True):
    __tablename__ = "profissional_paciente"
    profissionalId: str = Field(foreign_key="usuarios.id", primary_key=True)
    criancaId: str = Field(foreign_key="criancas.id", primary_key=True)

class Crianca(SQLModel, table=True):
    __tablename__ = "criancas"

    id: str = Field(primary_key=True)
    usuarioId: str = Field(foreign_key="usuarios.id")
    nome: str
    dataNascimento: date
    temasPreferidos: List[str] = Field(
        default_factory=list,
        sa_column=Column(ARRAY(String), nullable=False)
    )
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


class FeedingLog(SQLModel, table=True):
    __tablename__ = "feeding_logs"

    id: str = Field(primary_key=True)
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    usuarioId: str = Field(foreign_key="usuarios.id")
    criancaId: str = Field(foreign_key="criancas.id")
    alimentoId: int = Field(foreign_key="alimentos.id")
    reacao: int
    origem: str

class SensoryFeedback(SQLModel, table=True):
    __tablename__ = "sensory_feedbacks"

    id: Optional[int] = Field(default=None, primary_key=True)
    feedingLogId: str = Field(foreign_key="feeding_logs.id")
    atributo: str
    gostou: bool
