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
import { Textarea } from '@/components/ui/textarea'



const formSchema = z.object({
    description: z.string().min(1, {
      message: "description is required.",
    }),
  })


interface DescriptionFormProps{
    initaldata:{
        description:string
    },
    courseId:string
}

const DescriptionForm = ({courseId, initaldata}:DescriptionFormProps) => {
    

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
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
                description: "description is changed",
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
        <h1 className='font-semibold'>Course Description</h1>
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
            {initaldata.description}

        </p>
    )}
    {isEditing &&(

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
  <FormField
    control={form.control}
    name="description"
    render={({ field }) => (
      <FormItem>
        <FormControl>
            <Textarea 
            disabled={isSubmiting}
            {...field}
             placeholder="This course is about....."
             ></Textarea>
         
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

export default DescriptionForm