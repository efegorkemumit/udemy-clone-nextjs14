import { prismadb } from '@/lib/db'
import React from 'react'
import Categories from './_components/Categories'
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getCourses } from '@/actions/get-courses';
import CourseList from '@/components/CourseList';

interface SearchPageProps{
  searchParams: {
    title:string;
    categoryId:string;
  }
}

const SearchPage = async({searchParams}:SearchPageProps) => {

  const {userId} = auth();

  if(!userId){
    return redirect("/")
  }

  const courses = await getCourses({
    userId,
    ...searchParams
  })


  const categoeries = await prismadb.category.findMany({
    orderBy:{
      name:"asc"
    }
  })
  return (
    <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 items-start'>

      <div className='col-span-1'>

        <div className='relative'>

          <h3 className='text-2xl font-semibold mb-2'>Categories</h3>
          <div className='h-1 w-full bg-purple-100 rounded-3xl mb-4'></div>

          <Categories
          items={categoeries}
          />

          


        </div>


      </div>

      <div className='lg:col-span-4'>
        <CourseList items={courses}/>


      </div>



    </div>
  )
}

export default SearchPage