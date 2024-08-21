"use client"
import React from 'react'
import { useEffect, useState, useRef, RefObject } from "react"
// import dynamic from 'next/dynamic'
import ReactPlayer from 'react-player'
import { TbPlayerPlayFilled, TbPlayerPauseFilled, TbPlayerSkipForwardFilled } from "react-icons/tb";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { VideoSeekSlider } from "react-video-seek-slider";
import "react-video-seek-slider/styles.css"

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

  const [videoDuration, setVideoDuration] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const setVideoDurationMilliseconds = (duration: number) => {
    setVideoDuration(duration * 1000);
  }
  const setAudioDurationMilliseconds = (duration: number) => {
    setAudioDuration(duration * 1000);
  }

  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);

  const [videoTitle, setVideoTitle] = useState("");
  const [audioTitle, setAudioTitle] = useState("");

  const getVideo = async () => {
    console.log("fetching video");
    const response = await fetch("/api/videolink");
    const data = await response.json();
    const videoLink = data.video_link;
    getAndSetTitle(videoLink, true);
    const embedLink = videoLink.replace("watch?v=", "embed/");
    setVideo(videoLink);
  };

  const getAudio = async () => {
    console.log("fetching audio");
    const response = await fetch("/api/audiolink");
    const data = await response.json();
    const audioLink = data.audio_link;
    getAndSetTitle(audioLink, false);
    setAudio(audioLink);
  };

  const getAndSetTitle = async (url: string, video: boolean) => {
    const response = await fetch("http://noembed.com/embed?url=" + url);
    const data = await response.json();
    if(video){
      setVideoTitle(data.title);
    } else {
      setAudioTitle(data.title);
    }
  }

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

  const playerSetSeek = (playerRef: RefObject<ReactPlayer>, time: number, video: boolean) => {
    console.log("setting seek");
    const timeSeconds = time / 1000;
    console.log(timeSeconds);
    console.log(playerRef.current);
    if(playerRef.current){
      playerRef.current.seekTo(timeSeconds);
    }
    if(video){
      setVideoCurrentTime(time);
      console.log({videoCurrentTime});
    } else {
      setAudioCurrentTime(time);
      console.log({audioCurrentTime});
    }
  };

  // const togglePlaying = () => {
  //   setPlaying(!playing);
  // }

  return (
    <main className="flex flex-col w-screen h-screen bg-black">
      <div className="relative w-screen h-screen">
        <div className='absolute text-white w-full bg-black pt-5 pb-4'>
          <div className='flex flex-row space-x-4 min-h-[30px] items-center '>
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
            {!initialPlay && <div className="relative -translate-y-2 w-1/3" style={{ width: '30%' }}>
              <VideoSeekSlider
                max={videoDuration}
                currentTime={videoCurrentTime}
                bufferTime={400000}
                onChange={((time) => playerSetSeek(videoPlayerRef, time, true))}
                />
            </div> }
            <a href={video}>{videoTitle}</a>

          </div>
          <div className='flex flex-row space-x-4 min-h-[30px] items-center'>
            <a href={audio}>Audio.</a>
            {audioPlaying ? (
              <TbPlayerPauseFilled 
                onClick={audioPlayPause} 
                style={{ cursor: 'pointer', }} 
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
            <TbPlayerSkipForwardFilled onClick={getAudio} style={{ cursor: 'pointer' }} title="Skip to next music" />
            {!initialPlay && <div className="relative -translate-y-2 w-1/3" style={{ width: '30%' }}>
              <VideoSeekSlider
                max={audioDuration}
                currentTime={audioCurrentTime}
                bufferTime={400000}
                onChange={((time) => playerSetSeek(audioPlayerRef, time, false))}
                />
            </div> }
            <a href={audio}>{audioTitle}</a>
          </div>
        </div>
        {initialPlay && <div className="absolute w-screen h-screen bg-black flex items-center justify-center text-white">
          <TbPlayerPlayFilled 
            onClick={() => {
              audioPlayPause();
              videoPlayPause();
              initialClick();
            }} 
            style={{ cursor: 'pointer', fontSize: '100px'  }} 
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
            onDuration={(duration) => setVideoDurationMilliseconds(duration)}
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
              onDuration={(duration) => setAudioDurationMilliseconds(duration)}
            />
        </div>
      </div>
    </main>
  );
}
