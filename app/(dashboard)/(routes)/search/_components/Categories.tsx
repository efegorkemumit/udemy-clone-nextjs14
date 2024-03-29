'use client'

import { Category } from '@prisma/client';
import React from 'react'
import { FcMusic, FcCommandLine, FcSportsMode, FcEngineering, FcLinux , FcLibrary   } from "react-icons/fc";
import { IconType } from 'react-icons/lib';
import CategoriesItem from './CategoriesItem';

interface CategoriesProps{
  items:Category[];
}


const iconMap: Record<Category["name"], IconType> = {
  "Computer Programming": FcCommandLine,
  "Music": FcMusic,
  "Education": FcLibrary ,
  "Languages": FcLinux,
  "Sport": FcSportsMode ,
  "Fashion": FcEngineering,
};

const Categories = ({items}:CategoriesProps) => {
  return (
    <div className='space-y-2'>

      {items.map((item)=>(
<CategoriesItem
label={item.name}
icon={iconMap[item.name]}
key={item.id}
value={item.id}

/>

      ))}



    </div>
  )
}

export default Categories