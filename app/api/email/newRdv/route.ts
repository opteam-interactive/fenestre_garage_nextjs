import { rdvSchema } from "@/types/zod"
import { getUser } from "@/utils/auth"
import { convertUtfToLocale } from "@/utils/date"
import { redirect } from "next/navigation"
import { fetchToApi, encodeBase64 } from "@/utils/utils"
import { format } from 'date-fns'
import { sendRdvEmail } from '@/utils/sendEmails'

import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { formData, webdevUser , selectedMotif } = await request.json()
        //SEND_CONFIRMATION_EMAIL
        const response = sendRdvEmail(webdevUser, formData, selectedMotif!);
        
        if (!response.success) {
            NextResponse.json({ error: "Error sending email" }, { status: 500 });
        }
        return NextResponse.json({ success: true, message: "Rendez-vous enregistré avec succès" });
    }
    catch (error) {
        console.error("Erreur :", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}

