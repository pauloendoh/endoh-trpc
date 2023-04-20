import HomePage from "@/components/home/HomePage/HomePage";
import LandingPage from "@/components/home/LandingPage/LandingPage";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const IndexPageRoute: NextPage = () => {
  const { data, status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (data?.user) return <HomePage />;

  return <LandingPage />;
};

export default IndexPageRoute;
