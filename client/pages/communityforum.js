import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

const API_URL = "http://192.168.103.92:5000/api/posts"; // Your API

export default function ForumScreen({ navigation }) {
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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🌿 Community Forum</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("NewPost", { setPosts })}>
          <Icon name="plus-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.postGrid}>
            <TouchableOpacity onPress={() => navigation.navigate("PostDetail", { post: item })}>
              <Image source={{ uri: item.image || "https://source.unsplash.com/featured/?farm" }} style={styles.postImage} />
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{item.title}</Text>
                <View style={styles.postStats}>
                  <Text>❤️ {item.likes}</Text>
                  <Text>💬 {item.comments}</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* ✅ Chat Icon */}
            <TouchableOpacity
              style={styles.chatButton}
              onPress={() => navigation.navigate("PostChat", { postId: item._id, postTitle: item.title })}
            >
              <Icon name="message-circle" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* View Notices Button */}
      <TouchableOpacity style={styles.navigateButton} onPress={() => navigation.navigate("AddNotice")}>
        <Text style={styles.navigateButtonText}>🔔 View Important Notices</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#e8f5e9" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1b5e20" },
  addButton: { backgroundColor: "#1b5e20", padding: 10, borderRadius: 50 },
  postGrid: { flex: 1, margin: 5, backgroundColor: "#ffffff", borderRadius: 8, elevation: 3, overflow: "hidden", paddingBottom: 10, position: 'relative' },
  postImage: { width: "100%", height: 120, borderRadius: 5 },
  postContent: { padding: 10 },
  postTitle: { fontWeight: "bold", fontSize: 16, color: "#2d6a4f" },
  postStats: { flexDirection: "row", justifyContent: "space-between", marginTop: 5, color: "#555" },
  
  // Navigate Notices
  navigateButton: { backgroundColor: "#2e7d32", padding: 15, borderRadius: 30, alignItems: "center", marginTop: 20 },
  navigateButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },

  // ✅ Chat Button
  chatButton: {
    backgroundColor: "#1b5e20",
    padding: 8,
    borderRadius: 30,
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
