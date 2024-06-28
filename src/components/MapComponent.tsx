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

  async function initMap() {
    // Request needed libraries.
    const { Map } = (await google.maps.importLibrary(
      "maps"
    )) as google.maps.MapsLibrary;

    const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      "marker"
    )) as google.maps.MarkerLibrary;

    const map = new Map(mapContainerRef.current!, {
      center: { lat: 18.483402, lng: -69.929611 },
      zoom: 9.5,
      mapId: "4504f8b37365c3d0",
      restriction: {
        latLngBounds: {
          north: 20.0,
          south: 17.0,
          west: -73.0,
          east: -67.0,
        },
        strictBounds: false,
      },
      minZoom: 7,
      maxZoom: 14,
    });

    locations.forEach(async (location) => {
      const priceTag = document.createElement("div");
      priceTag.classList.add("map-marker");
      const boilerplate = `<button class='map-marker-header'>
      <img src="${location.image}" alt="${location.title} image" />
      <span class="map-marker-title">${location.title}</span>
      </button>`;
      priceTag.innerHTML = boilerplate;

      const AdvancedMarkerElement =
        new google.maps.marker.AdvancedMarkerElement({
          map,
          content: priceTag,
          position: { lat: location.lat, lng: location.lng },
          title: location.title,
        });

      AdvancedMarkerElement.addListener("click", (e: any) => {
        console.log("clicked", e.target);
      });

      // const marker = new AdvancedMarkerElement({
      //   map,
      //   position: { lat: location.lat, lng: location.lng },
      //   content: priceTag,
      // });

      // marker.addEventListener("click", (e) => {
      //   console.log("clicked", e);
      //   e.target!.classList.add("map-marker-active");
      // });

      // Add any additional logic for each marker here
    });
  }

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 12,
    });

    locations.forEach(async (location) => {
      initMap();
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
