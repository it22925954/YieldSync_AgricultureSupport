import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function DistributorProfile({ route }) {
  const { distributorId } = route.params;
  const [distributor, setDistributor] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDistributor = async () => {
      try {
        const response = await fetch(`http://192.168.8.158:5000/api/distributors/${distributorId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch distributor');
        }
        const data = await response.json();
        setDistributor(data);
      } catch (error) {
        console.error('Error fetching distributor:', error);
        Alert.alert('Error', 'Failed to load distributor details.');
      }
    };

    fetchDistributor();
  }, [distributorId]);

  // Geocoding function using OpenCage API
  const fetchCoordinates = async (locationName) => {
    try {
      const apiKey = 'f16a841216624e8a8a1d1d8f8f70022d'; // 🔑 Replace with your actual OpenCage API key
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationName)}&key=${apiKey}`
      );

      if (response.data && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('Location not found');
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      return null;
    }
  };

  const handleViewLocation = async () => {
    const coords = await fetchCoordinates(distributor.location);
    if (coords) {
      navigation.navigate('LocationMap', {
        latitude: coords.latitude,
        longitude: coords.longitude,
        name: distributor.name,
      });
    } else {
      Alert.alert('Error', 'Failed to find location on map.');
    }
  };

  if (!distributor) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading distributor details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{distributor.name}</Text>

        <View style={styles.infoRow}>
          <Icon name="location-on" size={24} color="#4CAF50" />
          <Text style={styles.infoText}>Location: {distributor.location}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="phone" size={24} color="#4CAF50" />
          <Text style={styles.infoText}>Contact: {distributor.contact}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="email" size={24} color="#4CAF50" />
          <Text style={styles.infoText}>Email: {distributor.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="business" size={24} color="#4CAF50" />
          <Text style={styles.infoText}>Type: {distributor.type}</Text>
        </View>

        <View style={styles.infoRow}>
          <Icon name="store" size={24} color="#4CAF50" />
          <Text style={styles.infoText}>Available Stock: {distributor.stock}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleViewLocation}>
          <Text style={styles.buttonText}>View Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F8E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  infoText: {
    fontSize: 18,
    color: '#2e7d32',
    marginLeft: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
