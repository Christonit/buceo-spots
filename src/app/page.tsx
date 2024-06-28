"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import db from "./firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { TypographyH1 } from "../components/ui/typography";
import { AddPayment } from "../components/modals/add-diving-spot";
import { ContributionI, Location } from "../lib/types";
import ContributionsTable from "../components/ContributionsTable";
import { GlobalContext } from "@/context";
import Divider from "@/components/layouts/divider";
import { parseDate } from "@/lib/utils";
import MapComponent from "@/components/MapComponent";
import AddDivingSpot from "@/components/modals/add-diving-spot";

export default function Home() {
  const [contributions, setContributions] = useState<ContributionI[]>([]);
  const { locations } = useContext(GlobalContext) || {};
  const [total, setTotal] = useState(0);
  const [doneLoading, setDoneLoading] = useState(false);

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
      <AddDivingSpot />

      <MapComponent locations={locations || []} />
    </>
  );
}

Home.requireAuth = true;
