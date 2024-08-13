import os
import json
from supabase import create_client, Client

class SupabaseClient((object)):
    url: str = ""
    key: str = ""
    supabase: Client = None
    
    def __init__(self):
        self.url = os.environ.get("SUPABASE_URL")
        self.key = os.environ.get("SUPABASE_KEY")
        self.supabase = create_client(self.url, self.key)
    
    def get_video_link(self):
        response = self.supabase.rpc("get_random_video").execute()
        return {"video_link": response.data[0].get("video_url")}
    
    def get_music_link(self):
        response = self.supabase.rpc("get_random_music").execute()
        return {"audio_link": response.data[0].get("music_url")}