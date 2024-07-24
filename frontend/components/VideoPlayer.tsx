'use client';
import React, { useEffect, useRef, FunctionComponent } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';


interface VideoPlayerProps {
  options: any;
}

export const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({ options }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-no-controls');
      videoRef.current.appendChild(videoElement);
      const player = (playerRef.current = videojs(videoElement, {
        ...options,
        controls: true, 
        autoplay: true, 
        muted: true,
        loop: true, 
        
      }));
      
      player.on('loadedmetadata', () => {
        player.play();
        // player.responsive(true)
        player.fill(true)
        player.width(options.width)
        
      });
    }
  }, [options]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
        player.m
      }
    };
  }, []);

  return (
    <div
      data-vjs-player
      className="h-full w-full rounded-xl overflow-hidden"
    >
      <div ref={videoRef} className='h-full w-full overflow-hidden' />
    </div>
  );
};

export default VideoPlayer;