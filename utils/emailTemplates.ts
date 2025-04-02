import { sendEmail } from "@/utils/sendEmails";
import type { RendezVous, WebdevUser, Motif } from "@/types/types";

export function sendRdvEmail(user: WebdevUser, rdv: RendezVous, motif: Motif) {
    try {
        const email = user.Email
        const name = `${user.Nom} ${user.Prénom}`
        const html = `
        <h2>Bonjour,</h2>
    <h3>Vous venez de prendre rendez-vous avec le garage Fenestre.</h3>
    <h4>Votre rendez-vous est le ${new Date(rdv.appointmentDate).toLocaleDateString("fr-FR")} - ${rdv.appointmentTime}</h4>
    
    <p>Note : Si vous avez plusieurs travaux à effectuer, merci de nous contacter au 02 35 46 03 70.</p>
    <p>Pensez à prendre votre permis de conduire et votre carte grise</p>
    <p>Voici un résumé de votre rendez-vous :</p>
    
    <ul>
        <li>Véhicule : ${rdv.brand} - ${rdv.model}</li>
        <li>Immatriculation : ${rdv.plateNumber}</li>
        <li>Intervention :  ${rdv.rdvCategory === 'AtelierP' ? 'Mécanique' : 'Carrosserie'}</li>
                <li> Travaux : ${motif.Motif || "Non défini"}
                </li>
                <li>Devis : ${rdv.chiffrage ? "Oui" : "Non"}</li>
                <li> Prêt : ${rdv.rental ? "Oui" : "Non"}</li>
                ${rdv.rental ? `<li>Type de location : ${rdv.rentalCategory === "eco" ? "Eco" : "Standard"}</li>` : ""}
                ${rdv.rental ? `<li> Transmission : ${rdv.rentalDrive === "manual" ? "Manuelle" : "Automatique"}</li>` : ""}
                <li> Date du RDV : ${new Date(rdv.appointmentDate).toLocaleDateString("fr-FR")} - ${rdv.appointmentTime}</li>
                <li> Type de dépot :  ${rdv.contactless ? "Sans contact" : "Sur horaires d'ouverture"} </li>
    </ul>
        `
        const response = sendEmail(email, name, html);
        return { success: true, response }
    } catch (error) {
        console.log(error)
        return { success: false, error }
    }

}
