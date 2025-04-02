
import { cookies } from 'next/headers'
import { encodeBase64, fetchToApi } from "@/utils/utils";
import { User } from "@/types/types";
import { NextRequest, NextResponse } from 'next/server';
import { getUser } from "@/utils/auth";

export async function UPDATE(req: Request) {

    try {
        const { formData }= await req.json();
        if (!formData) {
            return NextResponse.json({ success: false, message: "Erreur de formulaire manquant" }, { status: 400 });
        }
    

        // TODO : GET_CURRENT_USER
        const { authenticated, user } = await getUser()
        if (!user || !authenticated) {
            return NextResponse.json({ success: false, message: "Utilisateur non authentifié" }, { status: 401 });
        }

        // TODO: UPDATE_QUERY
        

        const SQL = `
        UPDATE UTILISATEUR
        SET
            Utilisateur = '${formData.email || ''}',
            MotDePasse = '${formData.password || ''}',
            Nom = '${formData.lastName || ''}',
            Prénom = '${formData.firstName || ''}',
            Société = '${formData.societe || ''}',
            Adresse = '${formData.address || ''}',
            Ville = '${formData.city || ''}',
            cp = '${formData.zipcode || ''}',
            Téléphone = '${formData.telephone || ''}',
            Email = '${formData.email || ''}',
            Droits = '${user.Droits || ''}',
            Autre1 = '${formData.other1 || ''}',
            Autre2 = '${formData.other2 || ''}',
            Autre3 = '${formData.other3 || ''}'
        WHERE id = '${user.IDUtilisateur}'
    `;

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