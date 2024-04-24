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
    <div
      className={`fixed top-0 z-50 flex w-full flex-col justify-center bg-background text-center`}
    >
      <h1
        className={`font-black text-primary ${isTop
          ? "-rotate-3 pt-12 text-6xl xs:text-7xl sm:text-8xl md:text-9xl"
          : "py-2 text-4xl lg:text-5xl"
          } transition-all`}
      >
        WorkSizzle
      </h1>
      <div
        className={`flex w-full justify-center p-12 text-base font-medium ${isTop ? "block" : "hidden"
          }`}
      >
        <p className="max-w-2xl text-center">
          Calculate the optimal number of on-site workdays based on your remote
          work allowance percentage for each month.
        </p>
      </div>
      <div className={`absolute right-2 flex h-full items-center`}>
        <Link href="https://github.com/FrancescoBrunoDev/worksizzle">
          <Github color="rgb(var(--primary))" />
        </Link>
      </div>
    </div>
  );
}
