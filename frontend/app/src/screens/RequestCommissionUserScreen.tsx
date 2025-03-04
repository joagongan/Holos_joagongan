import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function RequestCommissionUserScreen ({ navigation }) {

    
      
  return (
    <View style={styles.container}>
    {/* Título de la pagina */}
    <View style={styles.banner}>
      <Text style={styles.bannerText}>SOLICITUD DE TRABAJO PERSONALIZADO</Text>
    </View>

  
  </View>
);
    
};

const styles = StyleSheet.create({
    container: {
        flex:2,
        backgroundColor: "#FFF",
        padding: 40
        },

    banner: {
        backgroundColor: "#173C75",
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center"
        },

    bannerText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 55
        }
});
