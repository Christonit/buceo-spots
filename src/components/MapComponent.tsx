"use client";

import React, { useEffect, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import "@/app/map-component.css"; // Create this CSS file for custom styles

type Location = {
  lng: number;
  lat: number;
  title: string;
  description: string;
  image: string;
};

const MapComponent = ({ locations }: { locations: Location[] }) => {
  const mapContainerRef = useRef(null);

  async function initMap({ lat, lng }: { lat: number; lng: number }) {
    // Request needed libraries.
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    const map = new Map(mapContainerRef.current!, {
      center: { lat, lng },
      zoom: 14,
      mapId: "4504f8b37365c3d0",
    });
    const priceTag = document.createElement("div");

    priceTag.classList.add("map-marker");

    priceTag.textContent = "$2.5M";

    const marker = new AdvancedMarkerElement({
      map,
      position: { lat, lng },
      content: priceTag,
    });
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 12,
    });

    locations.forEach(async (location) => {
      initMap({ lat: location.lat, lng: location.lng });
    });
  }, [locations]);

  return <div ref={mapContainerRef} className="map-container" />;
};

const WrappedMap = ({ locations }: { locations: Location[] }) => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!}>
      <MapComponent locations={locations} />
    </LoadScript>
  );
};

export default WrappedMap;
