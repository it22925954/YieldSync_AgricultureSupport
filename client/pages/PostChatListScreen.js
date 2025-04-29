import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/Feather";

const API_URL = "http://192.168.132.108:5000/api/posts"; // Your Posts API

export default function PostChatListScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#2d6a4f" />;

  return (
    <Container>
      {/* <Header>💬 Post Community Chats</Header> */}

      {posts.length === 0 ? (
        <EmptyText>No chats available yet.</EmptyText>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ChatItem onPress={() => navigation.navigate("PostChat", { postId: item._id, postTitle: item.title })}>
              <ChatRow>
                <Icon name="message-square" size={24} color="#1b5e20" />
                <ChatContent>
                  <ChatTitle>{item.title}</ChatTitle>
                  <LastMessage>Click to view and chat 📩</LastMessage>
                </ChatContent>
              </ChatRow>
            </ChatItem>
          )}
        />
      )}
    </Container>
  );
}

// ✅ Styled Components
const Container = styled.View` flex: 1; background-color: #e8f5e9; padding: 20px; `;
const Header = styled.Text` font-size: 24px; font-weight: bold; color: #1b5e20; margin-bottom: 20px; text-align: center; `;
const ChatItem = styled(TouchableOpacity)` background-color: white; padding: 15px; margin-bottom: 10px; border-radius: 15px; elevation: 3; `;
const ChatRow = styled.View` flex-direction: row; align-items: center; `;
const ChatContent = styled.View` margin-left: 10px; `;
const ChatTitle = styled.Text` font-size: 16px; font-weight: bold; color: #1b5e20; `;
const LastMessage = styled.Text` font-size: 13px; color: #555; margin-top: 2px; `;
const EmptyText = styled.Text` font-size: 16px; color: gray; text-align: center; margin-top: 50px; `;
