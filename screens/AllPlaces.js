import React, { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";
import { fetchFPlaces } from "../util/http";

const AllPlaces = ({ route }) => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      // const places = await fetchPlaces();
      const places = await fetchFPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      // setLoadedPlaces((currentPlaces) => [
      //   ...currentPlaces,
      //   route.params.place,
      // ]);
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
