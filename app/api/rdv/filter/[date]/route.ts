import { WebdevRendezVous } from "@/types/types";
import { fetchToApi, encodeBase64 } from "@/utils/utils"; // Your existing fetch function
import { generateTimeSlots, getCalendarEndBound } from "@/utils/date"

interface Erreur {
    erreur: string;
}
export async function GET(request: Request, { params }: { params: Promise<{ date: string }> }) {

    const { date } = await params
    if (!date) {
        return Response.json({ error: "Missing date parameter" }, { status: 400 });
    }

    const startDate = `${date}T00:00:00.000`; // 00:00:00.000
    const endDate = `${date}T23:59:59.999`;

    try {
        // Fetch RDVs only for the selected date
        const SQL = `SELECT RendezVous.IDRendezVous, RendezVous.DateRécept, RendezVous.DateRestit, RendezVous.IDMotifRDV, RendezVous.Etat FROM RendezVous WHERE  ( RendezVous.DateRécept >= '${startDate}' AND RendezVous.DateRécept <= '${endDate}' )`;
        const encodedSQL = encodeBase64(SQL);
        const response = await fetchToApi(encodedSQL);

        if (!response.success) {
            return Response.json({ error: response.error }, { status: 500 });
        }

        let bookedRDV: WebdevRendezVous[] | Erreur = response.data
      

         //Get all possible time slots
        const allTimeSlots: string[] = generateTimeSlots(8, 10, 15);

        //Error handling: if error return all slots
        if (!Array.isArray(bookedRDV)) {
            console.log('error from request', bookedRDV)
            return Response.json(allTimeSlots, { status: 206 });
        }

        //Extract the time of the booked RD
        const occupiedSlots: string[] = bookedRDV.map(rdv => {
            const rdvDate = new Date(rdv.DateRécept);
            const hours = String(rdvDate.getHours()).padStart(2, '0');
            const minutes = String(rdvDate.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        });

        //setRdvlist with the remaining free slots
        const availableSlots = allTimeSlots.filter(slot => {
            return !occupiedSlots.some(occupiedSlot =>
                occupiedSlot === slot
            );
        });


        return Response.json(availableSlots, { status: 200 });
    } catch (error) {
        console.error("Error fetching RDVs:", error);
        return Response.json({ error: "Failed to fetch appointments" }, { status: 500 });
    }
}
