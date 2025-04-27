import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Animated, Easing } from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons"; // Using FontAwesome for icons

const API_URL = "http://192.168.179.92:5000/api/auth/login"; // ✅ For Android Emulator

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fadeAnim = new Animated.Value(0); // Fade-in animation

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          Alert.alert("Success", "Login Successful!");
          navigation.replace("Home");
        } else {
          Alert.alert("Error", data.message);
        }
      })
      .catch((error) => {
        console.error("Login API Error:", error);
        Alert.alert("Error", "Something went wrong. Please try again.");
      });
  };

  // Trigger the fade-in animation
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <StyledContainer>
      <Animated.View style={{}}>
        <Title>Welcome Back</Title>
        <InputWrapper>
          <FontAwesome name="envelope" size={20} color="#1b5e20" />
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </InputWrapper>
        <InputWrapper>
          <FontAwesome name="lock" size={20} color="#1b5e20" />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </InputWrapper>
        <ButtonContainer>
          <Button onPress={handleLogin} activeOpacity={0.7}>
            <ButtonText>Login</ButtonText>
          </Button>
        </ButtonContainer>
        <Link onPress={() => navigation.navigate("Register")}>Don't have an account? Register</Link>
      </Animated.View>
    </StyledContainer>
  );
}

// ✅ Styled Components
const StyledContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #e8f5e9;
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #1b5e20;
  margin-bottom: 30px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  width: 90%;
  border-bottom-width: 2px;
  border-bottom-color: #1b5e20;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  color: #1b5e20;
  margin-left: 10px;
  background-color: transparent;
`;

const ButtonContainer = styled.View`
  position: relative;
  bottom: 20px;
  right: 20px;
  width: 150px;
`;

const Button = styled.TouchableOpacity`
  background-color: #1b5e20;
  padding: 12px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  elevation: 5;
  margin-top: 30px;
  margin-left: 180px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

const Link = styled.Text`
  color: #1b5e20;
  margin-top: 15px;
  font-size: 16px;
  text-decoration: underline;
  text-align: center;
`;
