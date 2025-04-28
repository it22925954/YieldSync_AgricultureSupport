import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function LocationMap({ route }) {
  const { location } = route.params;
  const [userLocation, setUserLocation] = useState(null);
  const [distributorCoords, setDistributorCoords] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setUserLocation(loc);
    };

    getUserLocation();

    if (location) {
      const coords = location.split(',').map(coord => parseFloat(coord));
      setDistributorCoords({
        latitude: isNaN(coords[0]) ? 0 : coords[0],
        longitude: isNaN(coords[1]) ? 0 : coords[1],
      });
    }
  }, [location]);

  if (!userLocation || !distributorCoords) {
    return (
      <View style={styles.container}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        }}
        title="Your Location"
        description="This is your current location."
      />
      <Marker
        coordinate={distributorCoords}
        title="Distributor Location"
        description="This is the distributor's location."
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  map: { flex: 1 },
});
