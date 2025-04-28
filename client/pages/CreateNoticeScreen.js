import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import axios from "axios";

const API_URL = "http://192.168.82.36:5000/notices";

const CreateNoticeScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNotice = async () => {
    if (!title || !body) {
      Alert.alert("Error", "Please enter title and body");
      return;
    }
    try {
      await axios.post(API_URL, { title, body });
      Alert.alert("Success", "Notice added!");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding notice:", error);
    }
  };

  return (
    <Container>
      <Title>Add New Notice</Title>
      <Input placeholder="Title" value={title} onChangeText={setTitle} />
      <Input
        placeholder="Enter Notice Body"
        value={body}
        onChangeText={setBody}
        multiline
        numberOfLines={100}  // Allows more space for text input
        placeholderTextColor="#888"
        style={{ textAlignVertical: "top", height: 250 }} // Ensures text starts at the top
      />

      <Button onPress={addNotice}>
        <ButtonText>Add Notice</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`flex: 1; padding: 20px; background-color: #f5f5f5;`;
const Title = styled.Text`font-size: 22px; font-weight: bold; margin-bottom: 15px;`;
const Input = styled.TextInput`background-color: white; padding: 10px; margin-bottom: 10px; border-radius: 5px;`;
const Button = styled.TouchableOpacity`background-color: #2e7d32; padding: 10px; align-items: center; border-radius: 5px;`;
const ButtonText = styled.Text`color: white; font-size: 16px;`;

export default CreateNoticeScreen;
