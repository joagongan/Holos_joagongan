import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { styles } from "./RequestCommissionUserScreen.styles";
import UserPanel from "./UserPanel";
import RequestForm from "./form/RequestForm";
import { getArtistById } from "@/app/services/ArtistService";
import { Artist } from "./CommissionTypes";

const commissionTablePrice = "../../../../assets/images/image.png";

export default function RequestCommissionUserScreen({ route }: any) {
  const { artistId } = route.params as { artistId: number };
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!artistId) {
      console.error("Artist ID is undefined!");
      return;
    }

    const fetchData = async () => {
      try {
        const artistData: Artist = await getArtistById(artistId);
        setArtist(artistData);
      } catch (error) {
        console.error("Error fetching artist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [artistId]);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {artist && <UserPanel artist={artist} />}

      <View style={styles.commissionContainer}>
        <Text style={styles.commissionTitle}>Commission Prices</Text>
        <Image source={require(commissionTablePrice)} resizeMode="contain" />
      </View>

      {artist && <RequestForm artist={artist} />}
    </ScrollView>
  );
}
