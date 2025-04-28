import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

const API_URL = "http://192.168.82.36:5000/api/posts";

export default function EditPostScreen({ route, navigation }) {
  const { post, setPosts } = route.params;
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(post.image);

  // ✅ Pick new image
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

  // ✅ Update post including image
  const updatePost = () => {
    fetch(`${API_URL}/${post._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, image }),
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        setPosts((prevPosts) => prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p)));
        navigation.goBack();
      })
      .catch((error) => console.error("Error updating post:", error));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Post</Text>
      <TextInput placeholder="Title" style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput placeholder="Content" style={styles.input} value={content} onChangeText={setContent} multiline />

      {/* ✅ Image Picker & Preview */}
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>📸 Change Image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

      <TouchableOpacity style={styles.button} onPress={updatePost}>
        <Text style={styles.buttonText}>Update Post</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", color: "#2d6a4f" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5, backgroundColor: "#fff" },
  button: { backgroundColor: "#4caf50", padding: 15, borderRadius: 5, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  imageButton: { backgroundColor: "#4caf50", padding: 10, borderRadius: 5, alignItems: "center", marginVertical: 10 },
  imageButtonText: { color: "#fff", fontWeight: "bold" },
  imagePreview: { width: "100%", height: 200, borderRadius: 5, marginTop: 10 },
});
