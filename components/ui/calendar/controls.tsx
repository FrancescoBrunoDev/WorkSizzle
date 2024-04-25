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
import SwitchOption from "@/components/ui/SwitchOption";

function handleCountryChange(value: string, setCountry: (value: any) => void, kind: "alpha2" | "subCountry") {
  setCountry((prevState: countryState) => ({
    ...prevState,
    [kind]: value.toLocaleUpperCase(),
    name: countries_ISO.find((country: country) => country.alpha2?.toLocaleUpperCase() === value)?.name,
  }));
}

function DateSelector({ year }: { year: number }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-background p-1">
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

function CountrySelector({ country, setCountry, countries }: { country: string; setCountry: (value: string) => void; countries: any }) {
  return (
    <div className="w-fit">
      <Select value={country} onValueChange={setCountry}>
        <SelectTrigger className="bg-background border-none text-primary font-black text-3xl h-11 gap-2">
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
  return (
    <div className="fixed bottom-0 z-50 flex w-full flex-col items-center justify-center gap-4 rounded-t-lg bg-secondary/60 px-4 pb-6 pt-4 backdrop-blur-md md:sticky md:top-20 md:w-fit md:rounded-lg md:py-4">
      <div onClick={() => setAreControlsCollapsed(!areControlsCollapsed)} className={`bg-primary rounded-lg p-1 transition-transform md:hidden hover:cursor-pointer ${areControlsCollapsed ? "hover:translate-y-1" : "hover:-translate-y-1"}`}>
        {areControlsCollapsed ? <ChevronUp color="rgb(var(--background))" /> : <ChevronDown color="rgb(var(--background))" />}
      </div>
      <div className="flex items-center gap-3 md:flex-row flex-wrap justify-center">
        <DateSelector year={year} />
        <CountrySelector countries={countries_ISO} country={country.alpha2} setCountry={(value) => handleCountryChange(value, setCountry, "alpha2")} />
        {country.subCountries && country.subCountries.length > 0 && <CountrySelector countries={country.subCountries} country={country.subCountry} setCountry={(value) => handleCountryChange(value, setCountry, "subCountry")} />}
      </div>
      <div className={`${areControlsCollapsed ? "h-0 overflow-hidden md:h-fit" : ""} flex flex-wrap gap-8 justify-center items-center`}>
        <div className="align-start flex flex-col items-start gap-3 md:flex-row md:w-fit w-full">
          <SwitchOption checked={isEven} setChecked={setIsEven} label="Make side calendar the opposite" />
          <SwitchOption checked={isRounded} setChecked={setIsRounded} label="Rounded days" />
          <SwitchOption checked={areCalendarsCollapsed} setChecked={setAreCalendarsCollapsed} label="Hide calendars" />
        </div>
        <div className="flex min-w-60 items-center space-x-2 w-full md:w-fit hover:bg-background rounded-lg transition-colors p-2">
          <Slider
            value={[percentage]}
            max={100}
            step={1}
            onValueChange={(value) => setPercentage(value[0])}
          />
          <Label className="flex gap-1" htmlFor="airplane-mode">
            <div className="font-black text-4xl bg-transparent flex items-center">
              <input
                className="bg-transparent w-fit [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-end"
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
