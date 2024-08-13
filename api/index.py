import os
from fastapi import FastAPI
from api import wrapper

app = FastAPI()
sc = wrapper.SupabaseClient()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/videolink")
def get_video_link():
    return sc.get_video_link()

@app.get("/api/audiolink")
def get_video_link():
    return sc.get_music_link()
