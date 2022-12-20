import MapView, { Marker } from "react-native-maps";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";

const MapPreviews = ({ route }) => {
  // console.log(route.params.latIn, route.params.lngIn);

  const region = {
    latitude: route.params.latIn,
    longitude: route.params.lngIn,
    latitudeDelta: 0.005,
    longitudeDelta: 0.002,
  };

  return (
    <MapView style={styles.map} initialRegion={region}>
      <Marker
        title="Picked Location"
        coordinate={{
          latitude: route.params.latIn,
          longitude: route.params.lngIn,
        }}
      />
    </MapView>
  );
};

export default MapPreviews;
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
