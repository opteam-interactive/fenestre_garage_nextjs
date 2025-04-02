import { rdvSchema } from "@/types/zod"
import { getUser } from "@/utils/auth"
import { convertUtfToLocale } from "@/utils/date"
import { redirect } from "next/navigation"
import { fetchToApi, encodeBase64 } from "@/utils/utils"
import {format} from 'date-fns'

import { rdvWebdevSchema } from "@/types/zod"
import type { WebdevUser, RdvWebdev, Motif } from "@/types/types"

export async function POST(request: Request) {
    
    const { formData, motifs, selectedMotifID } = await request.json()
  
   
    // Validate
    const parseResult = rdvSchema.safeParse(formData)
    if (!parseResult.success) {
        console.error(parseResult.error)
        return Response.json({ error: parseResult.error }, { status: 400 });
    }

    const { authenticated, user } = await getUser()
    if (!user || !authenticated) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const webdevUser = user as WebdevUser



    try {

        //Find motif from its ID
        const selectedMotif = motifs.find((motif : Motif) => motif.IDMotifRDV === parseInt(formData.task))

        // Get DateRecept in UTC time
        const formattedDateRecept = convertUtfToLocale(formData.appointmentDate, formData.appointmentTime)

        // Set DateRestit to 18:00:00.000
        const formattedDateRestit = convertUtfToLocale(formData.appointmentDate, "18:00")
    

        // Format Travaux description
        const formattedTravaux = `MOTIF: ${selectedMotif?.Motif} - PRET VEHICULE = ${formData.rental ? "OUI" : "NON"
            } - CHIFFRAGE = ${formData.chiffrage ? "OUI" : "NON"} - TYPE DE VEHICULE SOUHAITE = ${formData.rentalCategory ?? "SANS OBJET"
            } - TYPE DE TRANSMISSION SOUHAITEE = ${formData.rentalDrive ?? "SANS OBJET"
            } - SANS CONTACT = ${formData.contactless === "true" ? "OUI" : "NON"}`;

            

    
//         // Build RDV Object
        const rdv: RdvWebdev = {
            NomSite: "PEUGEOT",
            DateRécept: formattedDateRecept,
            DateRestit: formattedDateRestit,
            Client: `${user.Société ?? ""} ${webdevUser.Nom ?? ""} ${webdevUser.Prénom ?? ""}`.trim(),
            Téléphone: webdevUser.Téléphone ?? "",
            Mobile: webdevUser.Téléphone ?? "",
            ClientEmail: webdevUser.Email,
            ClientAdresse: webdevUser.Adresse ?? "",
            ClientCP: webdevUser.cp ?? "",
            ClientVille: webdevUser.Ville ?? "",
            Marque: formData.brand,
            Modèle: formData.model,
            Version: "",
            immatriculation: formData.plateNumber,
            Travaux: formattedTravaux,
            NomActivité: formData.rdvCategory || "AucunP",
            NbHeureTx: parseFloat(parseFloat(selectedMotif?.TempsEstimé!).toFixed(2)),
            Observations: "",
            IDVoiturePret: 0,
            ClientAssurance: " ",
            Cdé: false,
            // DépotSansContact: form.data.contactless === "true" ? true : false,
            DépotSansContact: false,
            CréateurDateh: format(new Date(), "yyyyMMddHHmmssSSS"),
            ModifieurDateh: "",
            ModifieurID: 0,
            IDMotifRDV: selectedMotif?.IDMotifRDV ?? formData.task,
            IDUtilisateur: webdevUser.IDUtilisateur ?? null,
            IDVéhicule: 0,
            SaisieDuClient: "",
            Etat: 1,
            Blacklistage: ""

        };

        // Validate Data with ZOD
        rdvWebdevSchema.parse(rdv);

        const SQL = `
INSERT INTO RendezVous (
NomSite, DateRécept, DateRestit, Client, Téléphone, Mobile, ClientEmail, 
ClientAdresse, ClientCP, ClientVille, Marque, Modèle, Version, immatriculation, 
Travaux, NomActivité, NbHeureTx, Observations, IDVoiturePret, ClientAssurance, 
Cdé, DépotSansContact, CréateurDateh, ModifieurDateh, ModifieurID, IDMotifRDV, 
IDUtilisateur, IDVéhicule, SaisieDuClient, Etat, Blacklistage
) VALUES (
'${rdv.NomSite}', 
'${rdv.DateRécept}', 
'${rdv.DateRestit}', 
'${rdv.Client}', 
'${rdv.Téléphone}', 
'${rdv.Mobile}', 
'${rdv.ClientEmail}', 
'${rdv.ClientAdresse}', 
'${rdv.ClientCP}', 
'${rdv.ClientVille}', 
'${rdv.Marque}', 
'${rdv.Modèle}', 
'${rdv.Version}',
'${rdv.immatriculation}', 
'${rdv.Travaux}', 
'${rdv.NomActivité}', 
${rdv.NbHeureTx}, 
'${rdv.Observations}', 
'${rdv.IDVoiturePret}', 
'${rdv.ClientAssurance}', 
${rdv.Cdé === null ? "NULL" : `'${rdv.Cdé}'`}, 
${rdv.DépotSansContact ? 1 : 0}, 
'${rdv.CréateurDateh}', 
${rdv.ModifieurDateh === null ? "NULL" : `'${rdv.ModifieurDateh}'`}, 
${rdv.ModifieurID === null ? "NULL" : `'${rdv.ModifieurID}'`}, 
'${rdv.IDMotifRDV}', 
${rdv.IDUtilisateur === null ? "NULL" : `'${rdv.IDUtilisateur}'`}, 
${rdv.IDVéhicule === null ? "NULL" : `'${rdv.IDVéhicule}'`}, 
${rdv.SaisieDuClient === null ? "NULL" : `'${rdv.SaisieDuClient}'`}, 
${rdv.Etat === null ? "NULL" : `'${rdv.Etat}'`}, 
${rdv.Blacklistage === "" ? "NULL" : `'${rdv.Blacklistage}'`}
);
`;

        const encodedSQL = encodeBase64(SQL);

        const apiResponse = await fetchToApi(encodedSQL);
        console.log(apiResponse)
        if (!apiResponse.success) {
            // Gestion des erreurs de l'API externe
            return Response.json(
                { error: apiResponse.error },
                { status: apiResponse.status || 500 } // Utilisez le code d'état de l'API ou 500 par défaut
            );
        }

        //SEND_CONFIRMATION_EMAIL
        // const response = sendRdvEmail(webdevUser, form.data, selectedMotif!);

        // if (!response.success) {
        //     return Response.json(
        //         { error: response.error },
        //         { status: response.status || 500 }
        //     )
        // }

        // redirect ('/espace-client/prendre-rdv');
        return Response.json({ success: true }, { status: 200 });
    }
    catch (error) {
        console.error("Erreur :", error);
        return Response.json({ error: "Une erreur s'est produite" }, { status: 500 });

    }
}


