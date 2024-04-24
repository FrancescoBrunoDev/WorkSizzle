"use client"; // Error components must be Client Components

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bomb } from "lucide-react";

export default function Error() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <div className="flex flex-col items-center gap-4 ">
                <Bomb className="h-24 w-24 stroke-primary stroke-[2.5]" />
                <h2 className="text-center font-black text-3xl text-primary h-fit">
                    Year Not Found
                </h2>

                <Link href="/">
                    <Button className="text-background font-black">Back</Button>
                </Link>
            </div>
        </div>
    );
}
