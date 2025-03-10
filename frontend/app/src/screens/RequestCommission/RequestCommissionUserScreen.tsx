import React,  { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Platform, useWindowDimensions, ActivityIndicator } from "react-native";
import { styles } from "./RequestCommissionUserScreen.styles";
import { ScrollView } from "react-native-gesture-handler";
import UserPanel from "./UserPanel";
import RequestForm from "./form/RequestForm";
import { getArtistById } from "@/app/services/ArtistService";

const avatarArtist = "https://static.vecteezy.com/system/resources/previews/013/659/054/non_2x/human-avatar-user-ui-account-round-clip-art-icon-vector.jpg";
const commissionTablePrice = "../../../../assets/images/image.png";

export default function RequestCommissionUserScreen ({ route }: any) {
  const BASE_URL = "http://localhost:8080";
  const { artistId } = route.params as { artistId: number };
  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
        const artistData = await getArtistById(artistId);
        setArtist(artistData);
        setLoading(false);
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
      
      <UserPanel artist={artist} />
      
      <View style={styles.commissionContainer}>
        <Text style={styles.commissionTitle}>Commission Prices</Text>
        <Image source={require(commissionTablePrice)} resizeMode="contain" />
      </View>
      
      <RequestForm artist={artist} />

    </ScrollView>
  );
    
};

