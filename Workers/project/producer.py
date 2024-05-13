import os

# FastAPI
from fastapi import FastAPI

# celery
from celery_config.tasks import calculate_recommendations
from models import Number

app = FastAPI()

@app.get("/heartbeat")
def check_service():
    return True

@app.post("/job")
def post_publish_job(number: Number):
    job = calculate_recommendations.delay(number.number)
    return {
        "message": "job published",
        "job_id": job.id,
    }

@app.get("/job/{job_id}")
def get_job(job_id: str):
    job = calculate_recommendations.AsyncResult(job_id)
    print(job)
    return {
        "ready": job.ready(),
        "result": job.result,
    }