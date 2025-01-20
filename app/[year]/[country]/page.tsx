import dynamic from "next/dynamic";
import { getCountryArray } from "@/actions/actions";

const MainView = dynamic(() => import("@/components/ui/calendar/mainView"), {
    ssr: false,
});

export default async function Home(props: { params: Promise<{ year: number, country: string }> }) {
    const params = await props.params;
    const year = params.year;
    const decodedCountry = decodeURIComponent(params.country);
    const subCountry = decodedCountry.split('&')[1] || 'all';
    const country = decodedCountry.split('&')[0];
    console.log(country, subCountry);
    // if params.country is not a string or is longer than 2 characters, throw an error
    if (typeof country !== 'string' || country.length !== 2) {
        throw new Error('Country must be a string of length 2 (alpha-2 code)');
    }
    const countryData = await getCountryArray(country, subCountry);
    if (!countryData) {
        // handle the error, e.g. throw an error or assign a default value
        throw new Error('Country data not found');
    }
    const countryFromParams: countryState = countryData;
    return <MainView year={year} countryFromParams={countryFromParams} />;
}
