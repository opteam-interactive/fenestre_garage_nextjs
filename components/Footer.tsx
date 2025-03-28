
import Image from 'next/image';

import logo from '@/public/images/logo_peugeot.png'

export default function Footer() {
    return (
     <>
           {/* Spacer for the footer */}
            <div className="h-84"></div>
            
            <section className="absolute bottom-0 left-0 right-0 " >
                <div className="flex flex-col items-center gap-2 mt-16 text-center">
                     <Image src={logo} alt="" className="w-24 -m-15 z-1" /> 
                    <div className="w-full pt-16 pb-6 bg-lightblue">
                        <p>PEUGEOT</p>
                        <p>GARAGE BENOIST FENESTRE</p>
                        <p>220, rue Sophie Blanchard</p>
                        <p>76620 Le Havre</p>
                        <p>Tél. : 02 35 46 03 70</p>
                        <p>accueil@garagefenestre.fr</p>
                    </div>
                </div>
            </section>
     </>

    )
}
