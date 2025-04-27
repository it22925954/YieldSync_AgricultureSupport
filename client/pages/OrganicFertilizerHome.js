import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import the hook

export default function FertilizerHomePage() {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Organic Fertilizer Calculator</Text>
      </View>

      {/* Main content */}
      <View style={styles.content}>
        {/* Description */}
        <Text style={styles.description}>
          In this section, you can calculate the amount of organic fertilizer you need and check the climate conditions in your area.
        </Text>

        {/* Buttons */}
        {/* <TouchableOpacity onPress={() => navigation.navigate('startup')}>
          <Image
            source={require('../assets/logo.png')} // Replace with your actual logo path
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('generater')}
        >
          <Text style={styles.buttonText}>Organic fertilizer calculator</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SoilWeather')}
        >
          <Text style={styles.buttonText}>Soil & Weather condition checker</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate('startup')}>
          <Image
            source={require('../assets/logo.png')} // Replace with your actual logo path
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* Tagline */}
        <Text style={styles.tagline}>Grow together!</Text>

        {/* Footer */}
        <Text style={styles.footerText}>
          Connect, share, and learn empowering farmers with expert advice and community wisdom.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingVertical: 50,
    },
    header: {
      backgroundColor: '#3FA34D',
      width: '100%',
      paddingVertical: 15,
      alignItems: 'center',
      marginBottom: 30,
    },
    headerText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
    content: {
      width: '90%',
      alignItems: 'center',
    },
    description: {
      textAlign: 'center',
      fontSize: 14,
      color: '#333',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#3FA34D',
      paddingVertical: 14,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 12,
      width: '100%',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    logo: {
      width: 100,
      height: 100,
      marginVertical: 30,
    },
    tagline: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 8,
    },
    footerText: {
      textAlign: 'center',
      fontSize: 14,
      color: '#666',
      paddingHorizontal: 10,
    },
  });
  