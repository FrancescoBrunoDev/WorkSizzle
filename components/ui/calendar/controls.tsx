import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
}) {
  return (
    <div className="fixed bottom-0 z-50 flex w-full flex-wrap items-center justify-center gap-4 rounded-t-lg bg-secondary/60 px-4 pb-6 pt-4 backdrop-blur-md md:sticky md:top-20 md:w-fit md:gap-8 md:rounded-lg md:py-2">
      <DateSelector year={year} />
      <div className="align-start flex flex-col items-start gap-3 md:flex-row ">
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
      <div className="flex w-60 items-center space-x-2">
        <Slider
          defaultValue={[percentage]}
          max={100}
          step={1}
          onValueChange={(value) => setPercentage(value[0])}
        />
        <Label htmlFor="airplane-mode">{percentage}% in office work</Label>
      </div>
    </div>
  );
}
