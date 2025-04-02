import type { RdvWebdev } from "@/types/types";
import { fetchToApi, encodeBase64 } from "@/utils/utils";

export async function getUserRdvs (userId : number) {

    // const SQL = `SELECT * FROM RendezVous WHERE IDUtilisateur = ${userId} AND DateRestit >= GETDATE()`
    const SQL = `SELECT * FROM RendezVous WHERE IDUtilisateur = ${userId} AND DateRestit >= GETDATE()`
    const encodedSQL = encodeBase64(SQL)
    try {
        const response = await fetchToApi(encodedSQL);
        if (response.error == 'FALSE') {
            console.error("ERROR")
            return null
        }
        const userRdvs: RdvWebdev[] | null = response.data
        return userRdvs

    } catch (error) {
        console.error(error)
        return null
    }
}