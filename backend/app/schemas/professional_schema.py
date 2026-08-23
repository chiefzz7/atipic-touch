from pydantic import BaseModel
from typing import List


class ProfessionalPatientResponse(BaseModel):
    id: str
    nome: str
    childrenCount: int


class ProfessionalChildResponse(BaseModel):
    id: str
    nome: str
    dataNascimento: str
    temasPreferidos: List[str]
    restricoesMedicas: str | None
    usuarioId: str
    