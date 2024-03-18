import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Logo from './Logo'
import NavbarRoutes from './NavbarRoutes'


const MobileMenu = () => {
  return (
    <Sheet>
  <SheetTrigger className='md:hidden pr-4'>
    <Menu/>
  </SheetTrigger>
  <SheetContent side="top" className='p-0 bg-white'>
    <div className='p-6'>
             <Logo/>
    </div>

    <div className='flex flex-row w-full px-6 pb-10'>
      <NavbarRoutes/>


    </div>
   
   
  </SheetContent>
</Sheet>
  )
}

export default MobileMenu