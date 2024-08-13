"use client"
import React from 'react'
import { useEffect, useState, useRef, RefObject } from "react"
// import dynamic from 'next/dynamic'
import ReactPlayer from 'react-player'

export default function Home() {
  const [video, setVideo] = useState("");
  const [audio, setAudio] = useState("");
  // const [playing, setPlaying] = useState(true);
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const audioPlayerRef = useRef<ReactPlayer>(null);
  // const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  const [videoPlaying, setVideoPlaying] = useState(true)
  const videoPlayPause = () => setVideoPlaying(!videoPlaying)
  // const pause = () => setPlaying(false)
  const [audioPlaying, setAudioPlaying] = useState(true)
  const audioPlayPause = () => setAudioPlaying(!audioPlaying)

  const [videoMuted, setVideoMuted] = useState(true);
  const videoMute = () => setVideoMuted(!videoMuted);

  const [audioMuted, setAudioMuted] = useState(false);
  const audioMute = () => setAudioMuted(!audioMuted);

  const getVideo = async () => {
    console.log("fetching video");
    const response = await fetch("/api/videolink");
    const data = await response.json();
    const videoLink = data.video_link;
    const embedLink = videoLink.replace("watch?v=", "embed/");
    setVideo(videoLink);
  };

  const getVideoB = async () => {
    console.log("fetching video");
    const response = await fetch("/api/bvideolink");
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
    // if (playerRef.current.getInternalPlayer().muted) {
    //   playerRef.current.getInternalPlayer().muted = false;
    // } else {
    //   playerRef.current.getInternalPlayer().muted = true;
    // }
    if(playerRef.current){
      console.log(("exists!"))
      playerRef.current.setState({playing: false})
      // playerRef.current.getInternalPlayer().playing = false;
      // console.log(playerRef.current.)
    }
  };

  // const togglePlaying = () => {
  //   setPlaying(!playing);
  // }

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
            {/* <button onClick={() => toggleMute(videoPlayerRef, false)} className="text-white">Unmute Video</button> */}
            <button onClick={videoPlayPause}>PlayPause</button>
            <button onClick={videoMute}>Mute Video</button>
            <button onClick={getVideo}>Skip Video</button>
            {/* <button onClick={pause}>Pause</button> */}
          </div>
          <div className='flex flex-row space-x-4'>
            <a href={audio}>Audio.</a>
            {/* <button onClick={() => toggleMute(audioPlayerRef, false)} className="text-white">Unmute Audio</button> */}
            <button onClick={audioPlayPause}>PlayPause</button>
            <button onClick={audioMute}>Mute Audio</button>
            <button onClick={getAudio}>Skip Audio</button>
          </div>
        </div>
        <div className="flex w-screen h-screen cursor-non pointer-events-none">
          <ReactPlayer
            ref={videoPlayerRef}
            url={video}
            width='100%'
            height='100%'
            controls= {false}
            playing={videoPlaying}
            volume={70}
            muted={videoMuted}
            onEnded={getVideo}
          />
        </div>
        <div className="hidden">
          <ReactPlayer
              ref={audioPlayerRef}
              url={audio}
              width='0%'
              height='0%'
              controls={false}
              playing={audioPlaying}
              volume={70}
              muted={audioMuted}
              onEnded={getAudio}
            />
        </div>
      </div>
    </main>
  );
}
