import { Button } from '@/components/ui/button'
import { prismadb } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { DataTable } from './_components/data-table'
import { columns } from './_components/column'

const CoursePage = async() => {

  const {userId} = auth();
  if(!userId){
    return redirect("/")
  }
  const course = await prismadb.course.findMany({
    where:{
      userId,
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  return (
    <div className='p-6'>
        <Link href="/teacher/create">
            <Button>
                New course
            </Button>
        </Link>

        <div className='mt-5'>
        <DataTable data={course} columns={columns}/>

        </div>

       


    </div>
  )
}

export default CoursePage