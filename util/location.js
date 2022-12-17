import React, { useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `Latitude:${lat},Longitude:${lng}`;
  return imagePreviewUrl;
}

const MapPreview = ({ lat, lng }) => {
  const region = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.005,
    longitudeDelta: 0.002,
  };

  return (
    <MapView style={styles.map} initialRegion={region}>
      <Marker
        title="Picked Location"
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
      />
    </MapView>
  );
};

export default MapPreview;
const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
