from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import user_routes
from app.routes import auth_routes
from app.routes import child_routes
from app.routes import food_routes
from app.routes import log_routes

app = FastAPI(
    title="AtipicTouch API",
    description="API para o ecossistema IoT da Atipic Touch",
    version="1.0.0"
)

app.include_router(user_routes.router)
app.include_router(auth_routes.router)
app.include_router(child_routes.router)
app.include_router(food_routes.router)
app.include_router(log_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "message": "Cérebro AtipicTouch rodando perfeitamente na nuvem!"
    }


