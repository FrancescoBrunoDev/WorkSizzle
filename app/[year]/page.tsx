import dynamic from "next/dynamic";

const MainView = dynamic(() => import("@/components/ui/calendar/mainView"), {
  ssr: false,
});

async function getHoliday(year: number) {
  const res = await fetch(
    `https://date.nager.at/api/v3/publicholidays/${year}/DE`, { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
}

export default async function Home({ params }: { params: { year: number } }) {
  const year = params.year;
  const holidays = await getHoliday(year);
  return <MainView holidays={holidays} year={year} />;
}
