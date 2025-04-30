import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function PostDetailScreen({ route }) {
  const { post } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: post.image }} style={styles.detailImage} />
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text>{post.content}</Text>
      <View style={styles.postStats}>
        <Text>❤️ {post.likes}</Text>
        <Text>💬 {post.comments}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  detailImage: { width: "100%", height: 250, borderRadius: 5, marginBottom: 10 },
  postTitle: { fontWeight: "bold", fontSize: 20 },
  postStats: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
});

