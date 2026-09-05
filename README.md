# SIH-2026
Backend and application development repository for our Smart India Hackathon 2026 project.
from fastapi import FastAPI

app = FastAPI(
    title="Red Alert Hazard API",
    version="1.0.0",
    description="Backend for SIH 2026 - Intelligent Identification of Hazard-Based Red Zones"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Red Alert Hazard API",
        "status": "Running Successfully"
    }

@app.get("/health")
def health():
    return {
        "server": "OK",
        "database": "Not Connected Yet"
    }
