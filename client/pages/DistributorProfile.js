import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

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

  if (!distributor) {
    return (
      <View style={styles.container}>
        <Text>Loading distributor details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{distributor.name}</Text>
      <View style={styles.row}>
        <Icon name="location-on" size={24} color="#333" />
        <Text style={styles.itemText}>Location: {distributor.location}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="phone" size={24} color="#333" />
        <Text style={styles.itemText}>Contact: {distributor.contact}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="email" size={24} color="#333" />
        <Text style={styles.itemText}>Email: {distributor.email}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="business" size={24} color="#333" />
        <Text style={styles.itemText}>Type: {distributor.type}</Text>
      </View>
      <View style={styles.row}>
        <Icon name="store" size={24} color="#333" />
        <Text style={styles.itemText}>Available Stock: {distributor.stock}</Text>
      </View>
      <Button
        title="View Location"
        onPress={() => navigation.navigate('LocationMap', { location: distributor.location })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#e8f5e9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  itemText: { fontSize: 16, color: '#333', marginLeft: 8 },
});
