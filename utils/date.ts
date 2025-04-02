import type { RendezVous, WebdevRendezVous } from "../types/types";
import { format } from 'date-fns'
import { fr } from 'date-fns/locale/fr';
export function generateTimeSlots(startHour: number, endHour: number, intervalMinutes: number) {
    const slots: string[] = [];

    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
            if (hour === endHour && minutes > 0) break;
            slots.push(`${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`);

        }
    }

    return slots;
}


export function formatDate(inputDate: string) {
    try {
        const date = new Date(inputDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }
    catch (error) {
        console.log(error)
        return inputDate
    }

};


function getEasterMonday(year: number) {
    // Calcul de la date de Pâques (algorithme de Gauss modifié)
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    // Date de Pâques
    const easter = new Date(year, month - 1, day);
    const easterMonday = new Date(year, month - 1, day + 2)

    // Ajout de 39 jours pour obtenir l'Ascension
    const ascension = new Date(easter);
    ascension.setDate(easter.getDate() + 40);

    return easterMonday;
}


function getAscensionThursday(year: number) {
    const easterMonday = getEasterMonday(year);
    return new Date(year, easterMonday.getMonth(), easterMonday.getDate() + 37);
}

function getPentecostMonday(year: number) {
    const easterMonday = getEasterMonday(year);
    return new Date(year, easterMonday.getMonth(), easterMonday.getDate() + 48);
}


//check for available days for RDV or not
export function getHolidays(year: number) {
    const easterMonday = getEasterMonday(year)
    const ascensionThursday = getAscensionThursday(year)
    const pentecostMonday = getPentecostMonday(year)

    const otherHolidays = [
        { day: 1, month: 1 }, //"Jour de l'an" 
        { day: 1, month: 5 }, //"Fête du travail"
        { day: 8, month: 5 }, //"Armistice 1945" 
        { day: 14, month: 7 }, // "Fête nationale"
        { day: 15, month: 8 }, //Assomption
        { day: 1, month: 11 },//Toussaint
        { day: 11, month: 11 }, // Armistice 1918
        { day: 25, month: 12 }, //Noël
    ].map(({ day, month }) => new Date(Date.UTC(year, month - 1, day)))


    return [easterMonday, ascensionThursday, pentecostMonday, ...otherHolidays];
}

export function getCalendarEndBound() {
    const date = new Date();
    date.setDate(date.getDate() + 8)
    return date
}

export const convertUtfToLocale = (date: Date, time: string) => {
    // Convert UTC to local date (France)
    const utcDate = new Date(date);

    // Set the time from form input
    const [hours, minutes] = time.split(":").map(Number);
    utcDate.setHours(hours, minutes); // This modifies in local time

    // Format properly for France (Local Time)
    const formattedDate = format(utcDate, "yyyy-MM-dd'T'HH:mm:ss.SSS", { locale: fr });

    return formattedDate
}