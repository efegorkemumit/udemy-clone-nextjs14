import HeaderRoutes from '@/app/(dashboard)/_components/HeaderRoutes';
import { Chapter, Course, UserProgress } from '@prisma/client'
import React from 'react'
import CourseMobileMenu from './CourseMobileMenu';


interface CourseNavbarProps{
    course: Course &{
        chapters : (Chapter &{
            userprogress : UserProgress[] |null
        })[];
    }
    progressCount:number;
}

const CourseNavbar = ({course,progressCount}:CourseNavbarProps) => {
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


        </div>

        <HeaderRoutes/>




    </div>
  )
}

export default CourseNavbar