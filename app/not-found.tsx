import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex w-44 flex-wrap justify-center gap-4 ">
                <h2 className="text-center text-xl text-primary">
                    404 - Page Not Found
                </h2>
                <Link href="/">
                    <Button>Back</Button>
                </Link>
            </div>
        </div>
    );
}
