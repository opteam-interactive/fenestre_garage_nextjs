"use client"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { rdvSchema } from "@/types/zod"
import { DevTool } from '@hookform/devtools';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { fr } from "react-day-picker/locale";

export default function RdvForm() {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(rdvSchema),
    })

    const hasRental = watch("rental")
    const appointmentDate = watch("appointmentDate")

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <DevTool control={control} placement="top-left" />

            <fieldset className="fieldset gap-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Marque */}
                    <div>
                        <label className="fieldset-label">Marque</label>
                        <input type="text" className="input w-full rounded-full" placeholder="Votre identifiant" {...register("brand")} />
                        <p className="text-error my-1">{errors.brand?.message}</p>
                    </div>

                    {/* Modele */}
                    <div>
                        <label className="fieldset-label">Modèle</label>
                        <input type="text" className="input w-full rounded-full" placeholder="" {...register("model")} />
                        <p className="text-error my-1">{errors.model?.message}</p>
                    </div>

                </div>

                {/* Immatriculation */}
                <div>
                    <label className="fieldset-label">Immatriculation</label>
                    <input type="password" className="input w-full rounded-full"  {...register("plateNumber")} />
                    <p className="text-error my-1">{errors.plateNumber?.message}</p>
                </div>


                {/* MECANIQUE_OU_CARROSSERIE */}
                <div className="flex  gap-2">
                    <p className="fieldset-label">Type d'intervention : </p>

                    <label className="fieldset-label text-info">
                        <input type="radio" className="radio" value={"AtelierP"} {...register("rdvCategory")} />
                        Mécanique
                    </label>

                    <label className="fieldset-label text-info">
                        <input type="radio" value={"CarrosserieP"} className="radio" {...register("rdvCategory")} />
                        Carrosserie
                    </label>
                    <p className="text-error my-1">{errors.rdvCategory?.message}</p>
                </div>

                {/* TRAVAUX */}
                <div>
                    <label htmlFor="task" className="fieldset-label ">Motif d'intervention</label>
                    <select defaultValue="Choisir le motif" className="select w-full rounded-full" {...register("task")} >
                        <option disabled={true}>Pick a color</option>
                        <option>Crimson</option>
                        <option>Amber</option>
                        <option>Velvet</option>
                    </select>
                    <p className="text-error my-1">{errors.task?.message}</p>
                </div>


                {/* CHIFFRAGE / DEVIS ? */}
                <div className="">
                    <label className="fieldset-label text-info">
                        <input type="checkbox" className="checkbox" {...register("chiffrage")} />
                        <p className="text-error my-1">{errors.chiffrage?.message}</p>
                        Je désire un chiffrage
                    </label>
                </div>

                {/* LOCATION_? */}
                <div className="">
                    <label className="fieldset-label text-info">
                        <input type="checkbox" className="checkbox" {...register("rental")} />
                        <p className="text-error my-1">{errors.rental?.message}</p>
                        Je désire une location de véhicule
                    </label>
                </div>


                {/* TYPE_DE_LOCATION */}
                {hasRental &&
                    <div className="grid grid-cols-2 border border-neutral-300 p-4 rounded-lg">
                        <div className="flex flex-col gap-2">
                            <label className="fieldset-label text-info">Type de véhicule</label>
                            <label className="fieldset-label text-info">
                                <input type="radio" className="radio" value={"AtelierP"} {...register("rentalCategory")} />
                                Type de véhicule
                            </label>

                            <label className="fieldset-label text-info">
                                <input type="radio" value={"CarrosserieP"} className="radio" {...register("rentalCategory")} />
                                Une société
                            </label>
                            <p className="text-error my-1">{errors.rentalCategory?.message}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="fieldset-label text-info">Transmission</label>

                            <label className="fieldset-label text-info">
                                <input type="radio" className="radio" value={"AtelierP"} {...register("rentalDrive")} />
                                Transmission
                            </label>
                            <label className="fieldset-label text-info">
                                <input type="radio" value={"CarrosserieP"} className="radio" {...register("rentalDrive")} />
                                Une société
                            </label>
                            <p className="text-error my-1">{errors.rentalDrive?.message}</p>
                        </div>
                    </div>
                }

                {/* DATE_DU_RDV */}
                <div>
                    <label className="fieldset-label">Date du RDV</label>
                    <p>{appointmentDate ? appointmentDate.toLocaleDateString('fr', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ""}</p>
                    <details>
                        <summary className="btn" >Choisir la date</summary>
                        <div className="flex justify-center" >
                            <Controller
                                control={control}
                                name='appointmentDate'
                                render={({ field }) => (
                                    <DayPicker
                                        locale={fr}
                                        animate
                                        mode="single"
                                        onSelect={(date) => field.onChange(date)}
                                        selected={field.value}
                                        disabled={{ dayOfWeek: [0, 6] }}
                                    />
                                )}
                            />
                        </div>
                    </details>


                    <p className="text-error my-1">{errors.appointmentDate?.message}</p>
                </div>

                {/* HEURE_DU_RDV */}
                <div>
                    <label className="fieldset-label">Confirmation du mot de passe</label>
                    <input type="password" className="input w-full rounded-full"  {...register("passwordConfirm")} />
                    <p className="text-error my-1">{errors.passwordConfirm?.message}</p>
                </div>

                {/* TYPE_DE_DEPOT */}
                <div className="flex flex-col gap-2">
                    <label className="fieldset-label ">Dépôt du véhicule</label>
                    <p className="text-amber-500 text-start">
                        Merci de vos munir de votre permis et votre carte verte
                    </p>
                    <p className="text-start">
                        Ouverture: du lundi au vendredi de 8:00-12:00 & 13:30-18:30
                    </p>
                    <div className="flex gap-2 items-center">
                        <input type="radio" className="radio" value={"false"} {...register("contactless")} />
                        <label className="fieldset-label text-info">Sur nos horaires d'ouverture</label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <input type="radio" value={"true"} className="radio" {...register("contactless")} />
                        <label className="fieldset-label text-info">Dépôt sans contact</label>
                    </div>
                    <p className="text-error my-1">{errors.contactless?.message}</p>
                </div>

                <button className="btn btn-info rounded-full">Prendre mon rdv</button>
            </fieldset>
        </form>
    )
}
