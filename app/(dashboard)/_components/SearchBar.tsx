'use client'

import { Input } from '@/components/ui/input'
import { useBounce } from '@/hooks/useBounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {

  
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId= searchParams.get("categoryId");

  const [value, setValue] = useState("")

  const deboucedValue = useBounce(value)

  useEffect(()=>{
    const url = queryString.stringifyUrl({
      url:pathname,
      query:{
        title:deboucedValue,
        categoryId:currentCategoryId,
      }
    },{skipNull: true, skipEmptyString:true})

    router.push(url)




  }, [deboucedValue, currentCategoryId, router, pathname])




  return (
    <div className='w-full lg:flex relative hidden'>

        <span className='absolute left-2 top-3'>
            <CiSearch className='w-5 h-5'/>

        </span>

        <Input 
        type='text' 
        onChange={(e)=>setValue(e.target.value)}
        value={value}
        className='w-full py-4 px-8 focus-visible:ring-slate-100'
        placeholder='Search.....'/>


    </div>
  )
}

export default SearchBar