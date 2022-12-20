import React from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";
import { storeFPlace } from "../util/http";

const AddPlace = ({ navigation }) => {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    const id = await storeFPlace(place);
    navigation.navigate("AllPlaces");
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
