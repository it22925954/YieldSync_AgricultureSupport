import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const API_URL = "http://192.168.82.36:5000/notices";

const AlertListScreen = () => {
  const [notices, setNotices] = useState([]);
  const navigation = useNavigation();

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

  const handleEdit = (notice) => {
    navigation.navigate("EditNotice", { notice });  // Passing the full notice object
  };

  const handleDelete = (id) => {
    navigation.navigate("DeleteNotice", { noticeId: id });
  };

  return (
    <Container>
      <TitleContainer>
        <MaterialIcons name="groups" size={28} color="#2e7d32" />
        <Title>Community Alerts</Title>
      </TitleContainer>
      <ScrollView>
        {notices.map((item) => (
          <NoticeCard key={item._id}>
            <IconContainer>
              <MaterialIcons name="campaign" size={24} color="white" />
            </IconContainer>
            <NoticeContent>
              <NoticeTitle>{item.title}</NoticeTitle>
              <NoticeBody>{item.body}</NoticeBody>
              <NoticeDate>{item.date}</NoticeDate>
            </NoticeContent>
            <ActionIcons>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEdit(item)}
              >
                <MaterialIcons name="edit" size={24} color="#2e7d32" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item._id)}
              >
                <MaterialIcons name="delete" size={24} color="#d32f2f" />
              </TouchableOpacity>
            </ActionIcons>
          </NoticeCard>
        ))}
      </ScrollView>
    </Container>
  );
};

const styles = {
  editButton: {
    backgroundColor: "white", // Orange color for the edit button
    padding: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "white", // Red color for the delete button
    padding: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #e8f5e9;
`;

const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  elevation: 2;
`;

const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #2e7d32;
  margin-left: 15px;
`;

const NoticeCard = styled.View`
  flex-direction: column; /* Change to column to allow vertical arrangement */
  background-color: #ffffff;
  padding-top: 15px;
  padding-right: 10px;
  padding-bottom: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  align-items: flex-start; /* Align the content to the left */
  elevation: 4;
  border-left-width: 5px;
  border-left-color: #d32f2f;
  position: relative;
  justify-content: space-between; /* Ensures the content is distributed vertically */
`;

const IconContainer = styled.View`
  position: absolute;
  top: 15px;
  left: 10px;
  width: 30px;
  height: 30px;
  background-color: #f5ad42;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const NoticeContent = styled.View`
  flex: 1;
  margin-left: 50px;
`;

const NoticeTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const NoticeBody = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 20px;
`;

const NoticeDate = styled.Text`
  font-size: 12px;
  color: #888;
  margin-top: 20px;
`;

const ActionIcons = styled.View`
  flex-direction: row;
  justify-content: space-between; /* Distribute buttons horizontally */
  width: 100%; /* Make sure the buttons span the full width */
  margin-top: 10px;
  padding: 0 10px;
`;

export default AlertListScreen;
