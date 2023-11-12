import React from "react";
import MapContainer from "../GoogleMapContainer/GoogleMap";
import MapAutocomplete from "../GoogleMapContainer/AddressFill";
//< MapContainer />
const SecondTab = () => {
  return (
    <div className="SecondTab">
      <p>Second Tab!! Hurray!! BoardView</p>
      < MapAutocomplete />
      
      {/* Second  tab content will go here */}
    </div>
  );
};
export default SecondTab;