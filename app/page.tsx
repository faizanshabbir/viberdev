"use client"
import React from 'react'
import { useEffect, useState, useRef, RefObject } from "react"
// import dynamic from 'next/dynamic'
import ReactPlayer from 'react-player'
import { TbPlayerPlayFilled, TbPlayerPauseFilled, TbPlayerSkipForwardFilled } from "react-icons/tb";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";

export default function Home() {
  const [video, setVideo] = useState("");
  const [audio, setAudio] = useState("");
  // const [playing, setPlaying] = useState(true);
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const audioPlayerRef = useRef<ReactPlayer>(null);
  // const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoPlayPause = () => setVideoPlaying(!videoPlaying)
  // const pause = () => setPlaying(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const audioPlayPause = () => setAudioPlaying(!audioPlaying)

  const [videoMuted, setVideoMuted] = useState(true);
  const videoMute = () => setVideoMuted(!videoMuted);

  const [audioMuted, setAudioMuted] = useState(false);
  const audioMute = () => setAudioMuted(!audioMuted);

  const [initialPlay, setInitialPlay] = useState(true);
  const initialClick = () => setInitialPlay(false);

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
          <div className='flex flex-row space-x-4 items-center'>
            <a href={video}>Video.</a>
            {videoPlaying ? (
              <TbPlayerPauseFilled 
                onClick={videoPlayPause} 
                style={{ cursor: 'pointer' }} 
                title="Pause Video" 
              />
            ) : (
              <TbPlayerPlayFilled 
                onClick={videoPlayPause} 
                style={{ cursor: 'pointer' }} 
                title="Play Video" 
              />
            )}
            {videoMuted ? (
              <MdVolumeOff 
                onClick={videoMute} 
                style={{ cursor: 'pointer' }} 
                title="Pause Video" 
              />
            ) : (
              <MdVolumeUp 
                onClick={videoMute} 
                style={{ cursor: 'pointer' }} 
                title="Play Video" 
              />
            )}
            <TbPlayerSkipForwardFilled onClick={getVideo} style={{ cursor: 'pointer' }} title="Skip to next video" />
          </div>
          <div className='flex flex-row space-x-4 items-center'>
            <a href={audio}>Audio.</a>
            {audioPlaying ? (
              <TbPlayerPauseFilled 
                onClick={audioPlayPause} 
                style={{ cursor: 'pointer' }} 
                title="Pause Video" 
              />
            ) : (
              <TbPlayerPlayFilled 
                onClick={audioPlayPause} 
                style={{ cursor: 'pointer' }} 
                title="Play Video" 
              />
            )}
            {audioMuted ? (
              <MdVolumeOff 
                onClick={audioMute} 
                style={{ cursor: 'pointer' }} 
                title="Pause Video" 
              />
            ) : (
              <MdVolumeUp 
                onClick={audioMute} 
                style={{ cursor: 'pointer' }} 
                title="Play Video" 
              />
            )}
            <TbPlayerSkipForwardFilled onClick={getAudio} style={{ cursor: 'pointer' }} title="Skip to next video" />
          </div>
        </div>
        {initialPlay && <div className="absolute w-screen h-screen bg-black opacity-80 flex items-center justify-center text-white">
          <TbPlayerPlayFilled 
            onClick={() => {
              audioPlayPause();
              videoPlayPause();
              initialClick();
            }} 
            style={{ cursor: 'pointer' }} 
            title="Play Vibes" 
          />
        </div>}
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
