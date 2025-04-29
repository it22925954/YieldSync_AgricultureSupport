import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import axios from "axios";

const API_URL = "http://192.103.92:5000/notices";

const DeleteNoticeScreen = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(API_URL);
      setNotices(response.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const deleteNotice = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setNotices(notices.filter((item) => item._id !== id));
      Alert.alert("Success", "Notice deleted!");
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  return (
    <Container>
      <Title>Delete Notices</Title>
      <ScrollView>
        {notices.map((item) => (
          <NoticeCard key={item._id}>
            <NoticeTitle>{item.title}</NoticeTitle>
            <DeleteButton onPress={() => deleteNotice(item._id)}>
              <ButtonText>Delete</ButtonText>
            </DeleteButton>
          </NoticeCard>
        ))}
      </ScrollView>
    </Container>
  );
};

const DeleteButton = styled.TouchableOpacity`background-color: #d32f2f; padding: 10px; border-radius: 5px;`;
export default DeleteNoticeScreen;
