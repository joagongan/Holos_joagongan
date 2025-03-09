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
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "@/app/_layout";
import { getWorksDoneById } from "../../services/WorksDoneService";

export default function WorkDetailScreen() {
  // Base URL para construir la ruta completa de la imagen
  const BASE_URL = "http://localhost:8080";

  const route = useRoute();
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const { workId } = route.params as { workId: number };

  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Para distinguir si es pantalla pequeña o grande
  const screenWidth = Dimensions.get("window").width;
  const isMobile = screenWidth < 600;
  const isLargeScreen = screenWidth >= 1024;

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const data = await getWorksDoneById(workId);
        setWork(data);
      } catch (error) {
        console.error("Error fetching work details:", error);
        setWork(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWork();
  }, [workId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  // Estilos dinámicos según el breakpoint isLargeScreen
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
      fontSize: isLargeScreen ? 22 : 16,
      color: "#173F8A",
      fontWeight: "700",
    },
    contentContainer: {
      flexDirection: isLargeScreen ? "row" : "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingHorizontal: isLargeScreen ? 80 : 20,
      paddingTop: isLargeScreen ? 10 : 0,
      paddingBottom: 40,
    },
    imageContainer: {
      width: isLargeScreen ? 700 : "100%",
      height: isLargeScreen ? 700 : 300,
      backgroundColor: "#FFF",
      borderRadius: 12,
      marginRight: isLargeScreen ? 40 : 0,
      marginBottom: isLargeScreen ? 0 : 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
      overflow: "hidden",
      marginTop: isLargeScreen ? 0 : 20,
      alignSelf: "center",
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
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
      marginLeft: isLargeScreen ? 60 : 0,
      width: isLargeScreen ? "auto" : "100%",
      alignSelf: "center",
      marginTop: isLargeScreen ? 0 : 10,
    },
    title: {
      fontSize: isLargeScreen ? 32 : 24,
      fontWeight: "700",
      color: "#173F8A",
      marginBottom: isLargeScreen ? 40 : 10,
      textAlign: "left",
    },
    label: {
      fontSize: isLargeScreen ? 20 : 16,
      fontWeight: "700",
      color: "#173F8A",
      marginTop: isLargeScreen ? 30 : 20,
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
      fontSize: isLargeScreen ? 22 : 18,
      fontWeight: "700",
      color: "#000",
      marginTop: 6,
      marginBottom: isLargeScreen ? 30 : 20,
      textAlign: "left",
    },
    artistName: {
      fontSize: isLargeScreen ? 18 : 14,
      fontWeight: "700",
      color: "#173F8A",
      marginTop: 10,
      textAlign: "left",
    },
    buttonColumn: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    messageButton: {
      width: isLargeScreen ? 350 : "100%",
      backgroundColor: "#FFD5EB",
      paddingVertical: 14,
      borderRadius: 8,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    messageButtonText: {
      color: "#173F8A",
      fontSize: isLargeScreen ? 16 : 14,
      fontWeight: "700",
      textAlign: "center",
    },
    buyButton: {
      width: isLargeScreen ? 350 : "100%",
      backgroundColor: "#173F8A",
      paddingVertical: 14,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
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
      {/* Contenedor principal */}
      <View style={dynamicStyles.contentContainer}>
        {/* Imagen con sombra */}
        <View style={dynamicStyles.imageContainer}>
          {work?.image ? (
            <Image
              source={{ uri: `${BASE_URL}${work.image}` }}
              style={dynamicStyles.image}
            />
          ) : (
            // Si no hay imagen, un placeholder
            <View style={styles.placeholder}>
              <Text style={{ color: "#aaa" }}>Sin imagen</Text>
            </View>
          )}
        </View>

        {/* Información de la obra */}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>
            {work.name?.toUpperCase() || "TÍTULO OBRA"}
          </Text>

          <Text style={dynamicStyles.label}>ARTISTA:</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ArtistDetail", { artistId: work?.artist.id })
            }
          >
            <Text style={dynamicStyles.artistName}>
              {work?.artist?.username || "Artista desconocido"}
            </Text>
          </TouchableOpacity>

          <Text style={dynamicStyles.label}>DESCRIPCIÓN:</Text>
          <Text style={dynamicStyles.description}>
            {work?.description || "Sin descripción disponible"}
          </Text>

          <Text style={styles.label}>PRECIO:</Text>
          <Text style={styles.price}>
            {work.price ? `${work.price} €` : "No disponible"}
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageButtonText}>MANDAR UN MENSAJE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => {
                navigation.navigate("Payment", {
                  workId: work.id,
                  price: work.price,
                });
              }}
            >
              <Text style={styles.buyButtonText}>COMPRAR</Text>
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
    backgroundColor: "#FFF7F9", // Fondo pastel rosado muy suave
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF7F9",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF7F9",
  },
  notFoundText: {
    fontSize: 18,
    color: "#666",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFF7F9",
  },
  backText: {
    fontSize: 16,
    color: "#173F8A",
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "flex-start",
  },
  imageContainer: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1.2,
    resizeMode: "cover",
    borderRadius: 8,
  },
  placeholder: {
    backgroundColor: "#eee",
    width: "100%",
    aspectRatio: 1.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#173F8A",
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#173F8A",
    marginTop: 14,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#4A4A4A",
    lineHeight: 20,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 6,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  messageButton: {
    backgroundColor: "#FFD5EB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  messageButtonText: {
    color: "#173F8A",
    fontSize: 14,
    fontWeight: "600",
  },
  buyButton: {
    backgroundColor: "#173F8A",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buyButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
});
