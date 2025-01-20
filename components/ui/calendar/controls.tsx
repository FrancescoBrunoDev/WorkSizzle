import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import countries_ISO from "@/app/countries_ISO.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SwitchOption from "@/components/ui/switchOption";
import { Share2, Check } from "lucide-react";

function handleCountryChange(
  value: string,
  setCountry: (value: any) => void,
  kind: "alpha2" | "subCountry",
) {
  setCountry((prevState: countryState) => ({
    ...prevState,
    [kind]: value.toLocaleUpperCase(),
    name: countries_ISO.find(
      (country: country) => country.alpha2?.toLocaleUpperCase() === value,
    )?.name,
  }));
}

function DateSelector({ year }: { year: number }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-background p-1 transition-transform hover:scale-102">
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

function CountrySelector({
  country,
  setCountry,
  countries,
}: {
  country: string;
  setCountry: (value: string) => void;
  countries: any;
}) {
  return (
    <div className="w-fit">
      <Select value={country} onValueChange={setCountry}>
        <SelectTrigger className="h-11 gap-2 border-none bg-background text-3xl font-black text-primary transition-transform hover:scale-102">
          <SelectValue>{country}</SelectValue>
        </SelectTrigger>
        <SelectContent className="w-44 bg-background" align="center">
          {countries.map((country: country) => (
            <SelectItem
              key={country.id}
              value={country.alpha2 ? country.alpha2.toUpperCase() : ""}
            >
              <SelectValue>
                {country?.name} (
                {country.alpha2 ? country.alpha2.toUpperCase() : "N/A"})
              </SelectValue>
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
  areControlsCollapsed,
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
  areControlsCollapsed: boolean;
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
    <div className="fixed bottom-0 z-50 flex w-full flex-col items-center justify-center gap-4 rounded-t-lg bg-secondary/60 px-4 pb-6 pt-4 backdrop-blur-md md:sticky md:top-20 md:w-fit md:gap-6 md:rounded-lg md:py-4">
      <div
        onClick={() => setAreControlsCollapsed(!areControlsCollapsed)}
        className={`mb-2 h-full rounded-lg bg-primary p-1 transition-transform hover:cursor-pointer md:hidden ${areControlsCollapsed ? "hover:translate-y-1" : "hover:-translate-y-1"}`}
      >
        {areControlsCollapsed ? (
          <ChevronUp size={35} color="rgb(var(--background))" />
        ) : (
          <ChevronDown size={35} color="rgb(var(--background))" />
        )}
      </div>
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-wrap items-center justify-center gap-3 md:flex-row">
          <DateSelector year={year} />
          <CountrySelector
            countries={countries_ISO}
            country={country.alpha2}
            setCountry={(value) =>
              handleCountryChange(value, setCountry, "alpha2")
            }
          />
          {country.subCountries && country.subCountries.length > 0 && (
            <CountrySelector
              countries={country.subCountries}
              country={country.subCountry}
              setCountry={(value) =>
                handleCountryChange(value, setCountry, "subCountry")
              }
            />
          )}

          <button
            className={`relative ml-3 flex h-11 w-11 items-center justify-center rounded-lg transition-all hover:scale-102 hover:cursor-pointer ${isShareValid ? "bg-primary" : "bg-background"}`}
          >
            <Check
              className={`${isShareValid ? "stroke-background opacity-100" : "rotate-180 opacity-0"} absolute transition-all duration-300 hover:rotate-12`}
              size={30}
            />
            <Share2
              className={`${isShareValid ? "rotate-180 opacity-0" : "opacity-100"} absolute transition-all duration-300 hover:rotate-12`}
              color="rgb(var(--primary))"
              size={25}
              onClick={() => {
                setIsShareValid(true);
                copyToClipboard(
                  `${window.location.origin}/${year}/${country.alpha2}${country.subCountry !== "all" ? "&" + country.subCountry : ""}`,
                );
              }}
            />
          </button>
        </div>
      </div>
      <div
        className={`${areControlsCollapsed ? "h-0 overflow-hidden md:h-fit" : ""} flex flex-wrap items-center justify-center gap-3`}
      >
        <div className="align-start flex w-full flex-row flex-wrap items-start gap-3 md:w-fit">
          <SwitchOption
            checked={isEven}
            setChecked={setIsEven}
            label="Make side calendar the opposite"
          />
          <SwitchOption
            checked={isRounded}
            setChecked={setIsRounded}
            label="Rounded days"
          />
          <SwitchOption
            checked={areCalendarsCollapsed}
            setChecked={setAreCalendarsCollapsed}
            label="Show calendars"
          />
        </div>
        <div className="flex w-full min-w-80 items-center space-x-2 rounded-lg p-2 transition-all hover:scale-102 hover:bg-background md:w-fit">
          <Slider
            className="w-full"
            value={[percentage]}
            max={100}
            step={1}
            onValueChange={(value) => setPercentage(value[0])}
          />
          <Label className="flex gap-1" htmlFor="airplane-mode">
            <div className="flex items-center bg-transparent text-4xl font-black">
              <input
                className="w-[4.5rem] bg-transparent text-end [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                value={percentage}
                onChange={(e) => {
                  let value = e.target.value;
                  // Remove leading zeros followed by a non-zero digit
                  value = value.replace(/^0+(?=[1-9])/, "");
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
              />
              %
            </div>{" "}
            <div className="w-10">in office work</div>
          </Label>
        </div>
      </div>
    </div>
  );
}
