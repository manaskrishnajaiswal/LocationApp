import axios from "axios";
import { Place } from "../models/place";
const BACKEND_URL = "https://locationimageapp-default-rtdb.firebaseio.com";
export async function storeFPlace(place) {
  const response = await axios.post(BACKEND_URL + "/places.json", place);
  const id = response.data.name;
  return id;
}

export async function fetchFPlaces() {
  const response = await axios.get(BACKEND_URL + "/places.json");
  const places = [];
  for (const key in response.data) {
    const placeObj = new Place(
      response.data[key].title,
      response.data[key].imageUri,
      response.data[key].address,
      {
        lat: response.data[key].location.lat,
        lng: response.data[key].location.lng,
      },
      key
    );
    places.push(placeObj);
  }
  return places;
}

export async function fetchFPlacesById(id) {
  const response = await axios.get(BACKEND_URL + `/places/${id}.json`);
  // console.log(response.data);
  return response.data;
}

export function deleteFPlace(id) {
  return axios.delete(BACKEND_URL + `/places/${id}.json`);
}
