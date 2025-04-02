import React from 'react'
import { getUser } from "@/utils/auth"
import { redirect } from "next/navigation"

export default async function AuthWrapper({children}:{children:React.ReactNode}) {
     const { authenticated, user } = await getUser()
      if (!user || !authenticated) {
        return redirect('/')
    } 
  return (
    <>{children}</>
  )
}
