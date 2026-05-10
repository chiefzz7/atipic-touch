from fastapi import FastAPI
from app.routes import user_routes

app = FastAPI(
    title="AtipicTouch API",
    description="API para o ecossistema IoT da Atipic Touch",
    version="1.0.0"
)

app.include_router(user_routes.router)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "message": "Cérebro AtipicTouch rodando perfeitamente na nuvem!"
    }

