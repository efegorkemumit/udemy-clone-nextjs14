import { prismadb } from '@/lib/db'
import React from 'react'
import Categories from './_components/Categories'

const SearchPage = async() => {

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

      <div className='lg:col-span-5'>


      </div>



    </div>
  )
}

export default SearchPage