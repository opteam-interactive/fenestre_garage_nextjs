
import RegisterForm from '@/components/forms/RegisterForm'
import FormWrapper from '@/components/FormWrapper'
export default function page() {
    return (
        <div>

            <section className="flex flex-col items-center gap-4 p-12">
                <div className="text-center">
                    <h1 className="mb-2 uppercase font-terminaBold text-customblue">Creation de compte</h1>
                    <a href='/' className="mb-2  text-customblue">◄ Retour à l'écran de connexion</a>
                </div>
                <FormWrapper title='Veuillez renseigner vos informations' className='w-1/2 my-8'> 
                    <RegisterForm  />
                </FormWrapper>



            </section>
        </div>

    )
}
