import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getAllWorksDone } from "@/src/services/WorksDoneApi";
import { BASE_URL } from "@/src/constants/api";
import { useFonts } from "expo-font";
import { desktopStyles, mobileStyles } from "@/src/styles/Explore.styles";

export interface BaseUser {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
  imageProfile?: string;
  createdUser: Date;
}

export interface Artist {
  id: number;
  name: string;
  username: string;
  email: string;
  phoneNumber?: string;
  imageProfile?: string;
  tableCommisionsPrice?: string;
  numSlotsOfWork: number;
  baseUser?: BaseUser;
}

export interface Work {
  id: number;
  name: string;
  description: string;
  price: number;
  artist: Artist;
  image: string;
}

export default function ThreeRowsScreen() {
  const [fontsLoaded] = useFonts({
    "Merriweather-Regular": require("../../../assets/fonts/Merriweather_24pt-Regular.ttf"),
    "Merriweather-Italic": require("../../../assets/fonts/Merriweather_24pt-Italic.ttf"),
    "Merriweather-Bold": require("../../../assets/fonts/Merriweather_24pt-Bold.ttf"),
    "Merriweather-BoldItalic": require("../../../assets/fonts/Merriweather_24pt-BoldItalic.ttf"),
  });

  const [works, setWorks] = useState<Work[]>([]);
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;
  const styles = isDesktop ? desktopStyles : mobileStyles;

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await getAllWorksDone();
        const transformedData = data.map((work) => ({
          ...work,
          artist: {
            ...work.artist,
            baseUser: {
              ...work.artist.baseUser,
              createdUser: new Date(work.artist.baseUser.createdUser),
            },
          },
        }));
        setWorks(transformedData);
      } catch (error) {
        console.error("Error fetching works: ", error);
      }
    };
    fetchWorks();
  }, []);

  const firstThreeArtists = useMemo(() => {
    const uniqueArtistsMap = new Map<number, Artist>();
    works.forEach((work) => {
      if (work.artist && !uniqueArtistsMap.has(work.artist.id)) {
        uniqueArtistsMap.set(work.artist.id, work.artist);
      }
    });
    return Array.from(uniqueArtistsMap.values()).slice(0, 3);
  }, [works]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.topSectionText}>Obras</Text>
          <View style={styles.topSectionRight}>
            <Text style={styles.topSectionSecondText}>Desliza</Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#666"
              style={{ marginLeft: 4 }}
            />
          </View>
        </View>
        <View style={styles.middleSection}>
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
                  source={{ uri: `${BASE_URL}${work.image}` }}
                  style={styles.workImage}
                />
                <View style={styles.workTextContainer}>
                  <Text style={styles.workTitle}>{work.name}</Text>
                  <Text style={styles.workArtist}>
                    {work.artist?.username ?? "Artista desconocido"}
                  </Text>
                  <Text style={styles.workSubtitle}>{work.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.bottomSectionHeader}>
            <Text style={styles.bottomSectionHeaderText}>ARTISTAS</Text>
          </View>
          <View style={styles.artistsContainer}>
            {firstThreeArtists.map((artist) => (
              <TouchableOpacity
                key={artist.id}
                style={styles.artistCard}
                onPress={() =>
                  router.push({
                    pathname: "/profile/[artistId]",
                    params: { artistId: String(artist.id) },
                  })
                }
              >
                <Image
                  source={{
                    uri: `${BASE_URL}${artist.baseUser?.imageProfile}`,
                  }}
                  style={styles.artistImage}
                />
                <View style={styles.artistTextContainer}>
                  <Text style={styles.artistName}>{artist.username}</Text>
                  <Text style={styles.artistLocation}>Painter, Amsterdam</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
