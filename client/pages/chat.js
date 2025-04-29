import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const App = () => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey, how's the farming season going?", sender: "John", avatar: "https://source.unsplash.com/40x40/?farmer,man" },
    { id: "2", text: "It's great! The weather is perfect for growing.", sender: "Emily", avatar: "https://source.unsplash.com/40x40/?farmer,woman" },
  ]);
  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: "You",
        avatar: "https://source.unsplash.com/40x40/?smile,person",
      };
      setMessages([newMessage, ...messages]);
      setInputText("");
    }
  };

  const renderMessage = ({ item }) => (
    <View style={{ flexDirection: "row", alignItems: "center", margin: 10, flexDirection: item.sender === "You" ? "row-reverse" : "row" }}>
      <Image source={{ uri: item.avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }} />
      <View style={{ backgroundColor: item.sender === "You" ? "#DCF8C6" : "#fff", padding: 10, borderRadius: 10, maxWidth: "70%", elevation: 2 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 3 }}>{item.sender}</Text>
        <Text style={{ fontSize: 16 }}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F0F0F0" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", padding: 15, backgroundColor: "#6D9F71", color: "#fff", marginTop: 20, borderRadius: 10, marginTop: 20 }}>
        Community Chat 🌿
      </Text>
      <FlatList data={messages} renderItem={renderMessage} keyExtractor={(item) => item.id} inverted />
      <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 10 }}>
        <TextInput
          style={{ flex: 1, padding: 10, borderWidth: 1, borderRadius: 20, borderColor: "#ccc", marginRight: 10 }}
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendMessage} style={{ backgroundColor: "#6D9F71", padding: 10, borderRadius: 50 }}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
