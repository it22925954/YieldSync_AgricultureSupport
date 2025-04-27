import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function UpdateDistributor({ route, navigation }) {
  const { distributorId } = route.params;
  const [inputs, setInputs] = useState({
    name: "",
    location: "",
    contact: "",
    stock: "",
    email: "",
    type: "",
  });

  useEffect(() => {
    fetchDistributorDetails();
  }, []);

  const fetchDistributorDetails = async () => {
    try {
      const response = await fetch(`http://192.168.179.62:5000/api/distributors/${distributorId}`);
      const data = await response.json();
      if (response.ok) {
        setInputs({
          name: data.name,
          location: data.location,
          contact: data.contact,
          stock: data.stock.toString(),
          email: data.email,
          type: data.type,
        });
      } else {
        Alert.alert("Error", "Distributor not found");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load distributor details");
    }
  };

  const handleChange = (key, value) => setInputs((prevState) => ({ ...prevState, [key]: value }));

  const handleUpdate = async () => {
    // Email validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(inputs.email)) {
    Alert.alert("Error", "Please enter a valid email address.");
    return;
  }

  // Contact validation (assuming a 10-digit phone number)
  const contactPattern = /^[0-9]{10}$/;
  if (!contactPattern.test(inputs.contact)) {
    Alert.alert("Error", "Please enter a valid 10-digit phone number.");
    return;
  }
    try {
      const response = await fetch(`http://192.168.179.62:5000/api/distributors/update/${distributorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        Alert.alert("Success", "Distributor updated successfully!");
        navigation.navigate("Dashboard");
      } else {
        Alert.alert("Error", "Failed to update distributor");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to the server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Distributor Details</Text>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Distributor Name" value={inputs.name} onChangeText={(text) => handleChange("name", text)} />
        <TextInput style={styles.input} placeholder="Location" value={inputs.location} onChangeText={(text) => handleChange("location", text)} />
        <TextInput style={styles.input} placeholder="Contact" keyboardType="phone-pad" value={inputs.contact} onChangeText={(text) => handleChange("contact", text)} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={inputs.email} onChangeText={(text) => handleChange("email", text)} />
        <TextInput style={styles.input} placeholder="Distributor Type" value={inputs.type} onChangeText={(text) => handleChange("type", text)} />
        <TextInput style={styles.input} placeholder="Stock"  value={inputs.stock} onChangeText={(text) => handleChange("stock", text)} />
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Distributor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#e8f5e9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  form: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  button: {
    backgroundColor: "#2e7d32",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
