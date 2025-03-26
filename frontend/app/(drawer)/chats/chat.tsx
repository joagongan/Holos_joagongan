import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { AuthenticationContext } from "@/src/contexts/AuthContext";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import { getAllUserConversations } from "@/src/services/chatService";
import { Conversation } from "@/src/services/Conversation";
import { useRouter } from "expo-router";

export default function ChatsListScreen() {
  const { loggedInUser } = useContext(AuthenticationContext);
  const userId = loggedInUser?.id;
  const token = loggedInUser?.token; // Se obtiene el token del usuario autenticado

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const loadChats = async () => {
      try {
        if (!userId || !token) return; // Si no hay usuario logueado, no cargamos nada
        const data = await getAllUserConversations(userId, token);
        setConversations(data);
      } catch (error) {
        console.error("Error al cargar las conversaciones:", error);
      } finally {
        setLoading(false);
      }
    };
    loadChats();
  }, [userId, token]);

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={["ARTIST", "CLIENT"]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["ARTIST", "CLIENT"]}>
      <View style={styles.container}>
        <Text style={styles.title}>Mis Chats</Text>

        {conversations.length === 0 ? (
          <Text style={styles.noChats}>No tienes chats todavía.</Text>
        ) : (
          <FlatList
            data={conversations}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chatItem}
                onPress={() => {
                  // Redirige al chat del usuario correspondiente
                  router.push(`/(drawer)/chats/[toUserId]`);
                }}
              >
                <Text style={styles.chatTitle}>{item.title}</Text>
                <Text style={styles.chatSubtitle}>
                  Usuario ID: {item.otherUserId}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  noChats: { fontSize: 16 },
  chatItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  chatTitle: { fontSize: 18, fontWeight: "bold" },
  chatSubtitle: { fontSize: 14, color: "#666" },
});
