import { Badge } from '@/components/ui/badge'
import { prismadb } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { BarChart3, CassetteTape, DessertIcon, ImageIcon, LayoutDashboardIcon, PinIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import TitleForm from './_components/TitleForm'
import DescriptionForm from './_components/DescriptionForm'
import ImageForm from './_components/ImageForm'
import CategoryForm from './_components/CategoryForm'
import PriceForm from './_components/PriceForm'
import { CiMoneyBill } from 'react-icons/ci'
import AttachmentForm from './_components/AttachmentForm'
import ChapterForm from './_components/ChapterForm'

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
    },
    include:{
      chapters:{
        orderBy:{
          position:"asc"
        }
      },
      attachments:{
        orderBy:{
          createdAt:"desc"
        }
      }
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
    course.categoryId,
    course.chapters.some(chapter =>chapter.isPublished)

  ]

  const totalFields = RequiredFields.length;

  const completeFields = RequiredFields.filter(Boolean).length;

  const completeText = `(${completeFields}/${totalFields})`

  const categories = await prismadb.category.findMany({
    orderBy:{
      name:"asc"
    },
  });




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

          <TitleForm
          courseId={course.id}
          initaldata={course}
          />


        </div>


      {/** Col-span-1 */}
      <div>
          <div className='flex items-center gap-2 mt-4'>

            <Badge variant="mybadge" className='p-4'>
              <BarChart3 className='h-8 w-8 text-purple-700'/>
            </Badge>
            <h2 className='text-xl'>Chapter</h2>

          </div>

          <ChapterForm
          courseId={course.id}
          initaldata={course}
          />


        </div>

    {/** Col-span-1 */}
    <div>
          <div className='flex items-center gap-2'>

            <Badge variant="mybadge" className='p-4'>
              <DessertIcon className='h-8 w-8 text-purple-700'/>
            </Badge>
            <h2 className='text-xl'>Description your course</h2>

          </div>

          <DescriptionForm
          courseId={course.id}
          initaldata={course}
          />


        </div>



            {/** Col-span-1 */}
    <div>
          <div className='flex items-center gap-2'>

            <Badge variant="mybadge" className='p-4'>
              <ImageIcon className='h-8 w-8 text-purple-700'/>
            </Badge>
            <h2 className='text-xl'>Image your course</h2>

          </div>

          <ImageForm
          courseId={course.id}
          initaldata={course}
          />


        </div>

            {/** Col-span-1 */}
    <div>
          <div className='flex items-center gap-2'>

            <Badge variant="mybadge" className='p-4'>
              <CassetteTape className='h-8 w-8 text-purple-700'/>
            </Badge>
            <h2 className='text-xl'>Category</h2>

          </div>

          <CategoryForm
          options={categories.map((category)=>({
            label: category.name,
            value: category.id
          }))}
          courseId={course.id}
          initaldata={course}
          />

        


        </div>

             {/** Col-span-1 */}
    <div>
          <div className='flex items-center gap-2'>

            <Badge variant="mybadge" className='p-4'>
              <CiMoneyBill className='h-8 w-8 text-purple-700'/>
            </Badge>
            <h2 className='text-xl'>Price</h2>

          </div>

          <PriceForm
          courseId={course.id}
          initaldata={course}
          />

        


        </div>


            {/** Col-span-1 */}
    <div>
          <div className='flex items-center gap-2'>

            <Badge variant="mybadge" className='p-4'>
              <PinIcon className='h-8 w-8 text-purple-700'/>
            </Badge>
            <h2 className='text-xl'>Price</h2>

          </div>

          <AttachmentForm
          courseId={course.id}
          initaldata={course}
          />

        


        </div>



      </div>
     

    </div>
  )
}

export default CourseDetail