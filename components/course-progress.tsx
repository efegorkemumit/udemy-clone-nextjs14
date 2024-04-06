import React from 'react'
import { Progress } from './ui/progress';
import { cn } from '@/lib/utils';


interface CourseProgressProps{
    value:number;
    variant?: "default" | "success";
    size?:"default" | "sm";
}

const colorByVariant = {
    default:"text-purple-600",
    success:"text-green-600",
}

const sizeByVariant = {
    default:"text-sm",
    sm:"text-xs",
}

const CourseProgress = ({
    value, size, variant
}:CourseProgressProps) => {
  return (
    <div className='flex mt-2 '>
        <Progress
        className='w-72'
        value={value}
        variant={variant}
        />
        <p className={cn("font-medium ml-2 text-purple-900",
        colorByVariant[variant || "default"],
        sizeByVariant[size || "default"],)}>
            {Math.round(value)} % Completed
        </p>


    </div>
  )
}

export default CourseProgress