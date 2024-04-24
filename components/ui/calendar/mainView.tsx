"use client";

import { useState, useEffect } from "react";
import Controls from "@/components/ui/calendar/controls";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner"


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

async function getHoliday(year: number, country: string) {
  try {
    const res = await fetch(
      `https://date.nager.at/api/v3/publicholidays/${year}/${country}`,
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    toast.success("Good news", {
      description: "The data regarding the holidays has been updated.",
    })
    return data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    // Optionally, return a default value or handle the error as needed
    toast.error("Bad news", {
      description: "I have no data about holidays for this country.",
    })
    return []; // Return an empty array as a fallback
  }
}

function getSubCountries(holidays: holiday[]) {
  if (!holidays || holidays.length === 0) {
    return [];
  }

  const subCountries = holidays.map((holiday) => holiday.counties).flat();
  const uniqueSubCountries = Array.from(new Set(subCountries.filter(Boolean)));

  const structuredSubCountries = uniqueSubCountries.map((code, index) => ({
    id: index + 1,
    alpha2: code
  }));

  // Add the "all" entry at the beginning of the array
  if (structuredSubCountries.length > 0) {
    structuredSubCountries.unshift({ id: 0, alpha2: "all" });
  }

  return structuredSubCountries;
}

export default function MainView({
  year,
}: {
  year: number;
}) {
  // existing state variables
  const [isRounded, setIsRounded] = useState(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("isRounded") || "false")
      : false,
  );
  const [isEven, setIsEven] = useState(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("isEven") || "false")
      : false,
  );
  const [areCalendarsCollapsed, setAreCalendarsCollapsed] = useState(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("areCalendarsCollapsed") || "false")
      : false,
  );
  const [percentage, setPercentage] = useState(() =>
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("percentage") || "20")
      : 20,
  );
  const [country, setCountry] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("country") || '"DE"')
      : "DE",
  );
  const [subCountries, setSubCountries] = useState<country[]>([]);
  const [subCountry, setSubCountry] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("subCountry") || '"all"')
      : "all",
  );
  const [holidays, setHolidays] = useState<holiday[]>([]);

  // useEffect to save state variables to local storage
  useEffect(() => {
    localStorage.setItem("isRounded", JSON.stringify(isRounded));
    localStorage.setItem("isEven", JSON.stringify(isEven));
    localStorage.setItem(
      "areCalendarsCollapsed",
      JSON.stringify(areCalendarsCollapsed),
    );
    localStorage.setItem("percentage", JSON.stringify(percentage));
    localStorage.setItem("country", JSON.stringify(country));
    localStorage.setItem("subCountry", JSON.stringify(subCountry));
  }, [isRounded, isEven, areCalendarsCollapsed, percentage, country, subCountry]);

  useEffect(() => {
    getHoliday(year, country).then((data) => {
      setHolidays(data);
      const arraySubCountries: country[] = getSubCountries(data)
      setSubCountries(arraySubCountries);
    })
  }, [year, country]);

  const holidaysForYear = holidays.map((holiday) => {
    if (holiday.counties === null || holiday.counties.includes(subCountry)) {
      return holiday.date;
    }
  });

  function calculateTwentyPercentDays(
    month: number,
    year: number,
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
    calculateTwentyPercentDays(i, year),
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
    <main className="container flex min-h-screen flex-col items-center gap-4 pb-72 pt-72 md:pb-12 md:pt-80">
      <Controls
        isRounded={isRounded}
        setIsRounded={setIsRounded}
        percentage={percentage}
        setPercentage={setPercentage}
        isEven={isEven}
        setIsEven={setIsEven}
        year={year}
        areCalendarsCollapsed={areCalendarsCollapsed}
        setAreCalendarsCollapsed={setAreCalendarsCollapsed}
        country={country}
        setCountry={setCountry}
        subCountries={subCountries}
        subCountry={subCountry}
        setSubCountry={setSubCountry}
      />
      <div className="grid w-full grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="hidden lg:block" />
        {workingDaysInMonths.map((days, index) => {
          const monthHolidays = holidaysForYear.filter(
            (holiday) => new Date(holiday ?? "").getMonth() === index,
          );
          return (
            <div
              key={index}
              className={`rounded-sm border border-primary/50 p-4 ${index % 2 === 0
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
                <div className="inline-flex flex-wrap items-center gap-4">
                  <h3 className="text-sm font-bold">Holidays:</h3>
                  <ul className="flex flex-wrap gap-4">
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
              {!areCalendarsCollapsed && (
                <div className="flex w-full justify-center">
                  <Calendar
                    mode="multiple"
                    defaultMonth={new Date(year, index)}
                    disabled={isDisabled}
                    ISOWeek={true}
                    disableNavigation={true}
                    hideHead={false}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
