"use client"
import React from 'react'
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic'

export default function Home() {
  const [video, setVideo] = useState("");
  const [audio, setAudio] = useState("");
  const [player, setPlayer] = useState(null);
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

  const getVideo = async () => {
    console.log("fetching video");
    const response = await fetch("/api/videolink");
    const data = await response.json();
    const videoLink = data.video_link;
    const embedLink = videoLink.replace("watch?v=", "embed/");
    setVideo(videoLink);
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
    <main className="flex flex-col w-screen h-screen bg-black">
      {/* <div className="z-10 w-full max-w-5xl items-end justify-between font-mono text-sm lg:flex flex-col">
        <div><a href={video}>Video.</a></div>
        <div><a href={audio}>Audio.</a></div>
      </div> */}
      <div className="relative w-screen h-screen">
        <div className='absolute text-white'>
          {/* <h1 className="text-xl text-right">Viber</h1> */}
          <div><a href={video}>Video.</a></div>
          <div><a href={audio}>Audio.</a></div>
        </div>
        <div className="flex w-screen h-screen cursor-non pointer-events-none">
          <ReactPlayer
            url={video}
            width='100%'
            height='100%'
            controls= {false}
            playing={true}
            volume={0}
            muted={true}
          />
        </div>
      </div>
    </main>
  );
}
