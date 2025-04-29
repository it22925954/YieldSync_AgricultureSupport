import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const API_URL = "http://192.168.82.36:5000/api/posts";

export default function NewPostScreen({ route, navigation }) {
  const { setPosts } = route.params;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  //  Pick image from the device
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //  Create a new post with image
  const addPost = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter a title and content.");
      return;
    }

    const newPost = { title, content, image };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts((prevPosts) => [data, ...prevPosts]);
        navigation.goBack();
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create a New Post</Text>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Content" style={styles.input} value={content} onChangeText={setContent} multiline />

      {/*  Image Picker & Preview */}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>📸 Pick an Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.button} onPress={addPost}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2d6a4f" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5, backgroundColor: "#fff" },
  button: { backgroundColor: "#2d6a4f", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  imageButton: { backgroundColor: "#4caf50", padding: 10, borderRadius: 5, alignItems: "center", marginVertical: 10 },
  imageButtonText: { color: "#fff", fontWeight: "bold" },
  imagePreview: { width: "100%", height: 200, borderRadius: 5, marginTop: 10 },
});
