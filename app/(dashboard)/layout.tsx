import React from 'react'
import Header from './_components/Header'
import Navbar from './_components/Navbar'

interface DashboardLayoutProps{
    children: React.ReactNode
}

const DashboardLayout = ({children}:DashboardLayoutProps) => {
  return (
    <div>
        <Header/>
        <Navbar/>

            <main className='container px-8 py-8'>
                    {children}
            </main>
    
    </div>
  )
}

export default DashboardLayout