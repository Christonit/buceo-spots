"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import db from "./firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { TypographyH1 } from "../components/ui/typography";
import { AddPayment } from "../components/modals/add-contribution";
import { ContributionI, Location } from "../lib/types";
import ContributionsTable from "../components/ContributionsTable";
import { GlobalContext } from "@/context";
import Divider from "@/components/layouts/divider";
import { parseDate } from "@/lib/utils";
import MapComponent from "@/components/MapComponent";

export default function Home() {
  const [contributions, setContributions] = useState<ContributionI[]>([]);
  const { user } = useContext(GlobalContext) || {};
  const [total, setTotal] = useState(0);
  const [doneLoading, setDoneLoading] = useState(false);
  // useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/signin");
  //   },
  // });

  const fetchContributions = async (userId: string) => {
    const q = query(
      collection(db, "contributions"),
      where("user", "==", userId)
    );

    setDoneLoading(true);
    const res = await getDocs(q);
    const data = res.docs.map((doc) => doc.data());

    setContributions(data as ContributionI[]);
  };

  const locations: Location[] = [
    {
      lng: -68.40431,
      lat: 18.58182,
      title: "Punta Cana",
      description: "The city that never sleeps.",
      image: "https://via.placeholder.com/150",
    },
    {
      lng: -68.9833,
      lat: 18.4,
      title: "La Caleta",
      description: "The city that never sleeps.",
      image: "https://via.placeholder.com/150",
    },
    {
      lng: -69.6,
      lat: 18.45,
      title: "Boca Chica",
      description: "The entertainment capital of the world.",
      image: "https://via.placeholder.com/150",
    },
  ];
  useEffect(() => {
    if (!user) return;
    fetchContributions(user.uid);
  }, [user]);

  useEffect(() => {
    if (!contributions) return;

    let total = 0;
    contributions.forEach((contribution) => {
      total += contribution.amount;
    });

    setTotal(total);
  }, [contributions]);

  useEffect(() => {
    document.title = "Contributions";
  }, []);
  return (
    <>
      <div className="flex flex-col gap-[4px] py-[16px]">
        <TypographyH1>Contributions</TypographyH1>
      </div>

      <Divider />

      <MapComponent locations={locations} />
    </>
  );
}

Home.requireAuth = true;
