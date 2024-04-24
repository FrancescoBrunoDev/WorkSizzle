import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import countries_ISO from "@/app/countries_ISO.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function handleCountryChange(value: string, setCountry: (value: string) => void, subCountries: any, setSubCountry: (value: string) => void) {
  setCountry(value)
  if (subCountries.length > 0) {
    setSubCountry(subCountries[0].alpha2)
  }
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
  subCountries,
  subCountry,
  setSubCountry,

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
  country: string;
  setCountry: (value: string) => void;
  subCountries: country[];
  subCountry: string;
  setSubCountry: (value: string) => void;
}) {
  return (
    <div className="fixed bottom-0 z-50 flex w-full flex-col items-center justify-center gap-4 rounded-t-lg bg-secondary/60 px-4 pb-6 pt-4 backdrop-blur-md md:sticky md:top-20 md:w-fit md:gap-8 md:rounded-lg md:py-4">
      <div className="flex items-center gap-3 md:flex-row flex-wrap justify-center">
        <DateSelector year={year} />
        <CountrySelector countries={countries_ISO} country={country} setCountry={(value) => handleCountryChange(value, setCountry, subCountries, setSubCountry)} />
        {subCountries.length > 0 && <CountrySelector countries={subCountries} country={subCountry} setCountry={setSubCountry} />}
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="align-start flex flex-col items-start gap-3 md:flex-row md:w-fit w-full">
          <div className="flex items-center space-x-2">
            <Switch checked={isEven} onCheckedChange={() => setIsEven(!isEven)} />
            <Label htmlFor="airplane-mode">Make side calendar the opposite</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isRounded}
              onCheckedChange={() => setIsRounded(!isRounded)}
            />
            <Label htmlFor="airplane-mode">Rounded days</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={areCalendarsCollapsed}
              onCheckedChange={() =>
                setAreCalendarsCollapsed(!areCalendarsCollapsed)
              }
            />
            <Label htmlFor="airplane-mode">Hide calendars</Label>
          </div>
        </div>
        <div className="flex min-w-60 items-center space-x-2 w-full md:w-fit">
          <Slider
            defaultValue={[percentage]}
            max={100}
            step={1}
            onValueChange={(value) => setPercentage(value[0])}
          />
          <Label htmlFor="airplane-mode">{percentage}% in office work</Label>
        </div>
      </div>
    </div >
  );
}
