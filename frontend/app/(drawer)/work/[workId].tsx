import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useLocalSearchParams, useRouter } from "expo-router";
import { getWorksDoneById } from "@/src/services/WorksDoneApi";
import staticStyles, { createDynamicStyles } from "@/src/styles/WorkDetail.styles";
import { BASE_URL } from "@/src/constants/api";
import { BaseUser } from "@/src/constants/ExploreTypes";
import { WorksDone } from "@/src/constants/CommissionTypes";
import ReportDropdown from "@/src/components/report/ReportDropDown";
import { AuthenticationContext } from "@/src/contexts/AuthContext";

export default function WorkDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { workId } = useLocalSearchParams();

  const [work, setWork] = useState<WorksDone | null>(null);
  const [loading, setLoading] = useState(true);

  const screenWidth = Dimensions.get("window").width;
  const isLargeScreen = screenWidth >= 1024;
  const dynamicStyles = createDynamicStyles(isLargeScreen);

  const [menuVisibleId, setMenuVisibleId] = useState<number | null>(null);

  // Obtenemos el usuario autenticado para verificar si es dueño
  const { loggedInUser } = useContext(AuthenticationContext);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const data = (await getWorksDoneById(Number(workId))) as WorksDone;
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
    // Ajusta el título de la pantalla con el nombre de la obra
    if (work?.name) {
      navigation.setOptions({ title: work.name });
    }
  }, [navigation, work]);

  if (loading) {
    return (
      <View style={staticStyles.loaderContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  if (!work) {
    return (
      <View style={staticStyles.notFoundContainer}>
        <Text style={staticStyles.notFoundText}>No se encontró la obra</Text>
      </View>
    );
  }

  // Verificamos si el usuario logueado es el dueño de la obra
  // (asumiendo que loggedInUser.id coincide con artist.baseUser.id)
  const userIsOwner =
    loggedInUser &&
    work.artist &&
    work.artist.baseUser &&
    loggedInUser.id === work.artist.baseUser.id;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (menuVisibleId !== null) {
          setMenuVisibleId(null); // Cierra el menú al tocar fuera
        }
      }}
    >
      <ScrollView
        style={staticStyles.container}
        contentContainerStyle={dynamicStyles.scrollContent}
      >
        <View style={dynamicStyles.contentContainer}>
          {/* Imagen + menú de reportes */}
          <View style={[dynamicStyles.imageContainer, { position: "relative" }]}>
            {work.image ? (
              <Image
                source={{ uri: `${BASE_URL}${atob(work.image)}` }}
                style={dynamicStyles.image}
              />
            ) : (
              <View style={staticStyles.placeholder}>
                <Text style={{ color: "#aaa" }}>Sin imagen</Text>
              </View>
            )}

            {work.image && (
              <View style={staticStyles.reportDropdownContatiner}>
                <ReportDropdown
                  workId={work.id}
                  menuVisibleId={menuVisibleId}
                  setMenuVisibleId={setMenuVisibleId}
                  isBigScreen={false}
                />
              </View>
            )}
          </View>

          {/* Datos de la obra */}
          <View style={staticStyles.infoContainer}>
            <Text style={staticStyles.title}>
              {work.name ? work.name.toUpperCase() : "TÍTULO OBRA"}
            </Text>

            <Text style={dynamicStyles.label}>ARTISTA:</Text>
            <TouchableOpacity
              onPress={() => {
                if (work.artist && work.artist.id) {
                  router.push(`/profile/${work.artist.id}`);
                } else {
                  console.warn("No se encontró el artista");
                }
              }}
            >
              <Text style={dynamicStyles.artistName}>
                {work.artist?.baseUser?.username || "Artista desconocido"}
              </Text>
            </TouchableOpacity>

            <Text style={dynamicStyles.label}>DESCRIPCIÓN:</Text>
            <Text style={dynamicStyles.description}>
              {work.description || "Sin descripción disponible"}
            </Text>

            <Text style={staticStyles.label}>PRECIO:</Text>
            <Text style={staticStyles.price}>
              {work.price ? `${work.price} €` : "No disponible"}
            </Text>

            {/* Si el usuario es dueño de la obra, mostramos el botón "Actualizar" */}
            {userIsOwner && (
              <TouchableOpacity
                style={{
                  backgroundColor: "#007BFF",
                  padding: 10,
                  marginTop: 20,
                  borderRadius: 5,
                  alignItems: "center",
                }}
                onPress={() => {
                  router.push({
                    pathname: "/(drawer)/work/updateWorkArtist",
                    params: {
                      artistId: String(work.artist.id),
                      worksDoneId: String(work.id),
                      currentName: work.name,
                      currentDescription: work.description,
                      currentPrice: String(work.price),
                    },
                  });
                }}
              >
                <Text style={{ color: "#fff" }}>Actualizar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
