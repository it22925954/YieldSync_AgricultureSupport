import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import axios from "axios";

const API_URL = "http://192.168.103.92:5000/notices";

const UpdateNoticeScreen = ({ route, navigation }) => {
  const { notice } = route.params;
  const [title, setTitle] = useState(notice.title);
  const [body, setBody] = useState(notice.body);

  const updateNotice = async () => {
    try {
      await axios.put(`${API_URL}/${notice._id}`, { title, body });
      Alert.alert("Success", "Notice updated!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating notice:", error);
    }
  };

  return (
    <Container>
      <Title>Update Your Previous Notice</Title>
      <Input placeholder="Title" value={title} onChangeText={setTitle} />
      <Input
        placeholder="Enter Notice Body"
        value={body}
        onChangeText={setBody} // Update body as the user types
        multiline
        numberOfLines={100} // Adjusts the default number of lines for the textarea
        style={{ textAlignVertical: 'top' }} // Ensures text starts from the top of the field
      />

      <Button onPress={updateNotice}>
        <ButtonText>Update Notice</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`flex: 1; padding: 20px; background-color: #f5f5f5;`;
const Title = styled.Text`font-size: 22px; font-weight: bold; margin-bottom: 15px;`;
const Input = styled.TextInput`background-color: white; padding: 10px; margin-bottom: 10px; border-radius: 5px;`;
const Button = styled.TouchableOpacity`background-color: #2e7d32; padding: 10px; align-items: center; border-radius: 5px;`;
const ButtonText = styled.Text`color: white; font-size: 16px;`;

export default UpdateNoticeScreen;
