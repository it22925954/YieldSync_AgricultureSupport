import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function DistributorForm({ navigation }) {
  const [inputs, setInputs] = useState({
    name: "",
    location: "",
    contact: "",
    stock: "",
    email: "",
    type: "",
  });0

  const handleChange = (key, value) => {
    setInputs((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!inputs.name || !inputs.location || !inputs.contact || !inputs.email || !inputs.type || !inputs.stock) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

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
      const response = await fetch("http://192.168.179.62:5000/api/distributors/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Distributor added successfully!");
        navigation.navigate("Dashboard", { refresh: true }); // Trigger refresh
      } else {
        Alert.alert("Error", data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to connect to the server");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Distributor</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Distributor Name"
          value={inputs.name}
          onChangeText={(text) => handleChange("name", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={inputs.location}
          onChangeText={(text) => handleChange("location", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact"
          keyboardType="phone-pad"
          value={inputs.contact}
          onChangeText={(text) => handleChange("contact", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={inputs.email}
          onChangeText={(text) => handleChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Distributor Type"
          value={inputs.type}
          onChangeText={(text) => handleChange("type", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Stock"
          keyboardType="String"
          value={inputs.stock}
          onChangeText={(text) => handleChange("stock", text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Distributor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8f5e9",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2e7d32",
    marginBottom: 20,
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
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#2e7d32",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
