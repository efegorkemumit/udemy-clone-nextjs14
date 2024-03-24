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
import { Edit, Undo } from 'lucide-react'


interface TitleFormProps{
    initaldata:{
        title:string
    },
    courseId:string,
    chapterId: string
}

const formSchema = z.object({
    title: z.string().min(1),
  })


const TitleForm = ({chapterId,courseId,initaldata}:TitleFormProps) => {
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
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

            const response  = await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values);
            toast({
                title: "Success",
                description: "Title is changed",
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
            <h1 className='font-semibold'>Chapter Title</h1>
            <Button onClick={toogleEdit}  variant="ghost">
                {isEditing ?(
                    <>
                    <Undo className='w-4 h-4 mr-2'/> Cancel
                    </>
    
                ):
                (
                    <>
                     <Edit className='w-4 h-4 mr-2'/> Edit
                    </>
    
                )}
    
    
            </Button>
    
        </div>
    
        {!isEditing && (
            <p className='text-base mt-3'>
                {initaldata.title}
    
            </p>
        )}
        {isEditing &&(
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input disabled={isSubmiting} placeholder="Course Title" {...field} />
            </FormControl>
           
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className=' flex gap-2 items-center'>
    
    
      <Button type="submit"
      disabled={!isValid || isSubmiting}
      >Contunie
      </Button>
    
      </div>
    
    </form>
    </Form>
    
    
    
        )}
    
    
    
       </div>
  )
}

export default TitleForm