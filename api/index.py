from fastapi import FastAPI

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/videolink")
def get_video_link():
    return {"video_link": "https://www.youtube.com/watch?v=LFOx-vmYrts"}

@app.get("/api/audiolink")
def get_video_link():
    return {"audio_link": "https://www.youtube.com/watch?v=LFOx-vmYrts"}