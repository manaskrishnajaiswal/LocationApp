import React, { useContext, useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";
import { fetchFPlaces } from "../util/http";
import { PlacesContext } from "../store/places-context";

const AllPlaces = ({ route }) => {
  const placesCtx = useContext(PlacesContext);
  // const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      // const places = await fetchPlaces();
      const places = await fetchFPlaces();
      // setLoadedPlaces(places);
      // console.log(places);
      placesCtx.setPlaces(places);
    }
    if (isFocused) {
      // setLoadedPlaces((currentPlaces) => [
      //   ...currentPlaces,
      //   route.params.place,
      // ]);
      loadPlaces();
    }
  }, [isFocused]);
  // console.log(placesCtx.places);
  return <PlacesList places={placesCtx.places} />;
};

export default AllPlaces;
