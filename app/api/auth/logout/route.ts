
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
export async function GET(req: Request) {
    try {
        const cookieStore = await cookies()
        cookieStore.delete('auth_token')
        redirect('/')
    } catch (error) {
        return Response.json({ error })
    }
        
}