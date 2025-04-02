
import { cookies } from 'next/headers'
import { encodeBase64, fetchToApi } from "@/utils/utils";
import { User } from "@/types/types";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: Request) {

    try {
        const { formData }= await req.json();
    
        //Set the role as user (default)
        const defaultRole = 2
        

        const SQL = `INSERT INTO UTILISATEUR (Utilisateur, MotDePasse, Nom, Prénom, Société, Adresse, Ville, cp, Téléphone, Email, Droits, Autre1, Autre2, Autre3) VALUES ('${formData.email || ''}','${formData.password || ''}', '${formData.lastName || ''}', '${formData.firstName || ''}','${formData.societe || ''}', '${formData.address || ''}', '${formData.city || ''}', '${formData.zipcode || ''}', '${formData.telephone || ''}', '${formData.email || ''}', '${defaultRole || ''}', '${formData.other1 || ''}', '${formData.other2 || ''}', '${formData.other3 || ''}')`;

        const encodedSQL = encodeBase64(SQL);

        // Fetch data from API
        const userResponse = await fetchToApi(encodedSQL);

        if (!userResponse.success) {
            throw new Error(userResponse.error);
        }

        return NextResponse.json({ success: true, message: "Utilisateur enregistré avec succès" });

    } catch (error) {
        console.error("Error in register route:", error);
        return NextResponse.json({ error:  "Internal server error" }, { status: 500 });
    }


}