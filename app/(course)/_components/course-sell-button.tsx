'use client'

import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';
import React, { useState } from 'react'

interface CourseSellButtonProps{
    price:number;
    courseId:string
}

const CourseSellButton = async({courseId,price}:CourseSellButtonProps) => {

    const [isLoading, setIsLoading]= useState(false)

    const  onClick = async()=>{
        try {
            
        } catch (error) {
            
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