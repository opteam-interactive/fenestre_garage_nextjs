import React from 'react'

export default function FormWrapper({ children, title, className }: Readonly<{ children: React.ReactNode, title?:string, className?:string; }>) {

    const classes = `bg-lightblue flex flex-col items-center gap-8 p-4 rounded-xl  ${className}`
    return (
        <div className={classes}>
            <h2>{title}</h2>
            {children}
        </div>
    )
}
