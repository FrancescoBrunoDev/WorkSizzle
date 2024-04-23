import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function DateSelector({ year }: { year: number }) {
  return (
    <div className="flex items-center gap-2 bg-secondary border-secondary p-1 rounded-lg">
      <Link href={`/${Number(year) - 1}`}>
        <button className="p-1 bg-background rounded-lg">
          <ChevronLeft strokeWidth={2.25} />
        </button>
      </Link>
      <h1 className="text-xl font-black">{year}</h1>
      <Link href={`/${Number(year) + 1}`}>
        <button className="p-1 bg-background rounded-lg">
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
}: {
  isRounded: boolean;
  setIsRounded: (value: boolean) => void;
  percentage: number;
  setPercentage: (value: number) => void;
  isEven: boolean;
  setIsEven: (value: boolean) => void;
  year: number;
}) {
  return (
    <>
      <div className="flex items-center gap-8 flex-wrap justify-center fixed bottom-2 md:sticky md:top-20 z-50 py-2 px-4 rounded-lg backdrop-blur-lg bg-white/60 mx-2">
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
        </div>
        <div className="flex items-center space-x-2 w-60">
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
