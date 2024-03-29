'use client'

import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import qs from 'query-string'

interface CategoriesItemProps{
  label:string;
  value?:string;
  icon?:string;
}


const CategoriesItem = ({label,icon:Icon,value}:CategoriesItemProps) => {

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId= searchParams.get("categoryId");
  const currentTitle= searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick=()=>{
    const url = qs.stringifyUrl({
      url:pathname,
      query:{
        title:currentTitle,
        categoryId:isSelected ? null : value,
      }
    },{skipNull: true, skipEmptyString:true})

    router.push(url)

    



  }
  return (
    <div className='flex items-center mt-1'>
      <button 
    className={cn(" flex py-2 px-3 w-full text-sm rounded-full font-semibold items-center gap-x-1 hover:border-purple-700 transition",
    isSelected && "border-purple-700 bg-purple-100")}
    onClick={onClick}
    >
      {Icon && <Icon size={25} />}
      
      <div className=''>
      {label}
      </div>
   



      </button>
    </div>
  )
}

export default CategoriesItem