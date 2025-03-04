import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function RequestCommissionUserScreen ({ navigation }) {
      
  return (
    <View style={styles.container}>
    {/* Título de la pagina */}
    <View style={styles.banner}>
      <Text style={styles.bannerText}>SOLICITUD DE TRABAJO PERSONALIZADO</Text>
    </View>

    {/* Contenedor del artista y de los precios de las comisiones*/}
    <View style={styles.content}>
      {/* Sección artista */}
      <View style={styles.artistSection}>
        <Text style={styles.labelArtist}>ARTISTA:</Text>
        <View style={styles.artistContainer}>
          <Image 
            source={{ uri: "https://static.vecteezy.com/system/resources/previews/013/659/054/non_2x/human-avatar-user-ui-account-round-clip-art-icon-vector.jpg" }} 
            style={styles.artistImage} 
          />
        </View>
      </View>

      {/* Tabla de comisiones (Imagen) */}
      <View style={styles.commissionTable}>
        <Image 
          source={require("../../../assets/images/image.png")} 
          style={styles.commissionImage} 
        />
      </View>
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
        },

    content: {
        flexDirection: "row",
        width: "100%",
        height:"40%",
        marginTop: 10
         },

      artistSection: {
        width: "25%",
        backgroundColor: "#FFD9F2",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
        },

    labelArtist: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#000",
        marginBottom: 10
        },

    artistContainer: {
        backgroundColor: "#FFFFFF",
        width: "40%",
        height: "70%",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
        },

    artistImage: {
        width: "70%",
        height: "70%",
        resizeMode: "contain"
        },

    commissionTable: {
        flex:2,
        backgroundColor: "#F8D7FF",
        marginLeft: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
        },

    commissionImage: {
        width: "90%",
        height: "100%",
        resizeMode: "contain"
        }
 
});
