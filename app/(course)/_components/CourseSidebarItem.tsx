'use client'

import { cn } from '@/lib/utils';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'


interface CourseSidebarItemProps{
    label:string;
    id:string;
    isCompleted:string;
    courseId:string;
    isLocked:boolean
}

const CourseSidebarItem = ({courseId,id,isCompleted,isLocked,label}:CourseSidebarItemProps) => {

    const pathname = usePathname();
    const router = useRouter();

    const Icon  = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle)


    const isActive = pathname.includes(id);
    const onClick =()=>{
        router.push(`/courses/${courseId}/chapters/${id}`);
    }
  return (
  <button onClick={onClick}
  type='button'
  className={cn("flex items-center gap-2 text-slate-600 font-semibold pl-6 hover:text-slate-950",
  isActive && "text-purple-950 bg-slate-200",
  isCompleted && "text-green-800 hover:text-green-400",
  isCompleted && isActive && "bg-purple-300"

  )}>

    <div className='flex items-center gap-2 py-4'>

        <Icon
        size={25}
        className={cn("text-slate-700")}
        />
        {label}


    </div>



  </button>
  )
}

export default CourseSidebarItem