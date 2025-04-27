import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { FontAwesome } from "react-native-vector-icons";
import Header from "../components/header";
import Footer from "../components/footer";

const images = [
  { url: "https://www.new-terra-natural-food.com/images/successful-small-farmer.jpg", id: 1 },
  { url: "https://doa.gov.lk/wp-content/uploads/elementor/thumbs/farm2-otsrd9jvxs0q0xbzng2xhi0ij7jdl518u7etpbogfs.jpg", id: 2 },
  { url: "https://agrisecure.com/wp-content/uploads/2021/03/AdobeStock_112035174_Medium.jpg", id: 3 },
];

const HomeScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };


  return (
    <View style={{ flex: 1, backgroundColor: "#e8f5e9", padding: 20 }}>
      {/* Header */}
      <Header />

      <Text style={{ color: "#4CAF50", fontSize: 16, marginBottom: 15 }}>Stronger Farms Together</Text>

      {/* Search Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#C8E6C9",
          padding: 10,
          borderRadius: 15,
        }}
      >
        <Icon name="search" size={20} color="#2E7D32" style={{ marginRight: 5 }} />
        <TextInput placeholder="Search " placeholderTextColor="#388E3C" style={{ flex: 1, fontSize: 16, color: "#2E7D32" }} />
        <TouchableOpacity>
          <Icon name="sliders" size={20} color="#2E7D32" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1B5E20", marginTop: 20 }}>History</Text>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TouchableOpacity style={{ backgroundColor: "#388E3C", padding: 10, borderRadius: 15, marginRight: 10 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Announcement</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10, borderRadius: 15, backgroundColor: "#A5D6A7", marginRight: 10 }}>
          <Text style={{ color: "#1B5E20" }}>Distributors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10, borderRadius: 15, backgroundColor: "#A5D6A7" }}>
          <Text style={{ color: "#1B5E20" }}>Expenses</Text>
        </TouchableOpacity>
      </View>

      {/* Image Slider */}
      <View style={{ marginTop: 30 }}>
        <TouchableOpacity onPress={() => handleImageClick(images[currentIndex].id)}>
          <Image source={{ uri: images[currentIndex].url }} style={{ width: "100%", height: 300, borderRadius: 15 }} />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handlePrevious} style={{ backgroundColor: "#e8f5e9", padding: 10, borderRadius: 50 }}>
            <Icon name="chevron-left" size={20} color="#2e7d32" />
          </TouchableOpacity>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1B5E20" }}></Text>
          <TouchableOpacity onPress={handleNext} style={{ backgroundColor: "#e8f5e9", padding: 10, borderRadius: 50 }}>
            <Icon name="chevron-right" size={20} color="#2e7d32" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <Footer />
    </View>
  );
};

export default HomeScreen;
