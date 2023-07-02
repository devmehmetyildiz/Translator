import React from 'react'

export default function Pagewrapper({ children }) {
    return (
        <div className='w-full h-[calc(100vh-59px-2rem)] mx-auto flex flex-col  justify-start items-center pb-[2rem] px-[2rem]'>
            {children}
        </div>
    )
}
