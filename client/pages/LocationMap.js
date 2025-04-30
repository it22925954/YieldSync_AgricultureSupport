import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

export default function LocationMap({ route }) {
  const { latitude, longitude, name } = route.params;
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAddress = async () => {
    try {
      const apiKey = 'f16a841216624e8a8a1d1d8f8f70022d'; // 🔑 Replace with your API key
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
      );
      if (response.data && response.data.results.length > 0) {
        setAddress(response.data.results[0].formatted);
      } else {
        setAddress('Address not found');
      }
    } catch (err) {
      console.error('Reverse geocoding failed:', err);
      setAddress('Failed to fetch address');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          title={name}
          description={address || 'Loading address...'}
        />
      </MapView>
      <View style={styles.addressContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#4CAF50" />
        ) : (
          <Text style={styles.addressText}>{address}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  addressContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  addressText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  }
});
