'use client'

import { Card } from '@/components/ui/card';
import React from 'react'
import { BarChart, Bar, Rectangle, XAxis,
     YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartProps{
    data:{
        name:string;
        total:number;
    }[];

}

const Chart = ({data}:ChartProps) => {

  return (
    <Card>

<ResponsiveContainer width="100%" height={300}>
        <BarChart
         
          data={data}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
        


    </Card>
  )
}

export default Chart