import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

const DetailsScreen = ({ route }) => {
  const { imageId } = route.params; // Get the imageId passed from the HomeScreen
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    
    // Fetch the image URL based on the imageId
    switch (imageId) {
      case 1:
        setImageUrl("https://source.unsplash.com/featured/?mountfuji");
        break;
      case 2:
        setImageUrl("https://source.unsplash.com/featured/?mountains");
        break;
      case 3:
        setImageUrl("https://source.unsplash.com/featured/?beach");
        break;
      default:
        setImageUrl("https://source.unsplash.com/featured/?nature");
    }
  }, [imageId]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#e8f5e9" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>Details of Image {imageId}</Text>
      <Image source={{ uri: imageUrl }} style={{ width: "90%", height: 250, borderRadius: 15 }} />
    </View>
  );
};

export default DetailsScreen;
