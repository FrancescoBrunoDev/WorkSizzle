import dynamic from "next/dynamic";

const MainView = dynamic(() => import("@/components/ui/calendar/mainView"), {
  ssr: false,
});

export default async function Home({ params }: { params: { year: number } }) {
  const year = params.year;
  if (!year) {
    throw new Error('Year not found');
  } else if (isNaN(year)) {
    throw new Error('Year must be a number');
  }
  return <MainView year={year} />;
}
