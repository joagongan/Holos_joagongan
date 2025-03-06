import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RootDrawerParamList } from "@/app/_layout";
import { DrawerNavigationProp } from "@react-navigation/drawer";

const ALL_WORKS = [
  {
    id: 1,
    name: "Obra 1",
    description: "Descripción de la Obra 1",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063", // Pintura abstracta
    price: 100,
    artist: { id: 10, name: "John Doe" },
  },
  {
    id: 2,
    name: "Obra 2",
    description: "Descripción de la Obra 2",
    image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb", // Paisaje
    price: 200,
    artist: { id: 11, name: "Alice" },
  },
  {
    id: 3,
    name: "Obra 3",
    description: "Descripción de la Obra 3",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b", // Arte moderno
    price: 300,
    artist: { id: 12, name: "Bob" },
  },
  {
    id: 4,
    name: "Obra 4",
    description: "Descripción de la Obra 4",
    image: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42", // Retrato clásico
    price: 400,
    artist: { id: 13, name: "Charlie" },
  },
  {
    id: 5,
    name: "Obra 5",
    description: "Descripción de la Obra 5",
    image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664", // Pintura al óleo
    price: 250,
    artist: { id: 14, name: "Diana" },
  },
  {
    id: 6,
    name: "Obra 6",
    description: "Descripción de la Obra 6",
    image: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3", // Arte contemporáneo
    price: 180,
    artist: { id: 15, name: "Eve" },
  },
  {
    id: 7,
    name: "Obra 7",
    description: "Descripción de la Obra 7",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93", // Arte colorido
    price: 350,
    artist: { id: 16, name: "Frank" },
  },
  {
    id: 8,
    name: "Obra 8",
    description: "Descripción de la Obra 8",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", // Pintura minimalista
    price: 120,
    artist: { id: 17, name: "Georgia" },
  },
];

export default function WorkDetailScreen() {
  const route = useRoute();
  const { workId } = route.params as { workId: number };

  type ExploreNavProp = DrawerNavigationProp<RootDrawerParamList, "WorkDetail">;
  const navigation = useNavigation<ExploreNavProp>();

  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Detectar tamaño de pantalla
  const screenWidth = Dimensions.get("window").width;
  // Decidimos que, si es >= 1024, lo tratamos como "pantalla grande"
  const isLargeScreen = screenWidth >= 1024;

  useEffect(() => {
    const found = ALL_WORKS.find((w) => w.id === workId);
    setWork(found || null);
    setLoading(false);
  }, [workId]);

  const handleBackPress = () => {
    navigation.navigate("Inicio");
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#173F8A" />
      </View>
    );
  }

  // Estilos que se adaptan según el breakpoint isLargeScreen
  // Aquí ajustas tamaños y disposición "row" vs "column"
  const dynamicStyles = StyleSheet.create({
    scrollContent: {
      flexGrow: 1,
      paddingVertical: isLargeScreen ? 30 : 20,
    },
    header: {
      paddingHorizontal: isLargeScreen ? 40 : 20,
      marginBottom: isLargeScreen ? 20 : 10,
    },
    backText: {
      fontSize: isLargeScreen ? 24 : 18,
      color: "#173F8A",
      fontWeight: "700",
    },
    contentContainer: {
      flexDirection: isLargeScreen ? "row" : "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingHorizontal: isLargeScreen ? 80 : 20,
      paddingTop: isLargeScreen ? 10 : 0,
    },
    imageContainer: {
      // Para pantallas grandes, imagen grande y a la izquierda
      // Para pantallas pequeñas, ocupa todo el ancho y menos altura
      width: isLargeScreen ? 800 : "100%",
      height: isLargeScreen ? 800 : 300,
      backgroundColor: "#FFF",
      borderRadius: 12,
      marginRight: isLargeScreen ? 40 : 0,
      marginBottom: isLargeScreen ? 0 : 20, // Para que haya espacio debajo en pantallas pequeñas
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 6,
      overflow: "hidden",
      marginTop: isLargeScreen ? 0 : 20,
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
    placeholder: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#E0E0E0",
    },
    infoContainer: {
      flex: 1,
      justifyContent: "flex-start",
      marginLeft: isLargeScreen ? 90 : 0,
      width: isLargeScreen ? "auto" : "100%",
      alignSelf: "center",
    },
    title: {
      fontSize: isLargeScreen ? 36 : 26,
      fontWeight: "700",
      color: "#173F8A",
      marginBottom: isLargeScreen ? 80 : 5,
      textAlign: "left",
    },
    label: {
      fontSize: isLargeScreen ? 22 : 18,
      fontWeight: "700",
      color: "#173F8A",
      marginTop: isLargeScreen ? 40 : 20,
      marginBottom: 6,
      textAlign: "left",
    },
    description: {
      fontSize: isLargeScreen ? 18 : 16,
      color: "#4A4A4A",
      lineHeight: isLargeScreen ? 26 : 22,
      marginBottom: 16,
      textAlign: "left",
    },
    price: {
      fontSize: isLargeScreen ? 24 : 20,
      fontWeight: "700",
      color: "#000",
      marginTop: 6,
      marginBottom: isLargeScreen ? 30 : 20,
      textAlign: "left",
    },
    buttonColumn: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    messageButton: {
      width: isLargeScreen ? 600 : "100%",
      backgroundColor: "#FFD5EB",
      paddingVertical: 16,
      borderRadius: 8,
      marginBottom: 16,
    },
    messageButtonText: {
      color: "#173F8A",
      fontSize: isLargeScreen ? 16 : 14,
      fontWeight: "700",
      textAlign: "center",
    },
    buyButton: {
      width: isLargeScreen ? 600 : "100%",
      backgroundColor: "#173F8A",
      paddingVertical: 16,
      borderRadius: 8,
    },
    buyButtonText: {
      color: "#FFF",
      fontSize: isLargeScreen ? 16 : 14,
      fontWeight: "700",
      textAlign: "center",
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={dynamicStyles.scrollContent}
    >
      {/* Encabezado con flecha y texto para volver */}
      <View style={dynamicStyles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Text style={dynamicStyles.backText}>← VOLVER AL PERFIL</Text>
        </TouchableOpacity>
      </View>

      {/* Contenedor principal */}
      <View style={dynamicStyles.contentContainer}>
        {/* Imagen con sombra */}
        <View style={dynamicStyles.imageContainer}>
          {work?.image ? (
            <Image source={{ uri: work.image }} style={dynamicStyles.image} />
          ) : (
            <View style={dynamicStyles.placeholder}>
              <Text style={{ color: "#aaa" }}>Sin imagen</Text>
            </View>
          )}
        </View>

        {/* Información de la obra */}
        <View style={dynamicStyles.infoContainer}>
          <Text style={dynamicStyles.title}>
            {work?.name?.toUpperCase() || "TÍTULO OBRA"}
          </Text>

          <Text style={dynamicStyles.label}>DESCRIPCIÓN:</Text>
          <Text style={dynamicStyles.description}>
            {work?.description || "Sin descripción disponible"}
          </Text>

          <Text style={dynamicStyles.label}>PRECIO:</Text>
          <Text style={dynamicStyles.price}>
            {work?.price ? `${work.price} €` : "No disponible"}
          </Text>

          {/* Botones en columna */}
          <View style={dynamicStyles.buttonColumn}>
            <TouchableOpacity style={dynamicStyles.messageButton}>
              <Text style={dynamicStyles.messageButtonText}>
                MANDAR UN MENSAJE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={dynamicStyles.buyButton}>
              <Text style={dynamicStyles.buyButtonText}>COMPRAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
