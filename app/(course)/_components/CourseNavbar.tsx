import HeaderRoutes from '@/app/(dashboard)/_components/HeaderRoutes';
import { Chapter, Course, UserProgress } from '@prisma/client'
import React from 'react'
import CourseMobileMenu from './CourseMobileMenu';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { prismadb } from '@/lib/db';
import CourseProgress from '@/components/course-progress';


interface CourseNavbarProps{
    course: Course &{
        chapters : (Chapter &{
            userprogress : UserProgress[] |null
        })[];
    }
    progressCount:number;
}

const CourseNavbar = async({course,progressCount}:CourseNavbarProps) => {

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
    <div className='p-4 border-b h-full items-center flex bg-white shadow-sm'>

        <CourseMobileMenu
        course={course}
        progressCount={progressCount}
        
        />


        <div className='w-[40%] md:w-[60%]'>
            <p className='text-sm md:text-lg truncate'>
                {course.title}
            </p>
            {purchase &&(
                <div>
                    <CourseProgress
                    value={progressCount}
                    size='sm'
                    variant='default'
                    />
                </div>
            )}


        </div>

        <HeaderRoutes/>




    </div>
  )
}

export default CourseNavbar