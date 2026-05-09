from fastapi import FastAPI

app = FastAPI(
    title="AtipicTouch API",
    description="API para o ecossistema IoT da Atipic Touch",
    version="1.0.0"
)

@app.get("/")
def health_check():
    return {
        "status": "online",
        "message": "Cérebro AtipicTouch rodando perfeitamente na nuvem!"
    }

