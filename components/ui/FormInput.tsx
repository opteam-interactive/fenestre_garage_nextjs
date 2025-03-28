import React from 'react'

export default function FormInput({ register, errors }) {
    return (
        <div>
            <label className="fieldset-label">Nom d'utilisateur</label>
            <input type="email" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("email")} />
            <p className="text-error my-1">{errors.email?.message}</p>
        </div>
    )
}
