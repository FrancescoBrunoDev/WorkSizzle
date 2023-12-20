import MainView from "@/components/ui/calendar/mainView";

async function getHoliday(year: number) {
  const res = await fetch(
    `https://date.nager.at/api/v3/publicholidays/${year}/DE`
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
