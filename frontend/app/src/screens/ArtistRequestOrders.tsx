import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const isBigScreen = width >= 1024;

const MOBILE_PROFILE_ICON_SIZE = 40;
const MOBILE_CARD_PADDING = 12;

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
          <Image source={{ uri: 'https://picsum.photos/200/300?grayscale' }} style={styles.profileIcon} />          
          <View style={styles.textContainer}>
            <Text style={styles.text}>Solicitud de nuevo usuario 1</Text>
            <Text style={styles.text}>Descripción: Paisaje hecho con aerografía</Text>
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

        <View style={styles.card}>
          <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={styles.profileIcon} />          
          <View style={styles.textContainer}>
            <Text style={styles.text}>Solicitud de nuevo usuario 2</Text>
            <Text style={styles.text}>Descripción: Retrato expresivo en óleo sobre lienzo</Text>
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
        <View style={styles.card}>
          <Image source={{ uri: 'https://picsum.photos/id/16/200/300' }} style={styles.profileIcon} />          
          <View style={styles.textContainer}>
            <Text style={styles.text}>Solicitud de nuevo usuario 3</Text>
            <Text style={styles.text}>Descripción: Cuadro abstracto con pintura acrílica</Text>
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

        <Text style={styles.sectionTitle}>SOLICITUDES ACEPTADAS/DENEGADAS</Text>

        <View style={styles.card}>
          <Image source={{ uri: 'https://picsum.photos/id/17/200/300' }} style={styles.profileIcon} />          
          <View style={styles.textContainer}>
            <Text style={styles.text}>usuario19239</Text>
            <Text style={styles.text}>Descripción: Paisaje con acuarela</Text>
          </View>
          
          <View style={styles.actions}>
            <Text> Solicitud aceptada</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Image source={{ uri: 'https://picsum.photos/id/50/200/300' }} style={styles.profileIcon} />          
          <View style={styles.textContainer}>
            <Text style={styles.text}>jdb2496</Text>
            <Text style={styles.text}>Descripción: Impresionismo con tinta china</Text>
          </View>
          
          <View style={styles.actions}>
            <Text> Solicitud denegada</Text>
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
    padding: isBigScreen? 40: 0,
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
    padding: isBigScreen ? 15 : MOBILE_CARD_PADDING,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileIcon: {
    width: isBigScreen ? 60 : MOBILE_PROFILE_ICON_SIZE,
    height: isBigScreen ? 60 : MOBILE_PROFILE_ICON_SIZE,
    backgroundColor: "#D9D9D9",
    borderRadius: 30,
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
