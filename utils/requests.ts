import { encodeBase64, fetchToApi } from "./utils"
import { getCalendarEndBound } from "./date"

export const fetchTestRequest = 'U0VMRUNUIFVUSUxJU0FURVVSLkRyb2l0cyBGUk9NIFVUSUxJU0FURVVSIFdIRVJFIFVUSUxJU0FURVVSLlV0aWxpc2F0ZXVyID0gJ0Fybm9sZEgnIEFORCBVVElMSVNBVEVVUi5Nb3REZVBhc3NlID0gJ1NlY3VSaXR5NzYhJw=='


//Fetch ALL motifs
//SELECT * FROM motifrdv 
export async function getMotifs() {
    const motifRequest = "U0VMRUNUICogRlJPTSBtb3RpZnJkdg=="
    const motifList = await fetchToApi(motifRequest)
    return motifList.data
}



//Fetch RDV
//SELECT DateRécept FROM RendezVous 
export async function getRdv() {
     const startBound = new Date()
     const endBound = getCalendarEndBound()

    function formatDate(date: Date) {
        function padTo2Digits(num : number) {
            return num.toString().padStart(2, '0');
        }
        return [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('');
    }

    const formattedStartBound = formatDate(startBound)
    const formattedEndBound = formatDate(endBound)
//     const formattedStartBound = 20250101
//  const formattedEndBound = 20250228

    const rdvRequest = encodeBase64(`SELECT RendezVous.IDRendezVous, RendezVous.DateRécept, RendezVous.DateRestit, RendezVous.IDMotifRDV, RendezVous.Etat FROM RendezVous WHERE  ( RendezVous.DateRécept BETWEEN '${formattedStartBound}' AND '${formattedEndBound}' )`)
    const rdvListData = await fetchToApi(rdvRequest)
    const rdvList= rdvListData.data
    if (! Array.isArray(rdvList)){
        console.log('error from request', rdvList)
        return []
    }

    return rdvList
}


