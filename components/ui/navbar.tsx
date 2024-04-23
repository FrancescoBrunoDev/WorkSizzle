"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 z-50 w-full flex justify-center flex-col backdrop-blur-lg text-center bg-white/60">
      <h1
        className={`font-black ${
          isTop
            ? "md:text-9xl pt-12 text-5xl -rotate-3"
            : "lg:text-5xl text-2xl py-2"
        } transition-all`}
      >
        WorkSizzle
      </h1>
      <div
        className={`font-medium text-base w-full flex justify-center p-12 ${
          isTop ? "block" : "hidden"
        }`}
      >
        <p className="max-w-2xl text-center">
          Calculate the optimal number of on-site workdays based on your remote
          work allowance percentage for each month.
        </p>
      </div>
      <div className="absolute top-4 right-4">
        <Link href="https://github.com/FrancescoBrunoDev/worksizzle">
          <Github />
        </Link>
      </div>
    </div>
  );
}
