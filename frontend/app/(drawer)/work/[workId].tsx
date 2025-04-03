import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useLocalSearchParams, useRouter } from "expo-router";
import { BASE_URL } from "@/src/constants/api";
import { useFonts } from "expo-font";
import { WorksDoneDTO } from "@/src/constants/ExploreTypes";
import { mobileStyles, desktopStyles } from "@/src/styles/WorkDetail.styles";

// Importa el nuevo endpoint que retorna el DTO
import { getWorksDoneByIdDTO } from "@/src/services/WorksDoneApi";

// Función para decodificar la imagen (asegúrate de tenerla implementada en tu helper)
import { decodeImagePath } from "@/src/services/ExploreWorkHelpers";

export default function WorkDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { workId } = useLocalSearchParams();
  const [work, setWork] = useState<WorksDoneDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const styles = width > 768 ? desktopStyles : mobileStyles;

  const [fontsLoaded] = useFonts({
    "Merriweather-Regular": require("../../../assets/fonts/Merriweather_24pt-Regular.ttf"),
    "Merriweather-Italic": require("../../../assets/fonts/Merriweather_24pt-Italic.ttf"),
    "Merriweather-Bold": require("../../../assets/fonts/Merriweather_24pt-Bold.ttf"),
    "Merriweather-BoldItalic": require("../../../assets/fonts/Merriweather_24pt-BoldItalic.ttf"),
  });

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const data = await getWorksDoneByIdDTO(Number(workId));
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

  useEffect(() => {
    navigation.setOptions({ title: work?.name || "Detalle de obra" });
  }, [navigation, work]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  if (!work) {
    return (
      <View style={styles.notFoundContainer}>
        <Text>No se encontró la obra</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        {/* Columna izquierda con la imagen */}
        <View style={styles.leftColumn}>
          <Image
            source={{ uri: decodeImagePath(work.image) }}
            style={styles.imageStyle}
          />
        </View>

        {/* Columna derecha con la información */}
        <ScrollView style={styles.rightColumn}>
          <TouchableOpacity
            onPress={() => router.push(`/explore`)}
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>ATRÁS</Text>
          </TouchableOpacity>

          <View style={styles.informationContainer}>
            <Text style={styles.title}>
              {work.name ? work.name.toUpperCase() : "TÍTULO OBRA"}
            </Text>

            <Text
              onPress={() => router.push(`/profile/${work.artistId}`)}
              style={styles.artistText}
            >
              {work.artistName}
            </Text>

            <Text style={styles.infoText}>
              {work.description || "Sin descripción disponible"}
            </Text>

            <View style={styles.separator} />

            {/* Contenedor para el precio y el botón de reportar */}
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {work.price ? `${work.price} €` : "No disponible"}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/report/[reportId]",
                    params: { reportId: String(workId) },
                  })
                }
              >
                <Text style={styles.reportButtonText}>REPORTAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}
