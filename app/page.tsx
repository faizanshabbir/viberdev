"use client"
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

  const onPlayerReady = (event: YT.PlayerEvent) => {
    console.log("Player is ready");
  };

  const playVideo = () => {
    if (player) {
      player.playVideo();
    }
  };

  useEffect(() => { 
    getVideo() 
    getAudio()

    // Load YouTube IFrame Player API script
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    // Create YouTube player instance
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new YT.Player('player', {
        events: {
          'onReady': onPlayerReady
        }
      });
      setPlayer(newPlayer);
    };

    playVideo();
  }, []);

  return (
    <main className="flex w-screen h-screen">
      {/* <div className="z-10 w-full max-w-5xl items-end justify-between font-mono text-sm lg:flex flex-col">
        <div><a href={video}>Video.</a></div>
        <div><a href={audio}>Audio.</a></div>
      </div> */}
      <div className="w-screen h-screen flex-grow flex">
        <iframe
          width="100%"
          height="100%"
          src={`${video}?enablejsapi=1&controls=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full pointer-events-none"
        ></iframe>
      </div>
    </main>
  );
}
