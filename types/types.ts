import { z, rdvSchema, userSchema, rdvWebdevSchema } from "@/types/zod"
 
export type ErrorMessage = { success: boolean; message: string };

export type Motif = {
    IDMotifRDV: number,
    Cat: string,
    Motif: string,
    TempsEstimé: string,
    MemoDesConditions: string,
    CaseLibre: string,
    DemandeChiffrageON: boolean,
    NomActivité: 'AtelierP'  | 'CarrosserieP' ,
    NbRDVParJour: number
}
export type RendezVous = z.infer<typeof rdvSchema>
export type RdvWebdev = z.infer<typeof rdvWebdevSchema>


export type User = z.infer<typeof userSchema>


export type WebdevUser = {
    IDUtilisateur: number,
    Utilisateur: string,
    MotDePasse: string,
    Nom: string,
    Prénom: string,
    Société: string,
    Adresse: string,
    Ville: string,
    cp: string,
    Téléphone: string,
    Email: string,
    Droits: number,
    Autre1: string,
    Autre2: string,
    Autre3: string,

}

// export type User = { 
//     id: number,
//     userName: string,
//     password: string,
//     lastName: string,
//     firstName: string,
//     company: string,
//     address: string,
//     city: string,
//     zipcode: string,
//     phone: string,
//     email: string,
//     role: number,
//     other1: string,
//     other2: string,
//     other3: string,
// }