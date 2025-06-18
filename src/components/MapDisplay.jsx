import React, { useState, useEffect, useRef } from "react";
const MapDisplay = ({ location }) => {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    if (!location || !window.google) return;
    const [lat, lng] = location.split(",").map(Number);
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat, lng },
      zoom: 12,
    });
    new window.google.maps.Marker({
      position: { lat, lng },
      map,
    });
  }, [location]);

  return (
    <div
      ref={mapRef}
      className="w-full h-64 rounded-lg"
    ></div>
  );
};
export default MapDisplay;