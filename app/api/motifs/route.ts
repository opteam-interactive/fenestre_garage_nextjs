import { encodeBase64, fetchToApi } from "@/utils/utils"


export async function GET() {

    const getMotifs = async () => {
        const SQL = "SELECT * FROM MotifRDV"
        const encodedSQL = encodeBase64(SQL)
        const motifList = await fetchToApi(encodedSQL)
        return motifList.data
    }

    try {
        const motifs = await getMotifs()
        return Response.json({ motifs })
    } catch (error) {
        console.log(error)
        return Response.json({ error })
    }

}