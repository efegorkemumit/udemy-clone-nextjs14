'use client'

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


interface CourseProgressButtonProps{
    chapterId:string;
    courseId:string;
    isCompleted?:boolean;
    nextChapterId:string;
}

const CourseProgressButton = ({chapterId,courseId,nextChapterId,isCompleted}:CourseProgressButtonProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async()=>{

        try {

            setIsLoading(true);

            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`,{
                isCompleted: !isCompleted
            })
            
            if(!isCompleted && !nextChapterId){
                toast({
                    title: "Success",
                    description: "Course Completed",
                    variant:'success'
                  })
            }

            if(!isCompleted && nextChapterId){
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }

            toast({
                title: "Success",
                variant:'success'
              })

              router.refresh();

            
        } catch (error) {

            toast({
                title: "Error",
                description: "Something went wrong",
                variant:'error'
              })
            
        }
        finally{
            setIsLoading(false)
        }
    }

  return (
    <Button
    onClick={onClick}
    disabled={isLoading}
    type='button'
    variant={isCompleted? "outline": "success"}
    className='w-full mt-3 md:mt-0 md:w-32'
    >

    
        {isCompleted ? "Mark Not completed" : "Mark as complete"}
    </Button>
  )
}

export default CourseProgressButton