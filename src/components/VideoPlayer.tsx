import React from 'react';

export default function VideoPlayer() {
  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_18px_40px_rgba(78,20,28,0.14)] bg-[#3D0A14] flex items-center justify-center">
      <video
        src="/videos/pro-filler-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover rounded-3xl"
      />
    </div>
  );
}
