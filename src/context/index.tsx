"use client";
import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useSession } from "next-auth/react";
import { Location } from "@/lib/types";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "@/app/firestore";
interface GlobalContextType {
  message: string | null;
  messageType: string;
  updateMessage: (newMessage: string, newMessageType: string) => void;
  clearMessage: () => void;
  user: { uid: string; email: string };
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[] | undefined>>;
}

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<string>("");
  const session = useSession();
  const [user, setUser] = useState<{ uid: string; email: string }>({
    uid: "",
    email: "",
  });

  const [locations, setLocations] = useState<Location[]>([]);

  const fetchDivingSpots = async () => {
    const q = query(collection(db, "diving-spots"));

    const res = await getDocs(q);
    const results = res.docs.map((doc) => doc.data());

    console.log(1, results);

    const arr = results.map((location) => ({
      ...location,
      lat: Number(location.coordinates[0]),
      lng: Number(location.coordinates[1]),
    }));

    console.log(2, arr);
    setLocations(
      results.map((location) => ({
        ...location,
        image: location.images[0],
        title: location.name,
        lat: Number(location.coordinates[0]),
        lng: Number(location.coordinates[1]),
      })) as Location[]
    );
  };

  useEffect(() => {
    fetchDivingSpots();
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (message) {
      timeoutId = setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  const updateMessage = (newMessage: string, newMessageType: string) => {
    setMessage(newMessage);
    setMessageType(newMessageType);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  useEffect(() => {
    if (!session || session.status === "unauthenticated") return;
    if (session.data) {
      setUser(session.data.user as { uid: string; email: string });
    }
  }, [session]);

  const payload = {
    message,
    messageType,
    updateMessage,
    clearMessage,
    user,
    locations,
    setLocations: setLocations as React.Dispatch<
      React.SetStateAction<Location[] | undefined>
    >,
  };
  return (
    <GlobalContext.Provider value={payload}>{children}</GlobalContext.Provider>
  );
};
