from pydantic import BaseModel
from typing import List
from datetime import date


class ProfessionalPatientResponse(BaseModel):
    id: str
    nome: str
    childrenCount: int


class ProfessionalChildResponse(BaseModel):
    id: str
    nome: str
    dataNascimento: date
    temasPreferidos: List[str]
    restricoesMedicas: str | None
    usuarioId: str

    class Config:
        from_attributes = True
        