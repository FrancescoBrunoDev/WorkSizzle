"use client";

import dynamic from "next/dynamic";

const MainView = dynamic(() => import("@/components/ui/calendar/mainView"), {
  ssr: false,
});

export default function ClientCalendar({ year }: { year: number }) {
  return <MainView year={year} />;
}
