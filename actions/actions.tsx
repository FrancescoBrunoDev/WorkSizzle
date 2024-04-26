'use server'

import countries_ISO from '@/app/countries_ISO.json'

export async function getHoliday(year: number, country: countryState) {
    try {
        const res = await fetch(
            `https://date.nager.at/api/v3/publicholidays/${year}/${country.alpha2}`,
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching holidays:", error);
        // Optionally, return a default value or handle the error as needed
        return []; // Return an empty array as a fallback
    }
}

export async function getSubCountries(holidays: holiday[]) {
    if (!holidays || holidays.length === 0) {
        return [];
    }

    const subCountries = holidays.map((holiday) => holiday.counties).flat();
    const uniqueSubCountries = Array.from(new Set(subCountries.filter(Boolean)));

    const structuredSubCountries = uniqueSubCountries.map((code, index) => ({
        id: index + 1,
        alpha2: code
    }));

    // Add the "all" entry at the beginning of the array
    if (structuredSubCountries.length > 0) {
        structuredSubCountries.unshift({ id: 0, alpha2: "all" });
    }

    return structuredSubCountries;
}

export async function getCountryArray(countryISO: string, subCountry: string) {
    const countryFullArray = countries_ISO.find((country) => country.alpha2.toUpperCase() === countryISO);
    if (!countryFullArray) {
        return null;
    }
    const structuredArray = {
        name: countryFullArray.name,
        alpha2: countryFullArray.alpha2.toUpperCase(),
        subCountries: [],
        subCountry: subCountry
    }
    return structuredArray;
}