import { z, rdvSchema, userSchema } from "@/types/zod"
 

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

export type WebdevRendezVous = {
    IDRendezVous: number,
    NomSite : 'PEUGEOT',
    DateRécept : string,
    DateRestit : string,
    Client: string,
    Téléphone: string,
    Mobile: string,
    ClientEmail: string,
    ClientAdresse: string,
    ClientCP: string,
    ClientVille: string,
    Marque: string,
    Modèle: string,
    Immatriculation: string,
    Travaux: string,
    NomActivité: string,
    NbHeureTx: string,
    Observations: string,
    IDVoiturePret: 0,
    ClientAssurance: string,
    Cdé: false,
    DépotSansContact: false,
    CréateurDateh: Date,
    CréateurID: number,
    ModifieurDateh: string,
    ModifieurID: 0,
    IDMotifRDV: number,
    IDUtilisateur: number,
    IDVéhicule: number,
    SaisieDuClient: string,
    Etat: 1
}

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