from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class SensoryFeedbackBase(BaseModel):
    atributo: str
    gostou: bool


class SensoryFeedbackCreate(SensoryFeedbackBase):
    """
    Dados necessários para registrar
    um feedback sensorial.
    """

    pass


class SensoryFeedbackResponse(SensoryFeedbackBase):
    """
    Como o feedback retorna para o App.
    """

    id: int
    feedingLogId: str

    class Config:
        from_attributes = True


class FeedingLogBase(BaseModel):
    criancaId: str
    alimentoId: int
    reacao: int
    origem: str


class FeedingLogCreate(FeedingLogBase):
    """
    Corpo da requisição POST.
    Permite enviar os feedbacks aninhados.
    """

    feedbacks: Optional[
        List[SensoryFeedbackCreate]
    ] = []


class AlimentoLogResponse(BaseModel):
    """
    Dados do alimento relacionados ao registro alimentar.
    """

    id: int
    nome: str
    categoria: str
    cor: str
    textura: str
    sabor: str
    cheiro: str
    temperatura: str

    class Config:
        from_attributes = True


class FeedingLogResponse(FeedingLogBase):
    """
    Resposta completa devolvida pela API.
    """

    id: str
    timestamp: datetime
    usuarioId: str

    alimento: Optional[AlimentoLogResponse] = None

    feedbacks: List[
        SensoryFeedbackResponse
    ] = []

    class Config:
        from_attributes = True


class FeedingLogUpdate(BaseModel):
    """
    Permite editar dados pontuais do registro.
    """

    reacao: Optional[int] = None
    origem: Optional[str] = None
    