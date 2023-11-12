import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';







const MapContainer = ({ center, zoom }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDLT8Jcv8ei7xL0DE93MVw_1l1VCshblXE">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;


