"use client"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { rdvSchema } from "@/types/zod"
import { DevTool } from '@hookform/devtools';
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { fr } from "react-day-picker/locale";
import { Motif } from "@/types/types"
import { format } from "date-fns"

export default function RdvForm({ motifs }: { motifs: Motif[] }) {



    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(rdvSchema),
        defaultValues: {
            brand: "",
            model: "",
            plateNumber: "",
            task: "",
            appointmentTime: "",
            rdvCategory: "AtelierP",
            chiffrage: false,
            contactless: "false",
            rental: false,
            appointmentDate: new Date(),
        }
    })

    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const hasRental = watch("rental")
    const appointmentDate = watch("appointmentDate")
    const motifCategory = watch("rdvCategory")
    const filteredMotifs = motifs.filter((motif) => motif.NomActivité === motifCategory)

    useEffect(() => {
        async function fetchRdvForDate() {
            const formattedDate = format(appointmentDate, 'yyyy-MM-dd');
            console.log("FORMATTED DATE", formattedDate)
            const response = await fetch("/api/rdv/filter/" + formattedDate);
            const data: string[] = await response.json();
            console.log('DATA', data)
            setAvailableSlots(data);
        }
        fetchRdvForDate();
    }, [appointmentDate])

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* <DevTool control={control} placement="top-left" /> */}

            <fieldset className="fieldset gap-4 p-4">
                <section className="bg-base-200  shadow-lg rounded-xl p-4">
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
                </section>


                <section className="bg-base-200  shadow-lg rounded-xl p-4">
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
                            {filteredMotifs.map((motif) => (
                                <option key={motif.IDMotifRDV} value={motif.IDMotifRDV}>{motif.Motif}</option>
                            ))}
                        </select>
                        <p className="text-error my-1">{errors.task?.message}</p>
                    </div>
                </section>

                <section className="bg-base-200  shadow-lg rounded-xl p-4 flex flex-col gap-4">

                    <div className="flex gap-4">
                        {/* CHIFFRAGE / DEVIS ? */}
                        <div className="">
                            <label className="fieldset-label text-info">
                                <input type="checkbox" className="checkbox" {...register("chiffrage")} />
                                Je désire un chiffrage
                            </label>
                            <p className="text-error ">{errors.chiffrage?.message}</p>
                        </div>

                        {/* LOCATION_? */}
                        <div className="">
                            <label className="fieldset-label text-info">
                                <input type="checkbox" className="checkbox" {...register("rental")} />
                                Je désire une location de véhicule
                            </label>
                            <p className="text-error">{errors.rental?.message}</p>
                        </div>
                    </div>


                    {/* TYPE_DE_LOCATION */}
                    {hasRental &&
                        <div className="grid grid-cols-2 border border-neutral-300 p-4 rounded-lg">
                            <div className="flex flex-col gap-2">
                                <label className="fieldset-label text-info">Type de location</label>
                                <label className="fieldset-label text-info">
                                    <input type="radio" className="radio" value={"eco"} {...register("rentalCategory")} />
                                    Eco (5€/jour + 0.22€/km)
                                </label>

                                <label className="fieldset-label text-info">
                                    <input type="radio" value={"standard"} className="radio" {...register("rentalCategory")} />
                                    Standard (35€/jour + 0.22€/km)
                                </label>
                                <p className="text-error my-1">{errors.rentalCategory?.message}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="fieldset-label text-info">Transmission</label>

                                <label className="fieldset-label text-info">
                                    <input type="radio" className="radio" value={"manual"} {...register("rentalDrive")} />
                                    Manuelle
                                </label>
                                <label className="fieldset-label text-info">
                                    <input type="radio" value={"auto"} className="radio" {...register("rentalDrive")} />
                                    Automatique
                                </label>
                                <p className="text-error my-1">{errors.rentalDrive?.message}</p>
                            </div>
                        </div>
                    }

                </section>

                <section className="bg-base-200  shadow-lg rounded-xl p-4 flex flex-col gap-4">
                    {/* DATE_DU_RDV */}
                    <div>
                        <label className="fieldset-label">Date du RDV : </label>
                        <p className="flex justify-center text-info font-bold text-md">{appointmentDate ? appointmentDate.toLocaleDateString('fr', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Pas de date sélectionnée"}</p>

                        <div className="collapse bg-base-100 border-base-300 border my-2">
                            <input type="checkbox" />
                            <div className="collapse-title btn ">Afficher le calendrier</div>
                            <div className="collapse-content flex justify-center">
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
                        </div>
                        <p className="text-error my-1">{errors.appointmentDate?.message}</p>
                    </div>

                    {/* HEURE_DU_RDV */}
                    <div>
                        <label htmlFor="appointmentTime" className="fieldset-label ">Heure du rendez-vous</label>
                        <select defaultValue="Choisir le motif" className="select w-full rounded-full" {...register("appointmentTime")} >
                            <option disabled={true}>Choisissez un créneau horaire</option>
                            {availableSlots.map((slot, index) => (
                                <option key={index} value={slot}>{slot}</option>
                            ))}
                        </select>
                        <p className="text-error my-1">{errors.appointmentTime?.message}</p>
                    </div>
                </section>

                <section className="bg-base-200  shadow-lg rounded-xl p-4 flex flex-col gap-4">
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

                            <label className="fieldset-label text-info">
                                <input type="radio" className="radio" value="false" {...register("contactless")} />
                                Sur nos horaires d'ouverture
                            </label>
                        </div>
                        <div className="flex gap-2 items-center">

                            <label className="fieldset-label text-info">
                                <input type="radio" value="true" className="radio" {...register("contactless")} />
                                Dépôt sans contact
                            </label>
                        </div>
                        <p className="text-error my-1">{errors.contactless?.message}</p>
                    </div>
                </section>

                <button className="btn btn-info rounded-full">Prendre mon rdv</button>
            </fieldset>
        </form>
    )
}
