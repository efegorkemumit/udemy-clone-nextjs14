import React from 'react'

interface AuthProps{
    children:React.ReactNode
}

const AuthLayout = ({children}:AuthProps) => {
  return (
    <div className='h-full flex items-center justify-center'>
        {children}

    </div>
  )
}

export default AuthLayout