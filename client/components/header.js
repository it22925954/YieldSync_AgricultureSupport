import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity, Modal, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native"; // <-- IMPORT THIS

const Header = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const navigation = useNavigation(); // <-- USE THIS

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const response = await fetch("https://192.168.60.108/api/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserName(data.name);
        } else {
          console.error("Error fetching user:", data.message);
        }
      } catch (error) {
        console.error("Fetch User Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const topMenuItems = [
    { id: "1", title: "Home", icon: "home", screen: "HomeScreen" },
    { id: "2", title: "Post", icon: "post", screen: "Forum" }, 
    { id: "3", title: "Expenses", icon: "cash-multiple", screen: "ExpensesScreen" },
    { id: "4", title: "Distributors", icon: "truck", screen: "Dashboard" },
    { id: "5", title: "Calculator", icon: "calculator", screen: "CalculatorScreen" }
  ];

  const bottomMenuItems = [
    { id: "6", title: "Profile", icon: "account", screen: "ProfileScreen" }, 
    { id: "7", title: "Settings", icon: "cog", screen: "SettingsScreen" },
    { id: "8", title: "Logout", icon: "logout", screen: "Login" } // Handle logout separately if needed
  ];

  const handleMenuPress = (screenName) => {
    setMenuVisible(false);
    if (screenName === "Logout") {
      // Handle logout here
      console.log("Logging out...");
      // For example: clear token, navigate to login screen, etc.
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, backgroundColor: "#e8f5e9" }}>
      <TouchableOpacity onPress={() => setMenuVisible(true)}>
        <MaterialCommunityIcons name="menu" size={30} color="#2E7D32" />
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="small" color="#2E7D32" />
      ) : (
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2E7D32" }}>
          Hi, {userName || "User"} 👋
        </Text>
      )}

      <Image
        source={{ uri: "https://static.vecteezy.com/system/resources/thumbnails/030/751/190/small/portrait-farmer-with-vegetables-ai-generative-photo.jpg" }}
        style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: "#2E7D32" }}
      />

      {/* Sidebar Menu */}
      <Modal visible={menuVisible} animationType="slide" transparent>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: 250, backgroundColor: "#e8f5e9", padding: 20, borderTopRightRadius: 10, borderBottomRightRadius: 10, flex: 1 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Yield Sync</Text>

            {/* Top Menu Items */}
            <FlatList
              data={topMenuItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => handleMenuPress(item.screen)} 
                  style={{ flexDirection: "row", alignItems: "center", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
                >
                  <MaterialCommunityIcons name={item.icon} size={24} color="#2E7D32" style={{ marginRight: 10 }} />
                  <Text style={{ fontSize: 18 }}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />

            {/* Push Profile, Settings, Logout to Bottom */}
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              {bottomMenuItems.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  onPress={() => handleMenuPress(item.screen)} 
                  style={{ flexDirection: "row", alignItems: "center", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
                >
                  <MaterialCommunityIcons name={item.icon} size={24} color="#2E7D32" style={{ marginRight: 10 }} />
                  <Text style={{ fontSize: 18 }}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={() => setMenuVisible(false)} style={{ marginTop: 20, alignSelf: "center" }}>
              <Text style={{ fontSize: 18, color: "red" }}>Close</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }} onPress={() => setMenuVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default Header;
