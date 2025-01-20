import ClientCalendar from "@/components/ui/calendar/clientCalendar";

export default async function Home() {
  const year = new Date().getFullYear();
  return <ClientCalendar year={year} />;
}
