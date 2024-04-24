import dynamic from "next/dynamic";

const MainView = dynamic(() => import("@/components/ui/calendar/mainView"), {
  ssr: false,
});

export default async function Home({ params }: { params: { year: number } }) {
  const year = params.year;
  return <MainView year={year} />;
}
