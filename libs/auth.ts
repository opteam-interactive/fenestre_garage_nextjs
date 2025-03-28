import * as jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { WebdevUser } from "../types/types";


export async function getToken() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    return token;
}

export async function getUserData() {
    const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

    const logStatus: boolean = await isLoggedIn();
    if (!logStatus) {
        return null;
    }

    const token = await getToken();
    if (!token) {
        return null;
    }
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = decodedToken as WebdevUser;

        return user;
    } catch (error) {
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