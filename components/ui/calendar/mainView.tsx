"use client";

import { useState, useEffect } from "react";
import Controls from "@/components/ui/calendar/controls";
import { Calendar } from "@/components/ui/calendar";

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

// https://stackoverflow.com/a/23593099
function formatDate(date: Date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export default function MainView({
  holidays,
  year,
}: {
  holidays: holiday[];
  year: number;
}) {
  // existing state variables
  const [isRounded, setIsRounded] = useState(() =>
    JSON.parse(localStorage.getItem("isRounded") || "false")
  );
  const [isEven, setIsEven] = useState(() =>
    JSON.parse(localStorage.getItem("isEven") || "false")
  );
  const [percentage, setPercentage] = useState(() =>
    JSON.parse(localStorage.getItem("percentage") || "20")
  );

  // useEffect to save state variables to local storage
  useEffect(() => {
    localStorage.setItem("isRounded", JSON.stringify(isRounded));
    localStorage.setItem("isEven", JSON.stringify(isEven));
    localStorage.setItem("percentage", JSON.stringify(percentage));
  }, [isRounded, isEven, percentage]);

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
        !holidaysForYear.includes(formatDate(date))
      ) {
        count++;
      }
      date.setDate(date.getDate() + 1);
    }
    const twentyPercent = isRounded
      ? Math.floor(count * (percentage / 100))
      : parseFloat((count * (percentage / 100)).toFixed(1));
    return { total: count, twentyPercent };
  }

  const workingDaysInMonths = Array.from({ length: 12 }, (_, i) =>
    calculateTwentyPercentDays(i, year)
  );

  function isDisabled(date: Date) {
    if (
      date.getDay() === 0 ||
      date.getDay() === 6 ||
      holidaysForYear.includes(date.toISOString().slice(0, 10))
    ) {
      return true;
    }
    return false;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-4 container pt-72 md:pt-80 pb-12">
      <Controls
        isRounded={isRounded}
        setIsRounded={setIsRounded}
        percentage={percentage}
        setPercentage={setPercentage}
        isEven={isEven}
        setIsEven={setIsEven}
        year={year}
      />
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
                index % 2 === 0
                  ? `${isEven ? "border-l-4" : "border-r-4"}`
                  : `${isEven ? "border-r-4" : "border-l-4"}`
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
              <div className="w-full flex justify-center">
                <Calendar
                  mode="multiple"
                  defaultMonth={new Date(year, index)}
                  disabled={isDisabled}
                  ISOWeek={true}
                  disableNavigation={true}
                  hideHead={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
