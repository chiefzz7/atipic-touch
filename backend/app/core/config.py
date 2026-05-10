import os 
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.environ.get("DATABASE_URL")
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

SECRET_KEY = os.environ.get("SECRET_KEY", "chave_secreta_super_segura_tcc_2026")
ALGORITHM = "HS256"
ACESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
