import dynamic from "next/dynamic";

const MainView = dynamic(() => import("@/components/ui/calendar/mainView"), {
  ssr: false,
});

export default async function Home() {
  const year = new Date().getFullYear();
  return <MainView year={year} />;
}
