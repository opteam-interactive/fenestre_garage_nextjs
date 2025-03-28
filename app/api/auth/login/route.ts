import { encodeBase64, fetchToApi } from "@/libs/utils";
import { loginSchema } from "@/types/zod";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { WebdevUser } from "@/types/types";
import * as jose from 'jose'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const cookieStore = await cookies()
  
    try {
        const { userName, password } = await req.json();


        // Validate input
        // loginSchema.parse(formData)
        const SQL = `SELECT * FROM UTILISATEUR WHERE Utilisateur = '${userName}' AND MotDePasse = '${password}' LIMIT 1`;
        const encodedSQL = encodeBase64(SQL);
        // Fetch data from API
        const userResponse = await fetchToApi(encodedSQL);


        if (!userResponse.success) {
            return Response.json({ error: userResponse.error }, { status: 400 });
        }
        //Get first user (should only be one)
        const user: WebdevUser = userResponse.data[0]

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 400 });
        }
        const { MotDePasse, ...userData } = user;


        // Generate JWT token
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

        // 🔹 Generate JWT Token
        const token = await new jose.SignJWT(userData)
            .setProtectedHeader({ alg: "HS256" }) // Algorithm
            .setExpirationTime("1h") // Expiry
            .sign(secretKey); // Sign with key


        cookieStore.set("auth_token", token, {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600 * 24, // 1 hour
        });

        return Response.json({ token }, { status: 200 });

    } catch (error) {
        return Response.json({ error }, { status: 400 });
    }
   

}