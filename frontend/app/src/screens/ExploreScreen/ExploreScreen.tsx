import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  LayoutChangeEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ExploreScreen.styles";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Artist {
  id: number;
  name: string;
  image: string;
}

export default function ExploreScreen() {
  const [searchText, setSearchText] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const [containerWidth, setContainerWidth] = useState(0);

  const isBigScreen = containerWidth >= 1024;

  const COLUMNS = isBigScreen ? 5 : 4;
  const GAP = isBigScreen ? 24 : 16;
  const horizontalPadding = isBigScreen ? 48 : 32;

  const itemWidth = containerWidth
    ? (containerWidth - horizontalPadding - GAP * (COLUMNS - 1)) / COLUMNS
    : 0;

  // Ejemplo de datos
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Pintura", image: "https://picsum.photos/200?random=1" },
    { id: 2, name: "Escultura", image: "https://picsum.photos/200?random=2" },
    { id: 3, name: "Fotografía", image: "https://picsum.photos/200?random=3" },
    { id: 4, name: "Dibujo", image: "https://picsum.photos/200?random=4" },
    { id: 5, name: "Grabado", image: "https://picsum.photos/200?random=5" },
    { id: 6, name: "Diseño", image: "https://picsum.photos/200?random=6" },
    { id: 7, name: "Street Art", image: "https://picsum.photos/200?random=7" },
    {
      id: 8,
      name: "Arte Digital",
      image: "https://picsum.photos/200?random=8",
    },
    { id: 9, name: "Muralismo", image: "https://picsum.photos/200?random=9" },
    {
      id: 10,
      name: "Caligrafía",
      image: "https://picsum.photos/200?random=10",
    },
    {
      id: 11,
      name: "Instalación",
      image: "https://picsum.photos/200?random=11",
    },
    {
      id: 12,
      name: "Performance",
      image: "https://picsum.photos/200?random=12",
    },
  ]);

  const [newArtists, setNewArtists] = useState<Artist[]>([
    { id: 1, name: "Artista 1", image: "https://picsum.photos/200?random=13" },
    { id: 2, name: "Artista 2", image: "https://picsum.photos/200?random=14" },
    { id: 3, name: "Artista 3", image: "https://picsum.photos/200?random=15" },
    { id: 4, name: "Artista 4", image: "https://picsum.photos/200?random=16" },
    { id: 5, name: "Artista 5", image: "https://picsum.photos/200?random=17" },
    { id: 6, name: "Artista 6", image: "https://picsum.photos/200?random=18" },
    { id: 7, name: "Artista 7", image: "https://picsum.photos/200?random=19" },
    { id: 8, name: "Artista 8", image: "https://picsum.photos/200?random=20" },
  ]);

  useEffect(() => {
    // Aquí irían las llamadas reales a tu backend
  }, []);

  const handleLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setContainerWidth(width);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const categoriesToShow = isBigScreen ? 5 : 4;
  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, categoriesToShow);

  return (
    <ScrollView style={styles.container} onLayout={handleLayout}>
      <TextInput
        style={styles.searchBar}
        placeholder="Encuentra arte o artistas para ti"
        value={searchText}
        onChangeText={handleSearch}
      />

      <Text style={styles.title}>Categorías</Text>
      <View style={styles.categoriesContainer}>
        {displayedCategories.map((category, index) => {
          const isLastInRow = index % COLUMNS === COLUMNS - 1;
          return (
            <View
              key={category.id}
              style={[
                styles.categoryItem,
                {
                  width: itemWidth,
                  marginRight: isLastInRow ? 0 : GAP,
                },
              ]}
            >
              <View style={styles.categoryImageContainer}>
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
              </View>
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          );
        })}
      </View>

      {/* Botón para ver más/menos */}
      {categories.length > 4 && (
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => setShowAllCategories(!showAllCategories)}
        >
          <Ionicons
            name={showAllCategories ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>Novedades</Text>
      <View style={styles.artistsContainer}>
        {newArtists.map((artist, index) => {
          const isLastInRow = index % COLUMNS === COLUMNS - 1;
          return (
            <View
              key={artist.id}
              style={[
                styles.artistItem,
                {
                  width: itemWidth,
                  marginRight: isLastInRow ? 0 : GAP,
                },
              ]}
            >
              <View style={styles.artistImageContainer}>
                <Image
                  source={{ uri: artist.image }}
                  style={styles.artistImage}
                />
              </View>

              <Text style={styles.artistText}>{artist.name}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
