import ClientCalendar from "@/components/ui/calendar/clientCalendar";

export default async function Home(props: {
  params: Promise<{ year: number }>;
}) {
  const params = await props.params;
  const year = params.year;
  if (!year) {
    throw new Error("Year not found");
  } else if (isNaN(year)) {
    throw new Error("Year must be a number");
  }
  return <ClientCalendar year={year} />;
}
