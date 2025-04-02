import { getUser } from "@/utils/auth";
import { getUserRdvs } from "@/utils/rdv";
import { redirect } from "next/navigation";
import type { WebdevUser } from "@/types/types";
export default async function page() {

  const { authenticated, user } = await getUser();

  if (!user) {
    redirect('/');
  }

  const userRdvs = await getUserRdvs((user as WebdevUser).IDUtilisateur);

  if (!userRdvs) {
    throw new Error("No user rdvs");
  }



  return (
    <section className="flex flex-col items-center gap-4 p-12">
      <h1 className="mb-2 uppercase font-terminaBold text-customblue">
        Vos Rendez-vous
      </h1>
      {userRdvs == null && <h2 className="font-semibold">Pas de RDV en attente</h2>}



      {userRdvs &&
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {userRdvs.map((rdv) => (
            <div
              className="grid grid-cols-2 gap-4 p-12 rounded-md shadow m-8 bg-white border hover:-translate-0.5 transition"
            >
              <h3 className="font-bold text-customblue">Date de dépot:</h3>

              <p>
                {new Date(rdv.DateRécept).toLocaleDateString(
                  "fr-FR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </p>


              <h3 className="font-bold text-customblue">Date de restitution:</h3>
              <p>
                {new Date(rdv.DateRestit).toLocaleDateString(
                  "fr-FR",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </p>

              <h3 className="font-bold text-customblue"
              >Véhicule:
              </h3>
              <p>
                {rdv.Marque} - {rdv.Modèle}
              </p>

             <div className="col-span-2">
                <h3 className="font-bold text-customblue pb-2" >Travaux:</h3>
                <p>{rdv.Travaux.replace("â‚¬", "€")}</p>
             </div>
            </div>
          ))}


        </div>
      }

    </section>
  )
}
