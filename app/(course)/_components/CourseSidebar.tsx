import Logo from '@/app/(dashboard)/_components/Logo';
import { auth } from '@clerk/nextjs';
import { Chapter, Course, UserProgress } from '@prisma/client';
import { redirect } from 'next/navigation';
import React from 'react'
import CourseSidebarItem from './CourseSidebarItem';
import { prismadb } from '@/lib/db';

interface CourseNavbarProps{
    course: Course &{
        chapters : (Chapter &{
            userprogress : UserProgress[] |null
        })[];
    }
    progressCount:number;
}


const CourseSidebar = async({course,progressCount}:CourseNavbarProps) => {

    const {userId} = auth();
    if(!userId){
        return redirect("/")
    }

    const purchase = await prismadb.purchase.findFirst({
        where:{
            AND:{
                userId:userId,
                courseId:course.id
            }
        }
    })

  return (
    <div className='h-full border-r flex flex-col overflow-y-auto shadow-sm'>
        <div className='p-8 flex flex-col border-b'>
            <Logo/>

        </div>
        <div className='flex flex-col w-full'>
            {course.chapters.map((chapter)=>(
              <CourseSidebarItem
              key={chapter.id}
              id={chapter.id}
              courseId={course.id}
              isCompleted={!!chapter.userprogress?.[0]?.isCompleted}
              isLocked={!chapter.isFree && !purchase}
              label={chapter.title}
              
              />


            ))}



        </div>



    </div>
  )
}

export default CourseSidebar