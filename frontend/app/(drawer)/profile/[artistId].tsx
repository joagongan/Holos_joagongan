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

import { Artist } from "@/src/constants/CommissionTypes";
import { decodeImagePath } from "@/src/services/ExploreWorkHelpers";

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
          artistData.baseUser.username
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
                {artist?.name || "Eugenia Cohen"}
              </Text>
              <Text style={styles.artistLocation}>
                {artist?.location || "Pintora, Amsterdam"}
              </Text>
            </View>
          </View>

          {/* Columna derecha: Descripción */}
          <View style={styles.topRight}>
            <Text style={styles.descriptionTitle}>Descripción</Text>
            <Text style={styles.descriptionText}>
              {artist?.description ||
                `Artista visual apasionada por la expresión a través del color y la textura.
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

const styles = StyleSheet.create({
  /* CONTENEDOR GENERAL */
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  backArrow: {
    fontSize: 15,
    marginRight: 5,
    transform: [{ translateY: -3 }],
  },
  backText: {
    fontFamily: "Merriweather-Regular",
    fontSize: 15,
    marginLeft: 5,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    margin: 8,
    marginBottom: 20,
  },

  /* SECCIÓN SUPERIOR */
  topContainer: {
    flexDirection: "row",
    marginBottom: 0,
  },

  /* Perfil (columna izquierda) */
  profileContainer: {
    height: 250,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    width: "40%",
    marginHorizontal: 80,
  },
  profileImage: {
    height: "100%",
    resizeMode: "contain",
    marginRight: 16,
  },
  profileTextContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 16,
    marginRight: 16,
  },
  artistName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
    fontFamily: "Merriweather",
  },
  artistLocation: {
    fontSize: 18,
    color: "#666",
    fontFamily: "Merriweather",
  },

  /* Descripción (columna derecha) */
  topRight: {
    flex: 1,
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
    fontFamily: "Merriweather",
  },
  descriptionText: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: 30,
    fontFamily: "Merriweather",
    color: "#65635F",
    paddingRight: 20,
  },

  /* BOTÓN */
  button: {
    backgroundColor: "#3E334E",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 24,
    marginTop: 16,
    marginLeft: 80,
    width: "40%",
  },
  buttonText: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
  },

  /* SECCIÓN INFERIOR: SCROLL HORIZONTAL */
  bottomContainer: {
    height: 250,
  },
  worksScrollContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  workItem: {
    width: 220,
    height: "100%",
    marginRight: 90,
    backgroundColor: "#FFF",
    overflow: "hidden",
    borderRadius: 8,
  },
  workImage: {
    width: "100%",
    height: "80%",
    padding: 10,
    resizeMode: "contain",
  },
  workTextContainer: {
    paddingHorizontal: 4,
    paddingBottom: 10,
  },
  workTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  workArtist: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  workSubtitle: {
    fontSize: 12,
    fontWeight: "400",
  },
});
