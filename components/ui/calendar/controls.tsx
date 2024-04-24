import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function DateSelector({ year }: { year: number }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border-secondary bg-secondary p-1">
      <Link href={`/${Number(year) - 1}`}>
        <button className="rounded-lg bg-background p-1">
          <ChevronLeft strokeWidth={2.25} />
        </button>
      </Link>
      <h1 className="text-xl font-black">{year}</h1>
      <Link href={`/${Number(year) + 1}`}>
        <button className="rounded-lg bg-background p-1">
          <ChevronRight strokeWidth={2.25} />
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
    <>
      <div className="fixed bottom-2 z-50 mx-2 flex flex-wrap items-center justify-center gap-8 rounded-lg bg-white/60 px-4 py-2 backdrop-blur-lg md:sticky md:top-20">
        <DateSelector year={year} />
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isEven}
              onCheckedChange={() => setIsEven(!isEven)}
            />
            <Label htmlFor="airplane-mode">
              Make side calendar the opposite
            </Label>
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
    </>
  );
}
