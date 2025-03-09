import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./ArtistDetail.styles";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "@/app/_layout";
import { getArtistById } from "../../../services/ArtistService";
import { getWorksDoneByArtist } from "../../../services/WorksDoneService";

export default function ArtistDetailScreen({ route }: any) {
  const BASE_URL = "http://localhost:8080";
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const { artistId } = route.params;

  const [artist, setArtist] = useState<any>(null);
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const artistData = await getArtistById(artistId);
      setArtist(artistData);
      const worksData = await getWorksDoneByArtist(artistId);
      setWorks(worksData);
      setLoading(false);
    };
    fetchData();
  }, [artistId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Información del artista */}
      <View style={styles.header}>
        <Image
          source={{ uri: `${BASE_URL}${artist?.image}` }}
          style={styles.artistImage}
        />
        <View style={styles.artistDetails}>
          <Text style={styles.artistName}>{artist?.username}</Text>
          <Text style={styles.artistDescription}>{artist?.description}</Text>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("RequestCommission", { artistId: artist?.id })
          }
        >
          <Text style={styles.buttonText}>Solicitar trabajo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Añadir a favoritos</Text>
        </TouchableOpacity>
      </View>

      {/* Obras del artista */}
      <View style={styles.artworksContainer}>
        <Text style={styles.artworksTitle}>Obras del artista</Text>
        <View style={styles.artworksList}>
          {works?.map((work: any) => (
            <View key={work.id} style={styles.artworkItem}>
              <Image
                source={{ uri: `${BASE_URL}${work.image}` }}
                style={styles.artworkImage}
              />
              <Text style={styles.artworkTitle}>{work.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
