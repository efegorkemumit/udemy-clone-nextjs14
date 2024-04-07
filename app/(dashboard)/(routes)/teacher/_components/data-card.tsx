import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/format';
import React from 'react'

interface DatacCardProps{
    value:number;
    label:string;
    shouldFormat?:boolean
}

const DAtacard = ({label,value,shouldFormat}:DatacCardProps) => {
  return (
   <Card>
    <CardHeader className='flex flex-row items-center pb-2'>
        <CardTitle>
            {label}

        </CardTitle>
    </CardHeader>
    <CardContent>
        <div className='text-3xl'>

            {shouldFormat ? formatPrice(value):value}
        </div>

    </CardContent>


   </Card>
  )
}

export default DAtacard