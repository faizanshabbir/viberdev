"use client"
import React from 'react'
import { useEffect, useState, useRef, RefObject } from "react";
import dynamic from 'next/dynamic'
import ReactPlayer from 'react-player';

export default function Home() {
  const [video, setVideo] = useState("");
  const [audio, setAudio] = useState("");
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const audioPlayerRef = useRef<ReactPlayer>(null);
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
    console.log('Component mounted');
    console.log('videoPlayerRef:', videoPlayerRef.current);
    console.log('audioPlayerRef:', audioPlayerRef.current);

  }, []);

  const toggleMute = (playerRef: RefObject<ReactPlayer>, mute: boolean) => {
    console.log("toggling mute");
    playerRef.current.getInternalPlayer().playing = false
  };

  return (
    <main className="flex flex-col w-screen h-screen bg-black">
      {/* <div className="z-10 w-full max-w-5xl items-end justify-between font-mono text-sm lg:flex flex-col">
        <div><a href={video}>Video.</a></div>
        <div><a href={audio}>Audio.</a></div>
      </div> */}
      <div className="relative w-screen h-screen">
        <div className='absolute text-white'>
          {/* <h1 className="text-xl text-right">Viber</h1> */}
          <div className='flex flex-row space-x-4'>
            <a href={video}>Video.</a>
            <button onClick={() => toggleMute(videoPlayerRef, false)} className="text-white">Unmute Video</button>
          </div>
          <div className='flex flex-row space-x-4'>
            <a href={audio}>Audio.</a>
            {/* <button onClick={() => toggleMute(audioPlayerRef, false)} className="text-white">Unmute Audio</button> */}
          </div>
        </div>
        <div className="flex w-screen h-screen cursor-non pointer-events-none">
          <ReactPlayer
            ref={videoPlayerRef}
            url={video}
            width='100%'
            height='100%'
            controls= {false}
            playing={true}
            volume={100}
            muted={true}
          />
        </div>
        <div className="hidden">
          <ReactPlayer
              ref={audioPlayerRef}
              url={audio}
              width='0%'
              height='0%'
              controls={false}
              playing={true}
              volume={70}
              muted={true}
            />
        </div>
      </div>
    </main>
  );
}
