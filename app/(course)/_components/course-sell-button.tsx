'use client'

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { formatPrice } from '@/lib/format';
import axios from 'axios';
import React, { useState } from 'react'

interface CourseSellButtonProps{
    price:number;
    courseId:string
}

const CourseSellButton = ({courseId,price}:CourseSellButtonProps) => {

    const [isLoading, setIsLoading]= useState(false)

    const  onClick = async()=>{
        try {
            setIsLoading(true);
      
            const response = await axios.post(`/api/courses/${courseId}/checkout`)
      
            window.location.assign(response.data.url);
          } catch {
            console.log("a")
          } finally {
            setIsLoading(false);
          }
    }
  return (
    <Button
    size="sm"
    onClick={onClick}
    disabled={isLoading}
    className='w-full mt-3 md:mt-0 md:w-32'
    >
      Sell   {formatPrice(price)}

    </Button>
  )
}

export default CourseSellButton