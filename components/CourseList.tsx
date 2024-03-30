import { Category, Course } from '@prisma/client';
import React from 'react'
import CourseCard from './CourseCard';

type CourseWithProgressWithCategory = Course &{
    category: Category | null;
    chapters: {id:string} [];
    progress : number | null;
};

interface CourseListProps{
    items: CourseWithProgressWithCategory[];
}



const CourseList = ({items}:CourseListProps) => {
  return (
    <>
    
    
    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
        {items.map((item)=>(

          <CourseCard
          key={item.id}
          chaptersLength={item.chapters.length}
          id={item.id}
          imageUrl={item.imageUrl}
          price={item.price}
          progress={item.progress}
          category={item.category?.name}
          title={item.title}
          
          />




        ))}



    </div>

    <div>
        {items.length ===0 &&(
            <div className='text-center bg-yellow-100 text-black font-semibold  p-3 rounded-xl'>


                No courses  found
            </div>



        )}



    </div>


    </>

  )
}

export default CourseList