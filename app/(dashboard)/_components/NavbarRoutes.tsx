'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import NavbarItem from './NavbarItem'

const guestRoutes =[
    {
        label:"Dashboard",
        href:"/"
    },
    {
        label:"Browse",
        href:"/search"
    },
    
]

const TeacherRoutes =[
    {
        label:"Courses",
        href:"/teacher/courses"
    },
    {
        label:"Analytics",
        href:"/teacher"
    }
]

const NavbarRoutes = () => {

    const pathname = usePathname();

    const isTeacherPage  = pathname?.includes("/teacher")

    const routes = isTeacherPage ? TeacherRoutes: guestRoutes;
  return (
    <div className='flex items-center space-x-8 z-50'>
        {routes.map((route)=>(

           <NavbarItem
           key={route.href}
           href={route.href}
           label={route.label}
           />


        ))}


    </div>
  )
}

export default NavbarRoutes