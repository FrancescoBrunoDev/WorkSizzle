"use client";

import dynamic from "next/dynamic";

const MainView = dynamic(() => import("@/components/ui/calendar/mainView"), {
  ssr: false,
});

export default function ClientCalendar({
  year,
  countryFromParams,
}: {
  year: number;
  countryFromParams?: countryState;
}) {
  return <MainView year={year} countryFromParams={countryFromParams} />;
}
