import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ArtistRequestOrders({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Título de la página */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>BANDEJA DE ENTRADA</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Nueva Solicitudes */}
        <Text style={styles.sectionTitle}>NUEVAS SOLICITUDES</Text>
        <View style={styles.card}>
          <View style={styles.profileIcon} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>Solicitud de nuevo usuario 1</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.acceptButton}>
              <Ionicons name="checkmark" size={24} color="#183771" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton}>
              <Ionicons name="close" size={24} color="#183771" />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 40
  },
  banner: {
    backgroundColor: "#183771",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
  },
  acceptButton: {
    backgroundColor: "#FECEF1",
    borderRadius: 20,
    padding: 8,
    marginRight: 5,
  },
  rejectButton: {
    backgroundColor: "#F05A7E",
    borderRadius: 20,
    padding: 8,
  },
});