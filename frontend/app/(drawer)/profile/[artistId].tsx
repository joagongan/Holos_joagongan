import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFonts } from "expo-font";

import { getArtistById } from "@/src/services/artistApi";
import { getWorksDoneByArtist } from "@/src/services/WorksDoneApi";
import LoadingScreen from "@/src/components/LoadingScreen";

import { Artist } from "@/src/constants/ExploreTypes";
import { decodeImagePath } from "@/src/services/ExploreWorkHelpers";
import styles from "@/src/styles/ArtistDetail.styles";

interface Artwork {
  id: number;
  name: string;
  image: string;
  artistName?: string;
  description?: string;
}

// Componente que calcula dinámicamente la relación de aspecto
const ProfileImage = ({ uri }: { uri: string }) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  useEffect(() => {
    if (uri) {
      Image.getSize(
        uri,
        (width, height) => setAspectRatio(width / height),
        (error) => {
          console.error("Error al obtener dimensiones:", error);
          setAspectRatio(1);
        }
      );
    }
  }, [uri]);

  return (
    <Image source={{ uri }} style={[styles.profileImage, { aspectRatio }]} />
  );
};

export default function ArtistDetailScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { artistId } = useLocalSearchParams<{ artistId: string }>();

  const [artist, setArtist] = useState<Artist | null>(null);
  const [works, setWorks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuVisibleId, setMenuVisibleId] = useState<number | null>(null);

  const [fontsLoaded] = useFonts({
    "Merriweather-Regular": require("../../../assets/fonts/Merriweather_24pt-Regular.ttf"),
    "Merriweather-Italic": require("../../../assets/fonts/Merriweather_24pt-Italic.ttf"),
    "Merriweather-Bold": require("../../../assets/fonts/Merriweather_24pt-Bold.ttf"),
    "Merriweather-BoldItalic": require("../../../assets/fonts/Merriweather_24pt-BoldItalic.ttf"),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artistData: Artist = await getArtistById(Number(artistId));
        setArtist(artistData);

        const worksData: Artwork[] = await getWorksDoneByArtist(
          artistData.baseUser?.username || ""
        );
        setWorks(worksData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [artistId]);

  useEffect(() => {
    navigation.setOptions({ title: "Perfil de Artista" });
  }, [navigation]);

  if (!fontsLoaded || loading) {
    return <LoadingScreen />;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (menuVisibleId !== null) {
          setMenuVisibleId(null);
        }
      }}
    >
      <ScrollView style={styles.container}>
        {/* Botón "Atrás" */}
        <TouchableOpacity
          onPress={() => router.push("/explore")}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>ATRÁS</Text>
        </TouchableOpacity>

        {/* Línea horizontal debajo de "Atrás" */}
        <View style={styles.divider} />

        {/* Sección superior dividida en dos columnas */}
        <View style={styles.topContainer}>
          {/* Columna izquierda: Perfil */}
          <View style={styles.profileContainer}>
            <ProfileImage
              uri={
                artist?.baseUser?.imageProfile
                  ? decodeImagePath(artist.baseUser.imageProfile)
                  : "https://via.placeholder.com/150"
              }
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.artistName}>
                {artist?.baseUser?.username || "Eugenia Cohen"}
              </Text>
            </View>
          </View>

          {/* Columna derecha: Descripción */}
          <View style={styles.topRight}>
            <Text style={styles.descriptionTitle}>Descripción</Text>
            <Text style={styles.descriptionText}>
              {`Artista visual apasionada por la expresión a través del color y la textura.
Su obra fusiona emoción y técnica, explorando desde lo abstracto hasta lo figurativo.
Con cada pincelada, busca capturar la vida y transmitir historias que invitan a reflexionar
sobre las realidades cotidianas.`}
            </Text>
          </View>
        </View>

        {/* Botón para solicitar trabajo personalizado */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push(`/commissions/request/${artist?.baseUser?.username}`)
          }
        >
          <Text style={styles.buttonText}>Solicitar Trabajo Personalizado</Text>
        </TouchableOpacity>

        {/* Sección inferior: scroll horizontal de obras */}
        <View style={styles.bottomContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.worksScrollContainer}
          >
            {works.map((work) => (
              <TouchableOpacity
                key={work.id}
                style={styles.workItem}
                onPress={() =>
                  router.push({
                    pathname: "/work/[workId]",
                    params: { workId: String(work.id) },
                  })
                }
              >
                <Image
                  source={{ uri: decodeImagePath(work.image) }}
                  style={styles.workImage}
                />
                <View style={styles.workTextContainer}>
                  <Text style={styles.workTitle}>{work.name}</Text>
                  <Text style={styles.workArtist}>{work.artistName}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
