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

  const firstFourArtists = useMemo(() => {
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
            {firstFourArtists.map((artist) => (
              <TouchableOpacity key={artist.id} style={styles.artistCard}>
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
const mobileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    marginBottom: 10,
  },
  topSectionText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#000000",
    fontFamily: "Merriweather-Bold",
    paddingLeft: 26,
  },
  topSectionSecondText: {
    fontFamily: "Merriweather-Italic",
    fontSize: 14,
    color: "#666",
  },
  topSectionRight: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 26,
  },

  middleSection: {
    paddingBottom: 16,
  },
  worksScrollContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    marginTop: 18,
  },
  workItem: {
    width: 260,
    marginRight: 35,
  },
  workImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  workTextContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  workTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 2,
    fontFamily: "Merriweather-Bold",
  },
  workArtist: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    fontFamily: "Merriweather-Bold",
    marginBottom: 2,
  },
  workSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Merriweather-Italic",
    color: "#777",
  },

  bottomSection: {
    paddingTop: 20,
    paddingBottom: 40,
    backgroundColor: "#F4F4F2",
  },
  bottomSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  bottomSectionHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Merriweather-Bold",
    paddingLeft: 26,
  },
  artistsContainer: {
    flexDirection: "column",
    paddingHorizontal: 50,
    marginVertical: 10,
  },

  artistCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F2",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  artistImage: {
    width: 80,
    height: 80,
    resizeMode: "cover",
    marginRight: 16,
    backgroundColor: "#DDD",
  },

  artistTextContainer: {
    flex: 1,
    justifyContent: "center",
  },

  artistName: {
    fontFamily: "Merriweather-Regular",
    fontSize: 16,
    color: "#222",
    marginBottom: 2,
  },

  artistLocation: {
    fontFamily: "Merriweather-Italic",
    fontSize: 12,
    color: "#666",
  },
});

const desktopStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topSection: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 250,
    marginTop: 50,
  },
  topSectionText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Merriweather",
  },
  topSectionSecondText: {
    fontFamily: "Merriweather-Italic",
    fontSize: 14,
    color: "#666",
  },
  topSectionRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  middleSection: {
    height: "80%",
    marginTop: 45,
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
  },
  workImage: {
    width: "auto",
    height: "80%",
    padding: 10,
    resizeMode: "contain",
  },
  workTextContainer: {
    marginBottom: 60,
  },
  workTitle: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Merriweather-Bold",
    color: "#222",
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  workArtist: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Merriweather",
    color: "#555",
    marginBottom: 2,
    paddingHorizontal: 4,
  },
  workSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: "#777",
    paddingHorizontal: 4,
  },

  bottomSection: {
    backgroundColor: "#F4F4F2",
    paddingVertical: 10,
    alignItems: "center",
    margin: 10,
  },
  bottomSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 16,
  },
  bottomSectionHeaderText: {
    marginLeft: 245,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    fontFamily: "Merriweather-Regular",
  },
  artistsScrollContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  artistCard: {
    width: 280,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F4F2",
    marginBottom: 25,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    marginHorizontal: 10,
  },
  artistImage: {
    width: 70,
    height: 70,
    resizeMode: "cover",
    marginRight: 16,
    backgroundColor: "#DDD",
  },
  artistTextContainer: {
    flex: 1,
  },
  artistName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  artistLocation: {
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
  },

  artistsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});
