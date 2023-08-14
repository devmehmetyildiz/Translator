import React from 'react'

export default function Pagewrapper({ children, newHeight }) {

    const newclass = `w-full h-[calc(${newHeight ? newHeight : '100vh-59px-2rem'})] overflow-y-auto mx-auto flex flex-col  justify-start items-center  px-[2rem]`

    return (
        <div className={newclass}>
            {children}
        </div>
    )
}
