import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native"; // <-- Import navigation

const Footer = () => {
  const navigation = useNavigation(); // <-- Initialize navigation

  return (
    <View
      style={{
        position: "absolute",
        bottom: 10,
        left: 20,
        right: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#2e7d32",
        padding: 15,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
        <Icon name="home" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ActivityScreen")}>
        <Icon name="activity" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
        <Icon name="message-circle" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
        <Icon name="user" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;