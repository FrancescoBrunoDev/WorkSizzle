"use client";

import { useState } from "react";
import Controls from "@/components/ui/calendar/controls";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  type: string;
}

export default function MainView({
  holidays,
  year,
}: {
  holidays: holiday[];
  year: number;
}) {
  const [isRounded, setIsRounded] = useState(false);
  const [percentage, setPercentage] = useState(20);
  const holidaysForYear = holidays.map((holiday) => {
    if (holiday.counties === null || holiday.counties.includes("DE-BY")) {
      return holiday.date;
    }
  });

  function calculateTwentyPercentDays(
    month: number,
    year: number
  ): { total: number; twentyPercent: number } {
    let count = 0;
    let date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      if (
        date.getDay() !== 0 &&
        date.getDay() !== 6 &&
        !holidaysForYear.includes(date.toISOString().slice(0, 10))
      ) {
        count++;
      }
      date.setDate(date.getDate() + 1);
    }
    const twentyPercent = isRounded
      ? Math.ceil(count * (percentage / 100))
      : parseFloat((count * (percentage / 100)).toFixed(1));
    return { total: count, twentyPercent };
  }

  const workingDaysInMonths = Array.from({ length: 12 }, (_, i) =>
    calculateTwentyPercentDays(i, year)
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-4">
      <p className="font-medium">Days designated for office work</p>
      <div className="flex items-center gap-4">
        <Link href={`/${Number(year) - 1}`}>
            <button className="p-2 bg-secondary rounded-lg">
                <ChevronLeft strokeWidth={2.25} />
            </button>
        </Link>
        <h1 className="font-black text-8xl">{year}</h1>
        <Link href={`/${Number(year) + 1}`}>
            <button className="p-2 bg-secondary rounded-lg">
                <ChevronRight strokeWidth={2.25} />
            </button>
        </Link>
      </div>
      <Separator />
      <Controls
        isRounded={isRounded}
        setIsRounded={setIsRounded}
        percentage={percentage}
        setPercentage={setPercentage}
      />
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 w-full">
        <div />
        {workingDaysInMonths.map((days, index) => {
          const monthHolidays = holidaysForYear.filter(
            (holiday) => new Date(holiday ?? "").getMonth() === index
          );
          return (
            <div
              key={index}
              className={`border rounded-sm p-4 ${
                index % 2 === 0 ? "border-l-4" : "border-r-4"
              }`}
            >
              <h2 className="font-bold">
                {new Date(year, index).toLocaleString("en-US", {
                  month: "long",
                })}
              </h2>
              <p>
                {days.twentyPercent} days (out of {days.total} working days)
              </p>
              {monthHolidays.length > 0 && (
                <div className="inline-flex gap-4 flex-wrap items-center">
                  <h3 className="font-bold text-sm">Holidays:</h3>
                  <ul className="flex gap-4 flex-wrap">
                    {monthHolidays.map((holiday, i) => (
                      <li key={i} className="text-xs">
                        {new Date(holiday ?? "").toLocaleString("default", {
                          day: "2-digit",
                        })}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
