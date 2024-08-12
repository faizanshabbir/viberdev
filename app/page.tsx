"use client"
import React from 'react'
import ReactPlayer from 'react-player'
import { useEffect, useState } from "react";

export default function Home() {
  const [video, setVideo] = useState("");
  const [audio, setAudio] = useState("");
  const [player, setPlayer] = useState(null);

  const getVideo = async () => {
    console.log("fetching video");
    const response = await fetch("/api/videolink");
    const data = await response.json();
    const videoLink = data.video_link;
    const embedLink = videoLink.replace("watch?v=", "embed/");
    setVideo(embedLink);
  };

  const getAudio = async () => {
    console.log("fetching audio");
    const response = await fetch("/api/audiolink");
    const data = await response.json();
    setAudio(data.audio_link);
  };


  useEffect(() => { 
    getVideo() 
    getAudio()
  }, []);

  return (
    <main className="flex w-screen h-screen">
      {/* <div className="z-10 w-full max-w-5xl items-end justify-between font-mono text-sm lg:flex flex-col">
        <div><a href={video}>Video.</a></div>
        <div><a href={audio}>Audio.</a></div>
      </div> */}
    </main>
  );
}
