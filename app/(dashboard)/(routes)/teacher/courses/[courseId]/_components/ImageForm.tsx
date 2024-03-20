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
import { Edit, ImageIcon, PlusIcon, Undo } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Course } from '@prisma/client'
import Image from 'next/image'
import FileUpload from '@/components/file-upload'



const formSchema = z.object({
    imageUrl: z.string().min(1, {
      message: "imageUrl is required.",
    }),
  })

interface ImageFormProps{
    initaldata:Course
    courseId:string
}


const ImageForm = ({courseId,initaldata}:ImageFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: "",
        },
      })

      const { isSubmiting, isValid} = form.formState;

      const router = useRouter();


      const [isEditing, setIsEditing] = useState(false);

      const toogleEdit=()=>{
        setIsEditing((current)=>!current)
      }

      

      const onSubmit = async(values : z.infer<typeof formSchema>)=>{

     

        try {

            const response  = await axios.patch(`/api/courses/${courseId}`, values);
            toast({
                title: "Success",
                description: "imageUrl is changed",
                variant:'success'
              })
              toogleEdit();
              router.refresh();
            
            
        } catch (error ){

            toast({
                title: "Something Went Wrong",
                description: error,
                variant:'destructive'
              })
            
        }

      }



  return (
     <div className='mt-10 bg-slate-100 rounded-lg p-5'>

    <div className='flex items-center justify-between'>
        <h1 className='font-semibold'>Images</h1>
        <Button onClick={toogleEdit}  variant="ghost">
            {isEditing &&(
                <>
                <Undo className='w-4 h-4 mr-2'/> Cancel
                </>

            )}

            {!isEditing && !initaldata.imageUrl &&
             (
                <>
                 <PlusIcon className='w-4 h-4 mr-2'/> Add an image
                </>

            )}

            {!isEditing && initaldata.imageUrl &&
             (
                <>
                 <Edit className='w-4 h-4 mr-2'/> Edit image
                </>

            )}

           


        </Button>

    </div>

    {!isEditing && (
        !initaldata.imageUrl ? (
            
            <>

            <div className='flex items-center justify-center h-80 bg-slate-200 mt-2'>
            <ImageIcon className='h-16 w-16'/>

            </div>
            </>


        ):
        (
            <>

            <div className='relative aspect-video mt-2'>
                <Image
                alt=''
                fill
                className='object-cover'
                src={initaldata.imageUrl}
                
                />


            </div>
            </>
        )
       



    )}

    {isEditing && (
        <>
        <FileUpload
        endpoint="courseImage"
        onChange={(url)=>{
            if(url){
                onSubmit({imageUrl:url});
            }
        }}
        
        />
        
        
        
        </>


    )}





    </div>
  )
}

export default ImageForm