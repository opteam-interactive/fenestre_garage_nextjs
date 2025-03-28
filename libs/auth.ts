import { jwtVerify, decodeJwt } from "jose";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WebdevUser } from "../types/types";

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
export async function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    return token;
}

export async function getUser() {

    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')
    if (!token) return null;
    try {
        const tokenValue = token.value;
        const { payload } = await jwtVerify(tokenValue, secretKey);
        return payload as WebdevUser; // Cast payload to your user type
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}

export async function getUserData(token: string): Promise<WebdevUser | null> {

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, secretKey);
        return payload as WebdevUser; // Cast payload to your user type
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}

export async function getUserOrRedirect() {
    const jwtPayload = await getUserData();
    if (!jwtPayload) {
        return redirect("/");
    }
    console.log(jwtPayload);
    return jwtPayload
}
export async function isLoggedIn() {

    const token = await getToken();

    if (token) {
        return true;
    }

    return false;
}

export function isTokenExpired(token: string): boolean {
    try {
        // Decode the token without verifying the signature
        const decoded = decodeJwt(token);

        // Get the expiration time from the decoded token (exp is in seconds)
        const expirationTime = decoded.exp;

        // Check if the token is expired (current time in seconds)
        return expirationTime < Math.floor(Date.now() / 1000);
    } catch (error) {
        console.error('Failed to decode token', error);
        return true; // If there's an error decoding, consider it expired
    }
}