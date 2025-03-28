"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/types/zod"

export default function Loginform() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <fieldset className="fieldset gap-4  p-4">
                <div>
                    <label className="fieldset-label">Nom d'utilisateur</label>
                    <input type="email" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("userName")} />
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
