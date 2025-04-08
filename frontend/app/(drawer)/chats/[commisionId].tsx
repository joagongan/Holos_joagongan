// app/chats/[commisionId].tsx
import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { getConversation, sendMessage, ChatMessage } from "@/src/services/chatService";
import { AuthenticationContext } from "@/src/contexts/AuthContext";

type ExtendedChatMessage = ChatMessage & { sentByMe?: boolean };

const STORAGE_KEY = (commId: string, userId: string) => `sentMessages_${commId}_${userId}`;

export default function ChatScreen() {
  const params = useLocalSearchParams() as {
    commisionId?: string;
    otherUsername?: string;
  };
  console.log("Parámetros recibidos:", params);

  const { commisionId, otherUsername } = params;
  if (!commisionId || commisionId === "undefined") {
    console.error("Error: 'commisionId' es inválido. Verifica que la navegación esté enviando el ID correcto.");
    return (
      <View style={styles.centered}>
        <Text>Error: no se encontró un 'commisionId' válido.</Text>
      </View>
    );
  }

  const { loggedInUser } = useContext(AuthenticationContext);
  console.log("LoggedInUser:", loggedInUser);

  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState<{ uri: string; type: string; name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Guardar IDs de mensajes enviados con la clave que depende del usuario y la comisión
  const saveSentMessageId = (msgId: number) => {
    try {
      const key = STORAGE_KEY(commisionId!, loggedInUser.id.toString());
      const stored = localStorage.getItem(key);
      let ids: number[] = stored ? JSON.parse(stored) : [];
      if (!ids.includes(msgId)) {
        ids.push(msgId);
        localStorage.setItem(key, JSON.stringify(ids));
      }
    } catch (error) {
      console.error("Error guardando mensajes enviados:", error);
    }
  };

  const getSentMessageIds = (): number[] => {
    try {
      const key = STORAGE_KEY(commisionId!, loggedInUser.id.toString());
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error recuperando mensajes enviados:", error);
      return [];
    }
  };

  const markMessages = (msgs: ChatMessage[]): ExtendedChatMessage[] => {
    const sentIds = new Set(getSentMessageIds());
    return msgs.map((msg) => ({ ...msg, sentByMe: sentIds.has(msg.id) }));
  };

  const fetchMessages = async () => {
    console.log("Fetching messages for commisionId:", commisionId);
    try {
      const conv = await getConversation(Number(commisionId), loggedInUser.token);
      console.log("Fetched messages:", conv);
      setMessages(markMessages(conv));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("ChatScreen montada con commisionId:", commisionId);
    fetchMessages();
    const interval = setInterval(() => {
      console.log("Refrescando mensajes para commisionId:", commisionId);
      fetchMessages();
    }, 5000);
    return () => {
      clearInterval(interval);
      console.log("ChatScreen desmontada, intervalo limpiado.");
    };
  }, [commisionId]);

  const handleSend = async () => {
    console.log("Enviando mensaje. Texto:", text, "Imagen:", selectedImage);
    if (text.trim().length === 0 && !selectedImage) {
      console.log("No se proporcionó texto ni imagen. Abortando envío.");
      return;
    }
    try {
      const newMsg = await sendMessage(Number(commisionId), text, selectedImage || undefined, loggedInUser.token);
      console.log("Mensaje enviado correctamente:", newMsg);
      saveSentMessageId(newMsg.id);
      const extendedMsg: ExtendedChatMessage = { ...newMsg, sentByMe: true };
      setMessages((prev) => [extendedMsg, ...prev]);
      setText("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  const pickImage = async () => {
    console.log("Lanzando selector de imágenes...");
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });
      if (!result.canceled) {
        const asset = result.assets[0];
        console.log("Imagen seleccionada:", asset);
        setSelectedImage({ uri: asset.uri, type: "image/jpeg", name: asset.fileName || "photo.jpg" });
      } else {
        console.log("Selección de imagen cancelada.");
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
    }
  };

  const renderItem = ({ item }: { item: ExtendedChatMessage }) => {
    console.log("Renderizando mensaje:", item);
    const isSentByMe = item.sentByMe === true;
    return (
      <View style={[styles.messageContainer, isSentByMe ? styles.messageContainerMe : styles.messageContainerOther]}>
        <Text style={styles.messageText}>{item.text}</Text>
        {item.image && (
          <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.messageImage} />
        )}
        <Text style={styles.messageDate}>{new Date(item.creationDate).toLocaleString()}</Text>
      </View>
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
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={renderItem}
        onRefresh={fetchMessages}
        refreshing={loading}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
          <Text style={styles.imageButtonText}>Img</Text>
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Escribe un mensaje..." value={text} onChangeText={setText} />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#ADD8E6", // Fondo azul pastel
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    maxWidth: "70%",
  },
  messageContainerMe: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    marginLeft: 50,
  },
  messageContainerOther: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    marginRight: 50,
  },
  messageText: {
    fontSize: 16,
    fontFamily: "DancingScript-Regular",
    color: "#333",
  },
  messageImage: {
    width: 200,
    height: 200,
    marginTop: 5,
  },
  messageDate: {
    fontSize: 10,
    color: "#555",
    marginTop: 5,
  },

  // Estilos para la barra de input
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#FFFFFF", // Fondo blanco para resaltar
    borderRadius: 10,

    // Sombras (para iOS y Android)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Android
  },
  input: {
    flex: 1,
    fontFamily: "DancingScript-Regular",
    fontSize: 16,
    backgroundColor: "#F9F9F9", // Un gris muy claro para el interior
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 5,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontFamily: "DancingScript-Regular",
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  imageButtonText: {
    color: "#fff",
    fontFamily: "DancingScript-Regular",
    fontSize: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
