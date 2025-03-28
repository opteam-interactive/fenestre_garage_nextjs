import FormWrapper from '@/components/FormWrapper'
import RdvForm from '@/components/forms/RdvForm'
import { getHolidays } from '@/libs/date';
import { getUser } from "@/libs/auth"
import { redirect } from "next/navigation"
export default async function page() {

  const user = await getUser()
  if (!user ) {
    return redirect('/')
} 
  const motifsData = await fetch(process.env.SITE_URL + '/api/motifs').then(res => res.json())
  const motifs = motifsData.motifs
  const holidays = getHolidays(new Date().getFullYear())
  return (
    <div>
    <section className="flex flex-col items-center gap-4 p-12">

        <div className="text-center">

            <h1 className="mb-2 uppercase font-terminaBold text-customblue">Prendre un RDV...</h1>
            <h2 className="font-semibold text-customyellow">Attention, si vous avez plusieurs travaux à effectuer, <br />
                merci de nous contacter au 02 35 46 03 70.</h2>
        </div>

        <FormWrapper title='Votre rendez-vous' className='md:w-2/3 lg:w-1/2 my-8'>
            <RdvForm motifs={motifs} holidays={holidays}/>
        </FormWrapper>


    </section>

</div>
  )
}
