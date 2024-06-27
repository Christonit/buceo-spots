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

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 12,
    });

    locations.forEach((location) => {
      const contentString = `
        <div class="custom-marker">
          <img src="${location.image}" alt="${location.title}" />
          <h3>${location.title}</h3>
          <p>${location.description}</p>
        </div>
      `;

      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map,
        title: location.title,
      });

      marker.addListener("mouseover", () => {
        infowindow.open(map, marker);
      });
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
