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
import { Chapter } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'


interface ChapterAccessFormProps{
    initaldata:Chapter
    courseId:string,
    chapterId: string
}

const formSchema = z.object({
    isFree: z.boolean().default(false),
  })



const ChapterAccessForm = ({chapterId,courseId,initaldata}:ChapterAccessFormProps) => {
  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isFree: !!initaldata.isFree
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
                description: "Money is changed",
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
            <h1 className='font-semibold'>Chapter Access is Free or Money</h1>
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
            <div className='text-base mt-3'>
               {initaldata.isFree ?(
                <p className='text-green-500'>This chapter is free</p>
               ):
               (
                <p className='text-purple-700'>This chapter is not free </p>
               )}
    
            </div>
        )}
        {isEditing &&(
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="isFree"
        render={({ field }) => (
          <FormItem>
            <FormControl>
             
                <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                />


            </FormControl>

            <FormDescription>
                <div>

                    <p>Check is your chapter is free or money</p>
                </div>


            </FormDescription>
           
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

export default ChapterAccessForm