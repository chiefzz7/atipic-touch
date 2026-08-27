from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: EmailStr
    senha: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    usuario_id: str
    perfil: str
