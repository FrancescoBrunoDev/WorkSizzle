import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type SwitchOptionProps = {
    checked: boolean;
    setChecked: (value: boolean) => void;
    label: string;
};

const SwitchOption: React.FC<SwitchOptionProps> = ({ checked, setChecked, label }) => (
    <div onClick={() => setChecked(!checked)} className="flex items-center space-x-2 p-1 pr-2 hover:bg-background rounded-lg transition-colors hover:cursor-pointer">
        <Switch checked={checked} onCheckedChange={() => setChecked(!checked)} />
        <Label className="hover:cursor-pointer" htmlFor="airplane-mode">{label}</Label>
    </div>
);

export default SwitchOption;