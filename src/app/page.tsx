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
      lng: -74.006,
      lat: 40.7128,
      title: "New York",
      description: "The city that never sleeps.",
      image: "https://via.placeholder.com/150",
    },
    {
      lng: -118.2437,
      lat: 34.0522,
      title: "Los Angeles",
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

        <div className="flex gap-[12px] text-slate-900 text-base">
          <span>
            Current balance:
            {(total / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
            &nbsp;
            {contributions.length > 0 && (
              <>
                (last updated{" "}
                {parseDate(
                  contributions[0].submission_date.toLocaleString(),
                  "MM/dd/yyyy"
                )}
                )
              </>
            )}
          </span>
        </div>
      </div>

      <Divider />

      <div className="py-[16px]">
        <AddPayment />
      </div>

      <Divider />

      <MapComponent locations={locations} />
    </>
  );
}

Home.requireAuth = true;