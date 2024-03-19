import { Badge } from '@/components/ui/badge'
import { prismadb } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { LayoutDashboardIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

interface CourseDetailProps{
    params:{
        courseId:string
    }
}

const CourseDetail = async({params}:CourseDetailProps) => {

  const {userId} = auth();

  if(!userId){
    return redirect("/");
  }

  const course = await prismadb.course.findUnique({
    where:{
      id:params.courseId
    }
  })

  if(!course){
    return redirect("/");
  }

  const RequiredFields =[
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId

  ]

  const totalFields = RequiredFields.length;

  const completeFields = RequiredFields.filter(Boolean).length;

  const completeText = `(${completeFields}/${totalFields})`




  return (
    <div className=''>

      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-3'>
          <h1 className='text-3xl md:text-4xl
           text-purple-600 font-semibold'>Course Setup</h1>

          <span className='text-base'>Complete all fields {completeText}</span>

        </div>





      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-12'>

    {/** Col-span-1 */}
        <div>
          <div className='flex items-center gap-2'>

            <Badge variant="mybadge" className='p-4'>
              <LayoutDashboardIcon className='h-8 w-8 text-purple-700'/>
            </Badge>
            <h2 className='text-xl'>Customize your course</h2>

          </div>


        </div>

    {/** Col-span-1 */}
        <div>


        </div>



      </div>
     

    </div>
  )
}

export default CourseDetail