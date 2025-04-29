import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import styled from "styled-components/native";

export default function PostChatScreen({ route }) {
  const { postId, postTitle } = route.params;
  const [username, setUsername] = useState("Guest");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const API_URL = `http://192.168.103.92:5000/api/messages/${postId}`; // Dynamic by post

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, message }),
    })
      .then((res) => res.json())
      .then((newMsg) => {
        setMessages((prev) => [...prev, newMsg]);
        setMessage("");
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <Container>
        <Header>💬 Chat about: {postTitle}</Header>

        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <MessageBubble isOwnMessage={item.username === username}>
              <BubbleText>{item.message}</BubbleText>
              <BubbleTime>{new Date(item.timestamp).toLocaleTimeString()}</BubbleTime>
            </MessageBubble>
          )}
          contentContainerStyle={{ paddingVertical: 10 }}
          style={{ flex: 1 }}
        />

        <InputContainer>
          <MessageInput
            placeholder="Type your message..."
            value={message}
            onChangeText={setMessage}
          />
          <SendButton onPress={sendMessage}>
            <ButtonText>Send</ButtonText>
          </SendButton>
        </InputContainer>
      </Container>
    </KeyboardAvoidingView>
  );
}

//  Styled Components
const Container = styled.View` flex: 1; background-color: #e8f5e9; `;
const Header = styled.Text` font-size: 20px; font-weight: bold; color: #1b5e20; padding: 15px; text-align: center; background-color: #1b5e20; color: white; `;
const MessageBubble = styled.View`
  background-color: ${(props) => (props.isOwnMessage ? "#a5d6a7" : "white")};
  align-self: ${(props) => (props.isOwnMessage ? "flex-end" : "flex-start")};
  margin: 8px 10px;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 70%;
  elevation: 2;
`;
const BubbleText = styled.Text` font-size: 15px; color: #333; `;
const BubbleTime = styled.Text` font-size: 10px; color: #777; margin-top: 5px; text-align: right; `;

const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-top-width: 1px;
  border-color: #ccc;
`;

const MessageInput = styled.TextInput`
  flex: 1;
  background-color: #f1f8e9;
  padding: 10px 15px;
  border-radius: 25px;
  margin-right: 10px;
  font-size: 15px;
`;

const SendButton = styled.TouchableOpacity`
  background-color: #1b5e20;
  padding: 12px 20px;
  border-radius: 30px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 14px;
`;