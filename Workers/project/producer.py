import os

# FastAPI
from fastapi import FastAPI

# celery
from celery_config.tasks import get_recommendations
from models import ListOfFlights, Coordinates
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

@app.get("/heartbeat")
def check_service():
    return True

@app.post("/job")
def post_publish_job(flights: ListOfFlights, ip_coord: Coordinates):
    job = get_recommendations.delay(flights, ip_coord)
    return {
        "message": "new recommendation", 
        "job_id": job.id,
    }

@app.get("/job/{job_id}")
def get_job(job_id: str):
    job = get_recommendations.AsyncResult(job_id)
    print(job)
    return {
        "ready": job.ready(),
        "result": job.result,
    }