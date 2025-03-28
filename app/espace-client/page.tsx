import FormWrapper from "@/components/FormWrapper"
import AccountForm from "@/components/forms/AccountForm"
import { getUser } from "@/libs/auth"
import { redirect } from "next/navigation"

export default async function page() {
  const user = await getUser()
  if (!user ) {
    return redirect('/')
} 

  return (
    <div>

      <section className="flex flex-col items-center gap-4 p-12">
        <div className="text-center">
          <h1 className="mb-2 uppercase font-terminaBold text-customblue">Votre Espace</h1>
          <h2 className="font-semibold text-customyellow">Attention, si vous avez plusieurs travaux à effectuer, <br />
            merci de nous contacter au 02 35 46 03 70.</h2>
        </div>
        <FormWrapper title='Je gère mon compte' className='md:2/3 lg:w-1/2 my-8'>
          <AccountForm />
        </FormWrapper>

      </section>
    </div>

  )
}
