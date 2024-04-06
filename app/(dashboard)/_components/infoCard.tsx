import React from 'react'
import { FaHistory } from "react-icons/fa";

interface InfoCardProps{
    numberOfItem:number;
    label:"string";
}

const InfoCard = ({label,numberOfItem}:InfoCardProps) => {
  return (
    <div className='border rounded-xl p-3 justify-center flex items-center gap-2'>
        <div>
<p className='mb-5'>
<FaHistory size={50} />
</p>
       

            <p className='font-medium'>
                {label}
            </p>

            <p className='text-gray-700 text-sm'>
                {numberOfItem} {numberOfItem==="1" ? "Course" : "Courses"}


            </p>
        </div>



    </div>
  )
}

export default InfoCard