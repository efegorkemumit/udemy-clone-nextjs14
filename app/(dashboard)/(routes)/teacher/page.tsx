import React from 'react'
import DAtacard from './_components/data-card'
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { getAnalytics } from '@/actions/get-analytics';
import Chart from './_components/chart';

const Teacher = async() => {

  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const {data,totalRevenue,totalSales} = await getAnalytics(userId)

  
  return (
    <div className='p-6'>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-2  mb-5'>

        <DAtacard
        label='Total Price'
        value={totalRevenue}
        shouldFormat
        
        />

        <DAtacard
        label='Total Sales'
        value={totalSales}

        >


        </DAtacard>


      


      </div>

      <Chart
        data={data}
        
        />



    </div>
  )
}

export default Teacher