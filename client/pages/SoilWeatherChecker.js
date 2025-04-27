import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SoilWeatherChecker() {
  const [selectedArea, setSelectedArea] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const areas = ['Area 1', 'Area 2', 'Area 3', 'Area 4']; // Example areas

  const handleSelectArea = (area) => {
    setSelectedArea(area);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Soil & Weather Condition Checker</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        This provides data on the climate and soil conditions relevant to your area.
      </Text>

      {/* Logo */}
      {/* <Image source={require('./assets/logo.png')} style={styles.logo} /> */}

      {/* Dropdown */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdown}>
        <Text style={styles.dropdownText}>
          {selectedArea || 'Select the Area'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="black" />
      </TouchableOpacity>

      {/* Modal for area selection */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={areas}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectArea(item)} style={styles.modalItem}>
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Weather & Soil Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Weather Condition</Text>
        <TextInput style={styles.infoBox} placeholder="Weather Condition" editable={false} />

        <Text style={styles.infoTitle}>Soil Type</Text>
        <TextInput style={styles.infoBox} placeholder="Soil Type" editable={false} />
      </View>
    </View>
  );
}

/*useEffect(() => {
  const fetchAreas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/areas');
      const data = await response.json();
      setAreas(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchAreas();
}, []);
*/

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 20,
    },
    header: {
      backgroundColor: '#3A963A',
      paddingVertical: 20,
      paddingHorizontal: 15,
      marginBottom: 20,
      marginTop: 40,
    },
    headerText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    description: {
      textAlign: 'center',
      color: '#555',
      fontSize: 14,
      marginBottom: 20,
    },
    logo: {
      width: 100,
      height: 100,
      alignSelf: 'center',
      marginBottom: 20,
    },
    dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderColor: '#CCC',
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
    },
    dropdownText: {
      fontSize: 16,
      color: '#555',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#FFF',
      padding: 20,
      marginHorizontal: 20,
      borderRadius: 10,
    },
    modalItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#EEE',
    },
    modalText: {
      fontSize: 16,
      color: '#555',
    },
    modalClose: {
      marginTop: 10,
      paddingVertical: 10,
      backgroundColor: '#3A963A',
      borderRadius: 5,
      alignItems: 'center',
    },
    closeText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    infoContainer: {
      backgroundColor: '#3A963A',
      padding: 20,
      borderRadius: 10,
      marginTop: 20,
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 5,
    },
    infoBox: {
      backgroundColor: '#FFF',
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
    },
  });
  