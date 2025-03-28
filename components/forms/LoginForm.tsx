"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/types/zod"
import { useRouter } from 'next/navigation'

export default function Loginform() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit =  async (data) => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
        }) 
        if (response.ok) {
            const user = await response.json()
            if (user) {
                router.push("/espace-client")
            }
        }


    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <fieldset className="fieldset gap-4  p-4">
                <div>
                    <label className="fieldset-label">Nom d'utilisateur</label>
                    <input type="text" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("userName")} />
                    <p className="text-error my-1">{errors.userName?.message}</p>
                </div>


                <div>
                    <label className="fieldset-label">Mot de passe</label>
                    <input type="password" className="input w-full rounded-full" placeholder=""  {...register("password")} />
                    <p className="text-error my-1">{errors.password?.message}</p>
                </div>


                <button className="btn btn-info rounded-full">Se connecter</button>
            </fieldset>
        </form>
    )
}
