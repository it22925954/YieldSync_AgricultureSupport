import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation(); //  Correct way to get navigation object

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>YieldSync</Text>

        {/*  TouchableOpacity to navigate */}
        <TouchableOpacity onPress={() => navigation.navigate('OrganicFertilizer')}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.subtitle}>Your Smart Farm Assistant</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'serif',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    bottom: 30,
  },
});
