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
import { Edit, Plus, Undo } from 'lucide-react'
import { Chapter, Course } from '@prisma/client'
import ChapterList from './ChapterList'

const formSchema = z.object({
    title: z.string().min(1),
  })

interface ChapterFormProps{
    initaldata:Course & {chapters : Chapter[]};
    courseId:string;
}


const ChapterForm = ({courseId,initaldata}:ChapterFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
      })

      const { isSubmiting, isValid} = form.formState;
      const router = useRouter();

      const [isCreating, setIsCreating] = useState(false);
      const [isUpdating, setIsUpdating] = useState(false);


      const toogleCreate=()=>{
        setIsCreating((current)=>!current)
      }


      const onSubmit = async(values : z.infer<typeof formSchema>)=>{

     

        try {

            const response  = await axios.post(`/api/courses/${courseId}/chapters`, values);
            toast({
                title: "Success",
                description: "....",
                variant:'success'
              })

              toogleCreate();

              router.refresh();
            
            
        } catch (error ){

            toast({
                title: "Something Went Wrong",
                description: error.message,
                variant:'destructive'
              })
            
        }

      }

      const onReoder = async (updateData: {id:string, position:number}[])=>{

        try {
          setIsUpdating(true)

          await axios.put(`/api/courses/${courseId}/chapters/reorder`,{
            list:updateData
          });
          toast({
            title: "Success",
            description: "....",
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
          setIsUpdating(false)

        }




      }

      const onEdit = (id:string)=>{
        router.push(`/teacher/courses/${courseId}/chapters/${id}`)
      }






  return (
    <div className='mt-10 bg-slate-100 rounded-lg p-5'>

<div className='flex items-center justify-between'>
        <h1 className='font-semibold'>Chapters</h1>
        <Button onClick={toogleCreate}  variant="ghost">
            {isCreating ?(
                <>
                <Undo className='w-4 h-4 mr-2'/> Cancel
                </>

            ):
            (
                <>
                 <Plus className='w-4 h-4 mr-2'/> Add Chapter
                </>

            )}


        </Button>

    </div>

    {!isCreating && (
        <p className='text-base mt-3'>
            {initaldata.chapters.length === 0 &&(
                <div>
                    <p>No Result Chapter</p>


                </div>
            )}

            {initaldata.chapters.length > 0 &&(
               
                      <ChapterList
                      items={initaldata.chapters || []}
                      onEdit={onEdit}
                      onReoder={onReoder}
                      
                      />



               
            )}

          

        </p>
    )}



    {isCreating &&(
        <Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
  <FormField
    control={form.control}
    name="title"
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input disabled={isSubmiting} placeholder="Chapter Title" {...field} />
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

export default ChapterForm