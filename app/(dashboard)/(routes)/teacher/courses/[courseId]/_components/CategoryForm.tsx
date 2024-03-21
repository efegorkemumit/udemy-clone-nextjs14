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
import { Course } from '@prisma/client'
import { Combobox } from '@/components/ui/combobox'



const formSchema = z.object({
    categoryId: z.string().min(1),
  })


 interface CategoryFormProps{
    initaldata:Course;
    courseId:string;
    options : {label:string; value :string}[];
}


const CategoryForm = ({courseId,initaldata,options}:CategoryFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId:  initaldata?.categoryId || ""
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
                description: "Category is changed",
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

      const selectedOption = options.find((option)=> option.value === initaldata.categoryId)
 
 
    return (
   
        <div className='mt-10 bg-slate-100 rounded-lg p-5'>

<div className='flex items-center justify-between'>
        <h1 className='font-semibold'>Course Category</h1>
        <Button onClick={toogleEdit}  variant="ghost">
            {isEditing ?(
                <>
                <Undo className='w-4 h-4 mr-2'/> Cancel
                </>

            ):
            (
                <>
                 <Edit className='w-4 h-4 mr-2'/> Edit Category
                </>

            )}


        </Button>

    </div>

    {!isEditing && (
        <p className='text-base mt-3'>
            {selectedOption?.label || "No Category"}

        </p>
    )}
    {isEditing &&(

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
  <FormField
    control={form.control}
    name="categoryId"
    render={({ field }) => (
      <FormItem>
        <FormControl>
            <Combobox
            options={...options}
                {...field}
            >



            </Combobox>
        
         
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

export default CategoryForm