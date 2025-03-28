import { getUser } from "@/libs/auth"
import { redirect } from "next/navigation"

export default async function page() {
    const user = await getUser()
    if (!user ) {
      return redirect('/')
  } 
  return (
    <div>page</div>
  )
}
