import { useIsFocused } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { deletePlaceDetails, fetchPlaceDetails } from "../util/database";
import { deleteFPlace, fetchFPlacesById } from "../util/http";

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchedPlace] = useState();
  const isFocused = useIsFocused();
  const selectedPlaceId = route.params.placeId;
  // console.log(fetchedPlace);
  const showOnMapHandler = useCallback(() => {
    if (fetchedPlace && isFocused) {
      // console.log(fetchedPlace);
      navigation.navigate("MapPreviews", {
        latIn: fetchedPlace.location.lat,
        lngIn: fetchedPlace.location.lng,
      });
    }
  }, [navigation, fetchedPlace, isFocused]);

  const deleteRecordHandler = useCallback(() => {
    if (fetchedPlace) {
      //   console.log(fetchedPlace);
      // deletePlaceDetails(fetchedPlace.id);
      deleteFPlace(selectedPlaceId);
      navigation.navigate("AllPlaces");
    }
  }, [navigation, fetchedPlace]);

  useEffect(() => {
    // use selectedPalaceId for fetching data for a single place
    async function loadPlaceData() {
      // const place = await fetchPlaceDetails(selectedPlaceId);
      const place = await fetchFPlacesById(selectedPlaceId);
      // console.log(place);
      setFetchedPlace(place);

      navigation.setOptions({
        title: place.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
            View On Map
          </OutlinedButton>
          <OutlinedButton icon="remove-circle" onPress={deleteRecordHandler}>
            Delete Record
          </OutlinedButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    margin: 24,
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  locationContainer: {
    marginTop: 96,
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
