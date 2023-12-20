import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function Controls({
  isRounded,
  setIsRounded,
  percentage,
  setPercentage,
}: {
  isRounded: boolean;
  setIsRounded: (value: boolean) => void;
  percentage: number;
  setPercentage: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-8 flex-wrap justify-center">
      <div className="flex items-center space-x-2">
        <Switch
          checked={isRounded}
          onCheckedChange={() => setIsRounded(!isRounded)}
        />
        <Label htmlFor="airplane-mode">Rounded days</Label>
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
  );
}
