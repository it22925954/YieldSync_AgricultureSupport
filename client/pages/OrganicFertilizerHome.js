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