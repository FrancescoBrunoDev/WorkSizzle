import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import countries_ISO from "@/app/countries_ISO.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SwitchOption from "@/components/ui/switchOption";
import { Share2, Check } from "lucide-react";

function handleCountryChange(value: string, setCountry: (value: any) => void, kind: "alpha2" | "subCountry") {
  setCountry((prevState: countryState) => ({
    ...prevState,
    [kind]: value.toLocaleUpperCase(),
    name: countries_ISO.find((country: country) => country.alpha2?.toLocaleUpperCase() === value)?.name,
  }));
}

function DateSelector({ year }: { year: number }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-background p-1 hover:scale-102 transition-transform">
      <Link href={`/${Number(year) - 1}`}>
        <button className="rounded-lg bg-primary p-1 transition-all hover:-rotate-12">
          <ChevronLeft color="rgb(var(--background))" />
        </button>
      </Link>
      <h1 className="text-3xl font-black text-primary">{year}</h1>
      <Link href={`/${Number(year) + 1}`}>
        <button className="rounded-lg bg-primary p-1 transition-all hover:rotate-12">
          <ChevronRight color="rgb(var(--background))" />
        </button>
      </Link>
    </div>
  );
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

function CountrySelector({ country, setCountry, countries }: { country: string; setCountry: (value: string) => void; countries: any }) {
  return (
    <div className="w-fit">
      <Select value={country} onValueChange={setCountry}>
        <SelectTrigger className="bg-background border-none text-primary font-black text-3xl h-11 gap-2 hover:scale-102 transition-transform">
          <SelectValue>{country}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-background w-44" align="center">
          {countries.map((country: country) => (
            <SelectItem key={country.id} value={country.alpha2 ? country.alpha2.toUpperCase() : ''}>
              <SelectValue>{country?.name} ({country.alpha2 ? country.alpha2.toUpperCase() : 'N/A'})</SelectValue>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default function Controls({
  isRounded,
  setIsRounded,
  percentage,
  setPercentage,
  isEven,
  setIsEven,
  year,
  areCalendarsCollapsed,
  setAreCalendarsCollapsed,
  country,
  setCountry,
  setAreControlsCollapsed,
  areControlsCollapsed
}: {
  isRounded: boolean;
  setIsRounded: (value: boolean) => void;
  percentage: number;
  setPercentage: (value: number) => void;
  isEven: boolean;
  setIsEven: (value: boolean) => void;
  year: number;
  areCalendarsCollapsed: boolean;
  setAreCalendarsCollapsed: (value: boolean) => void;
  country: countryState;
  setCountry: (value: countryState) => void;
  setAreControlsCollapsed: (value: boolean) => void;
  areControlsCollapsed: boolean
}) {
  const [isShareValid, setIsShareValid] = useState(false);

  useEffect(() => {
    setIsShareValid(false);
    const timeoutId = setTimeout(() => {
      setIsShareValid(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, [country, year]);

  return (
    <div className="fixed bottom-0 z-50 flex w-full flex-col items-center justify-center gap-4 md:gap-6 rounded-t-lg bg-secondary/60 px-4 pb-6 pt-4 backdrop-blur-md md:sticky md:top-20 md:w-fit md:rounded-lg md:py-4">
      <div onClick={() => setAreControlsCollapsed(!areControlsCollapsed)} className={`bg-primary h-full rounded-lg p-1 transition-transform md:hidden hover:cursor-pointer mb-2 ${areControlsCollapsed ? "hover:translate-y-1" : "hover:-translate-y-1"}`}>
        {areControlsCollapsed ? <ChevronUp size={35} color="rgb(var(--background))" /> : <ChevronDown size={35} color="rgb(var(--background))" />}
      </div>
      <div className="flex w-full justify-center">
        <div className="flex items-center gap-3 md:flex-row flex-wrap justify-center w-full">
          <DateSelector year={year} />
          <CountrySelector countries={countries_ISO} country={country.alpha2} setCountry={(value) => handleCountryChange(value, setCountry, "alpha2")} />
          {country.subCountries && country.subCountries.length > 0 && <CountrySelector countries={country.subCountries} country={country.subCountry} setCountry={(value) => handleCountryChange(value, setCountry, "subCountry")} />}

          <button className={`flex ml-3 items-center relative justify-center h-11 w-11 rounded-lg hover:cursor-pointer hover:scale-102 transition-all ${isShareValid ? "bg-primary" : "bg-background"}`} >
            <Check className={`${isShareValid ? "opacity-100 stroke-background" : "opacity-0 rotate-180"} hover:rotate-12 transition-all absolute duration-300`} size={30} />
            <Share2 className={`${isShareValid ? "opacity-0 rotate-180" : "opacity-100"} hover:rotate-12 transition-all absolute duration-300`} color="rgb(var(--primary))" size={25} onClick={() => { setIsShareValid(true); copyToClipboard(`${window.location.origin}/${year}/${country.alpha2}${country.subCountry !== "all" ? "&" + country.subCountry : ""}`) }} />
          </button>
        </div>
      </div>
      <div className={`${areControlsCollapsed ? "h-0 overflow-hidden md:h-fit" : ""} flex flex-wrap gap-3 justify-center items-center`}>
        <div className="align-start flex flex-wrap items-start gap-3 flex-row md:w-fit w-full">
          <SwitchOption checked={isEven} setChecked={setIsEven} label="Make side calendar the opposite" />
          <SwitchOption checked={isRounded} setChecked={setIsRounded} label="Rounded days" />
          <SwitchOption checked={areCalendarsCollapsed} setChecked={setAreCalendarsCollapsed} label="Show calendars" />
        </div>
        <div className="flex min-w-80 items-center space-x-2 w-full md:w-fit hover:bg-background rounded-lg transition-all p-2 hover:scale-102">
          <Slider
            className="w-full"
            value={[percentage]}
            max={100}
            step={1}
            onValueChange={(value) => setPercentage(value[0])}
          />
          <Label className="flex gap-1" htmlFor="airplane-mode">
            <div className="font-black text-4xl bg-transparent flex items-center">
              <input
                className="bg-transparent w-[4.5rem] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-end"
                type="number"
                value={percentage}
                onChange={(e) => {
                  let value = e.target.value;
                  // Remove leading zeros followed by a non-zero digit
                  value = value.replace(/^0+(?=[1-9])/, '');
                  let numValue = parseInt(value, 10);
                  numValue = Math.max(0, Math.min(numValue, 100));
                  setPercentage(numValue);
                }}
                onBlur={() => {
                  // if the value is not a number, set it to 0
                  if (isNaN(percentage)) {
                    setPercentage(0);
                  }
                }}
                min={1}
                max={100}
              />%</div> <div className="w-10">in office work</div>
          </Label>
        </div>
      </div>
    </div >
  );
}
