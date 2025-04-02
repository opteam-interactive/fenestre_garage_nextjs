"use client"
// Functions & tools
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DevTool } from '@hookform/devtools';
// Components
import ErrorComponent from "@/components/ErrorComponent"
//Types
import { redirect } from "next/navigation"
import { userSchema } from "@/types/zod"
import type { ErrorMessage, User } from "@/types/types";

export default function AccountForm() {
    const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
          
            email: "",
            category: "particulier",
            lastName: "",
            firstName: "",
            telephone: "",
            societe: "",
            address: "",
            city: "",
            zipcode: ""
        }
    })

    //Check if entreprise is selected
    const selectedCategory = watch('category')
    const onInvalid = (errors) => console.error(errors)
    const onSubmit = async (formData: User) => {
    
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    formData : formData
                }),
            })
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const json = await response.json()
            console.log(json)
            setErrorMessage({ success: true, message: "Utilisateur enregistré avec succès" })
            reset()
            window.location.href = "/";
            
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage({ success: false, message: error.message });
            }
            console.error("Error submitting form:", error);
        }

    }

    return (
        <div className="w-full">
            <ErrorComponent errorMessage={errorMessage} />                
            <DevTool control={control} placement="top-left" />

            <form onSubmit={handleSubmit(onSubmit, onInvalid)} >

                <fieldset className="fieldset gap-4  p-4">
                    {/* EMAIL */}
                    <div>
                        <label className="fieldset-label">Email</label>
                        <input type="email" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("email")} />
                        <p className="text-error my-1">{errors.email?.message}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* PASSWORD */}
                        <div>
                            <label className="fieldset-label">Mot de passe</label>
                            <input type="password" className="input w-full rounded-full" placeholder="" {...register("password")} />
                            <p className="text-error my-1">{errors.password?.message}</p>
                        </div>

                        {/* PASSWORD CONFIRM */}
                        <div>
                            <label className="fieldset-label">Confirmation du mot de passe</label>
                            <input type="password" className="input w-full rounded-full"  {...register("passwordConfirm")} />
                            <p className="text-error my-1">{errors.passwordConfirm?.message}</p>
                        </div>
                    </div>


                    <div className="grid grid-cols-2 gap-4 ">
                        {/* PARTICULIER / SOCIETE */}
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <input type="radio" className="radio" value="particulier" {...register("category")} />
                                <label className="fieldset-label text-info">Un particulier</label>
                            </div>
                            <div className="flex gap-2 items-center">
                                <input type="radio" value="societe" className="radio" {...register("category")} />
                                <label className="fieldset-label text-info">Une société</label>
                            </div>
                            <p className="text-error my-1">{errors.category?.message}</p>
                        </div>

                        {/* SOCIETE */}
                        {selectedCategory === "societe" &&
                            <div>
                                <label className="fieldset-label">Société</label>
                                <input type="text" className="input w-full rounded-full" placeholder="Ex: Société XYZ" {...register("societe")} />
                                <p className="text-error my-1">{errors.societe?.message}</p>
                            </div>
                        }

                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* NOM */}
                        <div>
                            <label className="fieldset-label">Nom</label>
                            <input type="text" className="input w-full rounded-full" placeholder="Ex: Dupont" {...register("lastName")} />
                            <p className="text-error my-1">{errors.lastName?.message}</p>
                        </div>

                        {/* PRENOM */}
                        <div>
                            <label className="fieldset-label">Prénom</label>
                            <input type="text" className="input w-full rounded-full" placeholder="Ex: Jean" {...register("firstName")} />
                            <p className="text-error my-1">{errors.firstName?.message}</p>
                        </div>
                    </div>

                    {/* TELEPHONE */}
                    <div>
                        <label className="fieldset-label">Téléphone</label>
                        <input type="text" className="input w-full rounded-full" placeholder="Ex: 06 00 00 00 00" {...register("telephone")} />
                        <p className="text-error my-1">{errors.telephone?.message}</p>
                    </div>

                    {/* ADRESSE */}
                    <div>
                        <label className="fieldset-label">Adresse</label>
                        <input type="text" className="input w-full rounded-full" placeholder="Ex: 12 rue de l'église" {...register("address")} />
                        <p className="text-error my-1">{errors.address?.message}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* CODE_POSTAL */}
                        <div>
                            <label className="fieldset-label">Code Postal</label>
                            <input type="text" className="input w-full rounded-full" placeholder="Ex: 76600" {...register("zipcode")} />
                            <p className="text-error my-1">{errors.zipcode?.message}</p>
                        </div>

                        {/* VILLE */}
                        <div>
                            <label className="fieldset-label">Ville</label>
                            <input type="text" className="input w-full rounded-full" placeholder="Ex: Le Havre" {...register("city")} />
                            <p className="text-error my-1">{errors.city?.message}</p>
                        </div>
                    </div>


                    <button type="submit" className="btn btn-info rounded-full" >Créer mon compte</button>
                </fieldset>
            </form>
        </div>
    )
}
