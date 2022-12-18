import React, { useEffect, useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  reverseGeocodeAsync,
  useForegroundPermissions,
} from "expo-location";
import OutlinedButton from "../UI/OutlinedButton";
import MapPreview, { getMapPreview } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

const LocationPicker = ({ onPickLocation, onPickAddress }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    onPickLocation(pickedLocation);
    onPickAddress(displayCurrentAddress);
  }, [pickedLocation, onPickLocation, displayCurrentAddress, onPickAddress]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app."
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    if (location) {
      const { latitude, longitude } = location.coords;
      let response = await reverseGeocodeAsync({
        latitude,
        longitude,
      });
      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.district}, ${item.city}, ${item.region} - ${item.postalCode}, ${item.country}`;
        // console.log(address);
        setDisplayCurrentAddress(address);
      }
    }
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet.</Text>;
  //   console.log(pickedLocation);
  if (pickedLocation) {
    locationPreview = (
      //   <Text>{getMapPreview(pickedLocation.lat, pickedLocation.lng)}</Text>
      <MapPreview lat={pickedLocation.lat} lng={pickedLocation.lng} />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>

      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    flex: 1,
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
