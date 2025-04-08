// app/chats/index.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { getAcceptedCommissions } from "@/src/services/commisionApi";
import { ClientCommissionDTO } from "@/src/constants/CommissionTypes";
import { useRouter } from "expo-router";
import { AuthenticationContext } from "@/src/contexts/AuthContext";

export default function ChatListScreen() {
  const { loggedInUser } = useContext(AuthenticationContext);
  const [acceptedChats, setAcceptedChats] = useState<ClientCommissionDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchChats = async () => {
    try {
      const token = loggedInUser.token;
      const data = await getAcceptedCommissions(token); // Debe retornar ClientCommissionDTO[] con el campo id
      console.log("Accepted chats:", data);
      setAcceptedChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const renderItem = ({ item }: { item: ClientCommissionDTO }) => {
    console.log("Chat item:", item);
    // Determinamos el "otro" usuario:
    const otherUsername =
      loggedInUser.username === item.artistUsername
        ? item.clientUsername
        : item.artistUsername;
    const commissionId = item.id;
    console.log("Navegando con ID:", commissionId);
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>
          router.push(
            `/chats/${commissionId}?otherUsername=${encodeURIComponent(otherUsername)}`
          )
        }
      >
        <Image
          source={{
            uri: item.image
              ? `data:image/jpeg;base64,${item.image}`
              : "https://via.placeholder.com/50",
          }}
          style={styles.chatImage}
        />
        <View style={styles.chatInfo}>
          <Text style={styles.chatTitle}>{item.name}</Text>
          <Text style={styles.chatSubtitle}>Chat with {otherUsername}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={acceptedChats}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      }
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text>No hay chats disponibles.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: { padding: 10 },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatInfo: { flex: 1 },
  chatTitle: { fontSize: 16, fontWeight: "bold" },
  chatSubtitle: { fontSize: 14, color: "#555" },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
