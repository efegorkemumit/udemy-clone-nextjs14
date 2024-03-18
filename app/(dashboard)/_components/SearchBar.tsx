import { Input } from '@/components/ui/input'
import React from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  return (
    <div className='w-full lg:flex relative hidden'>

        <span className='absolute left-2 top-3'>
            <CiSearch className='w-5 h-5'/>

        </span>

        <Input type='text' className='w-full py-4 px-8'
        placeholder='Search.....'/>


    </div>
  )
}

export default SearchBar