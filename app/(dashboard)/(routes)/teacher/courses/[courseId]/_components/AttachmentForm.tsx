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
import { Edit, File, ImageIcon, Loader2Icon, PlusIcon, Trash2, Undo } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Attachment, Course } from '@prisma/client'
import Image from 'next/image'
import FileUpload from '@/components/file-upload'

const formSchema = z.object({
    url: z.string().min(1),
  })

interface AttachmentFormProps{
    initaldata:Course & {attachments : Attachment[]}
    courseId:string
}



const AttachmentForm = ({initaldata,courseId}:AttachmentFormProps) => {

    const router = useRouter();


    const [isEditing, setIsEditing] = useState(false);
    const [deletingId, setDeletingId]= useState<string | null>(null)

    const toogleEdit=()=>{
      setIsEditing((current)=>!current)
    }

    const onSubmit = async(values : z.infer<typeof formSchema>)=>{

     

      try {

          const response  = await axios.post(`/api/courses/${courseId}/attachment`, values);
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
              description: error.message,
              variant:'destructive'
            })
          
      }

    }

    const OnDelete = async(id:string)=>{

      try {
        setDeletingId(id);
        await axios.delete(`/api/courses/${courseId}/attachment/${id}`);
        toast({
          title: "Success",
          description: "Deleting is okey",
          variant:'success'
        })

        router.refresh();
        
      } catch (error) {

        toast({
          title: "Something Went Wrong",
          description: error.message,
          variant:'destructive'
        })
        
      }
      finally{
        setDeletingId(null);
      }


    }

    
  return (
    <div className='mt-10 bg-slate-100 rounded-lg p-5'>

<div className='flex items-center justify-between'>
        <h1 className='font-semibold'>File</h1>
        <Button onClick={toogleEdit}  variant="ghost">
            {isEditing &&(
                <>
                <Undo className='w-4 h-4 mr-2'/> Cancel
                </>

            )}

            {!isEditing &&
             (
                <>
                 <PlusIcon className='w-4 h-4 mr-2'/> Add a file
                </>

            )}

            

           


        </Button>

    </div>

    {!isEditing && (
        <>
          {initaldata.attachments.length === 0 &&(
            <p>
              No Attachment yet
            </p>
          )}


        {initaldata.attachments.length > 0 &&(
            <div className='space-y-3'>

              {initaldata.attachments.map((attachment)=>(
                <div key={attachment.id}
                
                className='flex items-center w-full p-3'>

                  <File className='h-5 w-5'/>
                  <p className='text-xs'>{attachment.name}</p>

                  {deletingId === attachment.id &&(
                    <div>
                      <Loader2Icon className='h-4 w-4'/>

                    </div>
                  )}
                   {deletingId !== attachment.id &&(
                      <Button onClick={()=> OnDelete(attachment.id)}  variant="ghost">

                        <Trash2 className='h-4 w-4'/>
                      </Button>
                  )}






                  


                </div>




              ))}




            </div>
          )}
        
        
        </>



    )}


    {isEditing && (
        <>
        <FileUpload
        endpoint="courseAttachment"
        onChange={(url)=>{
            if(url){
                onSubmit({url:url});
            }
        }}
        
        />
        
        
        
        </>


    )}
    
    

    
    
    </div>
  )
}

export default AttachmentForm