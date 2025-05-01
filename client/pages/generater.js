import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function FertilizerCalculator() {
  const [rows, setRows] = useState([{ wasteType: '', amount: '' }]);

  // Add new row
  const handleAddRow = () => {
    setRows([...rows, { wasteType: '', amount: '' }]);
  };

  // Handle waste type or amount change
  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // Handle calculate button (Example: Just logging data for now)
  const handleCalculate = () => {
    console.log('Calculating with:', rows);
    // Add your calculation logic here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Organic Fertilizer Calculator</Text>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        The carbon : nitrogen (C:N) ratio for organic fertilizers must be calculated to maintain the correct ratio. If this is not maintained correctly, the fertilizer may decompose rapidly or the process may stop.
      </Text>
      <Text style={styles.subDescription}>
        C:N ratio reasonable range (30:1 – 40:1)
      </Text>

      {/* Logo */}
      <Image
        source={require('../assets/logo.png')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Dynamic Input Rows */}
      {rows.map((row, index) => (
        <View key={index} style={styles.row}>
          {/* Waste Type Dropdown */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={row.wasteType}
              onValueChange={(value) =>
                handleInputChange(index, 'wasteType', value)
              }>
              <Picker.Item label="Waste type" value="" />
              <Picker.Item label="Fruit waste" value="fruit" />
              <Picker.Item label="Vegetable waste" value="vegetable" />
              <Picker.Item label="Grass clippings" value="grass" />
              <Picker.Item label="Dry leaves" value="leaves" />
            </Picker>
          </View>

          {/* Amount Input */}
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="numeric"
            value={row.amount}
            onChangeText={(value) =>
              handleInputChange(index, 'amount', value)
            }
          />
        </View>
      ))}

      {/* Add More Button */}
      <TouchableOpacity onPress={handleAddRow}>
        <Text style={styles.addMore}>Add more</Text>
      </TouchableOpacity>

      {/* Calculate Button */}
      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
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
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  subDescription: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  addMore: {
    color: '#888',
    fontSize: 14,
    marginVertical: 10,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#3FA34D',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
