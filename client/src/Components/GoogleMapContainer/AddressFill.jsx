import React, { useState, useEffect } from "react";

const AddressAutofill = () => {
  const [address, setAddress] = useState({
    location: "",
    locality: "",
    administrative_area_level_1: "",
    country: "",
    postal_code: "",
  });

  useEffect(() => {
    const CONFIGURATION = {
      ctaTitle: "Add",
      mapOptions: {
        center: { lat: 37.4221, lng: -122.0841 },
        fullscreenControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        zoom: 11,
        zoomControl: true,
        maxZoom: 22,
        mapId: "",
      },
      mapsApiKey: process.env.GOOGLEM_KEY,
      capabilities: {
        addressAutocompleteControl: true,
        mapDisplayControl: true,
        ctaControl: true,
      },
    };

    const getFormInputElement = (component) =>
      document.getElementById(component + "-input");
    const map = new window.google.maps.Map(document.getElementById("gmp-map"), {
      zoom: CONFIGURATION.mapOptions.zoom,
      center: CONFIGURATION.mapOptions.center,
      mapTypeControl: false,
      fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
      zoomControl: CONFIGURATION.mapOptions.zoomControl,
      streetViewControl: CONFIGURATION.mapOptions.streetViewControl,
    });
    const marker = new window.google.maps.Marker({
      map: map,
      draggable: false,
    });
    const autocompleteInput = getFormInputElement("location");
    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteInput,
      {
        fields: ["address_components", "geometry", "name"],
        types: ["address"],
      },
    );

    autocomplete.addListener("place_changed", function () {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      handleAutocomplete(place);
      renderAddress(place);
    });

    function handleAutocomplete(place) {
      const addressData = {
        location: place.name,
        locality:
          place.address_components.find((comp) =>
            comp.types.includes("locality"),
          )?.long_name || "",
        administrative_area_level_1:
          place.address_components.find((comp) =>
            comp.types.includes("administrative_area_level_1"),
          )?.short_name || "",
        country:
          place.address_components.find((comp) =>
            comp.types.includes("country"),
          )?.long_name || "",
        postal_code:
          place.address_components.find((comp) =>
            comp.types.includes("postal_code"),
          )?.short_name || "",
      };
      setAddress(addressData);
    }

    function renderAddress(place) {
      map.setCenter(place.geometry.location);
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
    }

    return () => {
      // Clean up code (if needed)
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleManualInput = (e, field) => {
    setAddress({ ...address, [field]: e.target.value });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Address"
        id="location-input"
        value={address.location}
        onChange={(e) => handleManualInput(e, "location")}
      />
      <input
        type="text"
        placeholder="Apt, Suite, etc (optional)"
        value={address.suite}
        onChange={(e) => handleManualInput(e, "suite")}
      />
      <input
        type="text"
        placeholder="City"
        id="locality-input"
        value={address.locality}
        onChange={(e) => handleManualInput(e, "locality")}
      />
      <div className="half-input-container">
        <input
          type="text"
          className="half-input"
          placeholder="State/Province"
          id="administrative_area_level_1-input"
          value={address.administrative_area_level_1}
          onChange={(e) => handleManualInput(e, "administrative_area_level_1")}
        />
        <input
          type="text"
          className="half-input"
          placeholder="Zip/Postal code"
          id="postal_code-input"
          value={address.postal_code}
          onChange={(e) => handleManualInput(e, "postal_code")}
        />
      </div>
      <input
        type="text"
        placeholder="Country"
        id="country-input"
        value={address.country}
        onChange={(e) => handleManualInput(e, "country")}
      />
      <div id="gmp-map" style={{ height: "400px", width: "100%" }}></div>
    </div>
  );
};

export default AddressAutofill;
