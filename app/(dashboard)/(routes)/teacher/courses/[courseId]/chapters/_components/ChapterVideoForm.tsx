'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from '@/components/ui/use-toast'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Edit, ImageIcon, PlusIcon, Undo, VideoIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Chapter, Course, MuxData } from '@prisma/client'
import Image from 'next/image'
import FileUpload from '@/components/file-upload'
import MuxPlayer from '@mux/mux-player-react';



const formSchema = z.object({
    videoUrl: z.string().min(1),
  })

interface VideoProps{
    initaldata:Chapter & {muxData ? : MuxData | null}
    courseId:string,
    chapterId:string
}


const ChapterVideoForm = ({chapterId,courseId,initaldata}:VideoProps) => {

    const { isSubmiting, isValid} = useState(false);

    const router = useRouter();


    const [isEditing, setIsEditing] = useState(false);

    const toogleEdit=()=>{
      setIsEditing((current)=>!current)
    }

    

    const onSubmit = async(values : z.infer<typeof formSchema>)=>{

   

      try {

          const response  = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
          toast({
              title: "Success",
              description: "Cahpter video is changed",
              variant:'success'
            })
            toogleEdit();
            router.refresh();
          
          
      } catch (error ){

          toast({
              title: "Something Went Wrong",
              description: error.message,
              variant:'destructive'
            })
          
      }

    }



  return (
    <div className='mt-10 bg-slate-100 rounded-lg p-5'>

    <div className='flex items-center justify-between'>
        <h1 className='font-semibold'>Video</h1>
        <Button onClick={toogleEdit}  variant="ghost">
            {isEditing &&(
                <>
                <Undo className='w-4 h-4 mr-2'/> Cancel
                </>

            )}

            {!isEditing && !initaldata.videoUrl &&
             (
                <>
                 <PlusIcon className='w-4 h-4 mr-2'/> Add a video
                </>

            )}

            {!isEditing && initaldata.videoUrl &&
             (
                <>
                 <Edit className='w-4 h-4 mr-2'/> Edit Video
                </>

            )}

           


        </Button>

    </div>

    {!isEditing && (
        !initaldata.videoUrl ? (
            
            <>

            <div className='flex items-center justify-center h-80 bg-slate-200 mt-2'>
            <VideoIcon className='h-16 w-16'/>

            </div>
            </>


        ):
        (
            <>

            <div className='relative aspect-video mt-2'>
            <MuxPlayer
              playbackId={initaldata?.muxData?.playbackId || ""}
            />


            </div>
            </>
        )
       



    )}

    {isEditing && (
        <>
        <FileUpload
        endpoint="courseVideo"
        onChange={(url)=>{
            if(url){
                onSubmit({videoUrl:url});
            }
        }}
        
        />
        
        
        
        </>


    )}





    </div>
  )
}

export default ChapterVideoForm