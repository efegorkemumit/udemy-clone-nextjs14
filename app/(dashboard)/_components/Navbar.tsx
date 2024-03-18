import React from 'react'
import NavbarRoutes from './NavbarRoutes'

const Navbar = () => {
  return (
    <nav className='shadow-md hidden lg:block'>
        <div className='container'>
            <div className='flex items-center justify-center'>

                <div className='px-0 py-4 flex items-center justify-center'>
                    <div className='flex items-center space-x-8 text-base'>
                        <NavbarRoutes/>

                    </div>



                </div>



            </div>

        </div>
    </nav>
  )
}

export default Navbar