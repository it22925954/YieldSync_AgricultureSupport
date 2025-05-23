import React, { useState, useCallback } from "react";
import {View,Text,StyleSheet,FlatList,Button,Alert,TouchableOpacity,TextInput,} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Dashboard({ navigation }) {
  const [distributors, setDistributors] = useState([]);
  const [filteredDistributors, setFilteredDistributors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchDistributors = async () => {
    try {
      const response = await fetch("http://192.168.8.158:5000/api/distributors/all");
      if (!response.ok) {
        throw new Error("Failed to fetch distributors");
      }
      const data = await response.json();
      console.log("Fetched Distributors:", data);
      setDistributors(data);
      setFilteredDistributors(data);
    } catch (error) {
      console.error("Network request failed:", error);
      Alert.alert("Error", "Failed to load distributors.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDistributors();
    }, [])
  );

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = distributors.filter((distributor) =>
      distributor.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredDistributors(filtered);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this distributor?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const response = await fetch(
                `http://192.168.8.158:5000/api/distributors/delete/${id}`,
                {
                  method: "DELETE",
                }
              );
              if (response.ok) {
                Alert.alert("Success", "Distributor deleted successfully!");
                const updatedList = distributors.filter((item) => item._id !== id);
                setDistributors(updatedList);
                setFilteredDistributors(updatedList);
              } else {
                Alert.alert("Error", "Failed to delete distributor");
              }
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Failed to delete distributor");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>🍃 Welcome!</Text>
        <Text style={styles.welcomeSubText}>Fertilizer Distributors</Text>
        <Text style={styles.subText}>Manage your distributors and stock efficiently.</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Add Distributor"
          color="#2e7d32"
          onPress={() => navigation.navigate("Add Distributor")}
        />
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search by distributor name..."
        value={searchTerm}
        onChangeText={handleSearch}
      />

      <Text style={styles.title}>Distributor List</Text>

      <FlatList
        data={filteredDistributors}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.row}>
              <Icon name="person" size={24} color="#333" />
              <Text style={styles.itemText}>Name: {item.name}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="location-on" size={24} color="#333" />
              <Text style={styles.itemText}>Location: {item.location}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="phone" size={24} color="#333" />
              <Text style={styles.itemText}>Contact: {item.contact}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" size={24} color="#333" />
              <Text style={styles.itemText}>Email: {item.email}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="business" size={24} color="#333" />
              <Text style={styles.itemText}>Type: {item.type}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="store" size={24} color="#333" />
              <Text style={styles.itemText}>Available Stock: {item.stock}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() =>
                  navigation.navigate("Update Distributor", { distributorId: item._id })
                }
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewProfileButton}
                onPress={() =>
                  navigation.navigate("DistributorProfile", { distributorId: item._id })
                }
              >
                <Text style={styles.buttonText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#e8f5e9" },
  welcomeSection: {
    backgroundColor: "#2e7d32",
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  welcomeText: { color: "white", fontSize: 24, fontWeight: "bold" },
  welcomeSubText: { color: "white", fontSize: 20, marginTop: 8, fontWeight: "bold" },
  subText: { color: "white", marginTop: 8 },
  buttonContainer: { marginBottom: 16 },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  item: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  itemText: { fontSize: 16, color: "#333" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 5,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  updateButton: {
    backgroundColor: "#f5ad42",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  viewProfileButton: {
    backgroundColor: "#2e7d32",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
