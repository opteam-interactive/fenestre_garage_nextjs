"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "@/types/zod"
import { DevTool } from '@hookform/devtools';
import type { WebdevUser } from "@/types/types";

export default function AccountForm({currentUser} : {currentUser?: WebdevUser | null}) {
    
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            email: currentUser?.Email,
            category: currentUser?.Société === '' ? 'particulier' : 'societe',
            lastName: currentUser?.Nom,
            firstName: currentUser?.Prénom,
            telephone: currentUser?.Téléphone,
            societe: currentUser?.Société,
            address: currentUser?.Adresse,
            city: currentUser?.Ville,
            zipcode: currentUser?.cp

        }
    })

    //Check if entreprise is selected
    const selectedCategory = watch('category')

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <DevTool control={control} placement="top-left" />

            <fieldset className="fieldset gap-4  p-4">
                {/* EMAIL */}
                <div>
                    <label className="fieldset-label">Email</label>
                    <input type="email" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("email")} />
                    <p className="text-error my-1">{errors.email?.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 ">
                    {/* PARTICULIER / SOCIETE */}
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center">
                            <input type="radio" className="radio" value={"particulier"} {...register("category")} />
                            <label className="fieldset-label text-info">Un particulier</label>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input type="radio" value={"societe"} className="radio" {...register("category")} />
                            <label className="fieldset-label text-info">Une société</label>
                        </div>
                        <p className="text-error my-1">{errors.category?.message}</p>
                    </div>

                    {/* SOCIETE */}
                    {selectedCategory === "societe" &&
                        <div>
                            <label className="fieldset-label">Société</label>
                            <input type="text" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("societe")} />
                            <p className="text-error my-1">{errors.societe?.message}</p>
                        </div>
                    }

                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* NOM */}
                    <div>
                        <label className="fieldset-label">Nom</label>
                        <input type="text" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("lastName")} />
                        <p className="text-error my-1">{errors.lastName?.message}</p>
                    </div>

                    {/* PRENOM */}
                    <div>
                        <label className="fieldset-label">Prénom</label>
                        <input type="text" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("firstName")} />
                        <p className="text-error my-1">{errors.firstName?.message}</p>
                    </div>
                </div>

                {/* TELEPHONE */}
                <div>
                    <label className="fieldset-label">Téléphone</label>
                    <input type="text" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("telephone")} />
                    <p className="text-error my-1">{errors.telephone?.message}</p>
                </div>

                {/* ADRESSE */}
                <div>
                    <label className="fieldset-label">Adresse</label>
                    <input type="text" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("address")} />
                    <p className="text-error my-1">{errors.address?.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* CODE_POSTAL */}
                    <div>
                        <label className="fieldset-label">Code Postal</label>
                        <input type="text" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("zipcode")} />
                        <p className="text-error my-1">{errors.zipcode?.message}</p>
                    </div>

                    {/* VILLE */}
                    <div>
                        <label className="fieldset-label">Ville</label>
                        <input type="text" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("city")} />
                        <p className="text-error my-1">{errors.city?.message}</p>
                    </div>
                </div>


                <button className="btn btn-info rounded-full">Modifier mon compte</button>
            </fieldset>
        </form>
    )
}
