import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationContext } from "@/src/contexts/AuthContext";
import { getAllUserMessages } from "@/src/services/chatService";
import { useRouter } from "expo-router";


interface BaseUser {
  id: number;
  name: string;
  
}

export interface ChatMessage {
  id: number;
  text: string;
  creationDate: Date; 
  fromUser: BaseUser;
  toUser: BaseUser;
}


interface Conversation {
  otherUser: BaseUser;
  lastMessage: ChatMessage;
}

export default function ConversationListScreen() {
  const router = useRouter();
  const { loggedInUser } = useContext(AuthenticationContext);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();

  // Función para cargar TODOS los mensajes del usuario actual
  const loadMessages = async () => {
    try {
      const msgs = await getAllUserMessages(loggedInUser.id, loggedInUser.token);
      setMessages(msgs);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los mensajes");
    } finally {
      setLoading(false);
    }
  };

  // Función para agrupar los mensajes en conversaciones
  const groupMessagesToConversations = () => {
    const convMap: { [key: number]: ChatMessage } = {};
    messages.forEach((msg) => {
      // Determinar el "otro usuario"
      const otherUser =
        msg.fromUser.id === loggedInUser.id ? msg.toUser : msg.fromUser;
      // Si no existe una conversación para ese usuario o este mensaje es más reciente, lo asignamos
      if (
        !convMap[otherUser.id] ||
        new Date(msg.creationDate) > new Date(convMap[otherUser.id].creationDate)
      ) {
        convMap[otherUser.id] = msg;
      }
    });
    // Convertir el mapa a un array de Conversation
    const convArray: Conversation[] = Object.keys(convMap).map((key) => {
      const msg = convMap[parseInt(key)];
      const otherUser =
        msg.fromUser.id === loggedInUser.id ? msg.toUser : msg.fromUser;
      return { otherUser, lastMessage: msg };
    });
    // Ordenar las conversaciones por la fecha del último mensaje (descendente)
    convArray.sort(
      (a, b) =>
        new Date(b.lastMessage.creationDate).getTime() -
        new Date(a.lastMessage.creationDate).getTime()
    );
    setConversations(convArray);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  
  useEffect(() => {
    groupMessagesToConversations();
  }, [messages]);

  const renderItem = ({ item }: { item: Conversation }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => {
        // Navegar hacia la ruta [toUserId].tsx con el ID
        router.push(`/(drawer)/chats/${item.otherUser.id}`);
      }}
    >
      <Text style={styles.userName}>{item.otherUser.name}</Text>
      <Text style={styles.lastMessage} numberOfLines={1}>
        {item.lastMessage.text}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {conversations.length === 0 ? (
        <View style={styles.centered}>
          <Text>No tienes conversaciones</Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.otherUser.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  list: { paddingBottom: 20 },
  conversationItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userName: { fontSize: 18, fontWeight: "bold" },
  lastMessage: { fontSize: 14, color: "gray", marginTop: 4 },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
});
