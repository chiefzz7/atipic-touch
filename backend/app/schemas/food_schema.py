from pydantic import BaseModel
from typing import Optional

class AlimentoBase(BaseModel):
    nome: str
    categoria: str
    cor: str
    textura: str
    sabor: str
    cheiro: str
    temperatura: str

class AlimentoCreate(AlimentoBase):
    """Dados necessários para inserir um alimento no cardápio base."""
    pass

class AlimentoUpdate(BaseModel):
    """Permite editar apenas alguns atributos do alimento (Patch)."""
    nome: Optional[str] = None
    categoria: Optional[str] = None
    cor: Optional[str] = None
    textura: Optional[str] = None
    sabor: Optional[str] = None
    cheiro: Optional[str] = None
    temperatura: Optional[str] = None

class AlimentoResponse(AlimentoBase):
    """Como o alimento será devolvido na API para o Mobile/Web."""
    id: int

    class Config:
        from_attributes = True
