import { getProgress } from '@/actions/get-progress'
import { prismadb } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import CourseNavbar from '../../_components/CourseNavbar'
import CourseSidebar from '../../_components/CourseSidebar'

interface CourseIdPageLayoutProps{
    children:React.ReactNode,
    params:{
        courseId:string
    }
}

const CourseIdPageLayout = async({children,params}:CourseIdPageLayoutProps) => {

    const {userId} = auth();
    if(!userId){
        return redirect("/")
    }

    const course = await prismadb.course.findUnique({
        where:{
            id:params.courseId,
        },
        include:{
            chapters:{
                where:{
                    isPublished:true
                },
                include: {
                    userProgress:{
                        where:{
                            userId
                        }
                    }
                },
                orderBy:{
                    position:"asc"
                }
            }
        }
    })

    if(!course){
        return redirect("/")
    }

    const progressCount = await getProgress(userId, course.id)


  return (
    <div className='h-full'>
        <div className='h-20 md:pl-80 fixed inset-y-0 w-full z-50'>
            
            <CourseNavbar
            course={course}
            progressCount={progressCount}
            />

        </div>

        <div className='hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50'>

           <CourseSidebar
           course={course}
           progressCount={progressCount}
           />


        </div>

        <main className='md:pl-80 pt-24 h-full'>
            {children}



        </main>



    </div>
  )
}

export default CourseIdPageLayout