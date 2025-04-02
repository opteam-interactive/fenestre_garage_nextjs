import LoginForm from '@/components/forms/LoginForm'

import Image from 'next/image'
import logo from '@/public/images/logo_peugeot.png'

export default function page() {

  return (
    <section className="flex flex-col items-center h-screen gap-4 p-12">
      <Image src={logo} alt="" className="w-32" />
      <div className="text-center">
        <h1 className="mb-2 uppercase font-termina">Votre Garage</h1>
        <h2 className="uppercase font-terminaBold text-lightblue2">Benoist Fenestre</h2>
      </div>
      <div className="flex flex-col items-center w-1/3  py-4 shadow-lg rounded-xl bg-lightblue">
        <h3 className="font-semibold">Connexion à votre espace</h3>
         <LoginForm /> 
      </div>
      <a href="/register" className="btn btn-success rounded-full">Créer un compte  </a>

    </section>
  )
}
