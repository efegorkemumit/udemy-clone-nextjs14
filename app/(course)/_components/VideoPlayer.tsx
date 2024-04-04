'use client'

import { cn } from '@/lib/utils';
import MuxPlayer from '@mux/mux-player-react';
import { Loader2, Lock } from 'lucide-react';
import React, { useState } from 'react'


interface VideoPlayerProps{
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  completeOnEnd: boolean;
  title: string;

}

const VideoPlayer = ({chapterId,completeOnEnd,courseId,isLocked,
    playbackId,title,nextChapterId}:VideoPlayerProps) => {

    const [isReady, setIsReady] = useState(false)
  return (

    <div className='relative aspect-video'>

        {!isReady && !isLocked &&(
            <div className='absolute inset-0 flex items-center justify-center bg-slate-600'>

                <Loader2 className='h-8 w-8 animate-spin text-white'/>
            </div>

        )}

        {isLocked &&(
            <div className='absolute inset-0 flex items-center justify-center bg-slate-600'>

                <Lock className='h-8 w-8  text-white'/>
                <p className='text-white'>
                    This Chapter is Locked
                </p>
            </div>

        )}

        {!isLocked &&(
            <MuxPlayer
            title={title}
            className={cn(
                !isReady && "hidden"
            )}
            onCanPlay={()=>setIsReady(true)}
            onEnded={()=>{}}
            autoPlay
            playbackId={playbackId}
            
            
            />





        )}



    </div>
  )
}

export default VideoPlayer