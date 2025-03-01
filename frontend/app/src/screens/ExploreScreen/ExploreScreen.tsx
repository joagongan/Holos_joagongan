import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import styles from "./ExploreScreen.styles";
import { Ionicons } from "@expo/vector-icons";

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
  const [searchText, setSearchText] = useState<string>("");
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);

  // Datos de ejemplo
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Pintura", image: "https://picsum.photos/200?random=1" },
    { id: 2, name: "Escultura", image: "https://picsum.photos/200?random=2" },
    { id: 3, name: "Fotografía", image: "https://picsum.photos/200?random=3" },
    { id: 4, name: "Dibujo", image: "https://picsum.photos/200?random=4" },
    { id: 5, name: "Grabado", image: "https://picsum.photos/200?random=5" },
    { id: 6, name: "Diseño", image: "https://picsum.photos/200?random=6" },
  ]);

  const [newArtists, setNewArtists] = useState<Artist[]>([
    { id: 1, name: "Artista 1", image: "https://picsum.photos/200?random=7" },
    { id: 2, name: "Artista 2", image: "https://picsum.photos/200?random=8" },
    { id: 3, name: "Artista 3", image: "https://picsum.photos/200?random=9" },
    { id: 4, name: "Artista 4", image: "https://picsum.photos/200?random=10" },
  ]);

  useEffect(() => {
    // Aquí irían las llamadas reales a tu backend
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 4);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar arte o artistas"
        value={searchText}
        onChangeText={handleSearch}
      />

      <Text style={styles.title}>Categorías</Text>
      <View style={styles.categoriesContainer}>
        {displayedCategories.map((category) => (
          <View key={category.id} style={styles.categoryItem}>
            <Image
              source={{ uri: category.image }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{category.name}</Text>
          </View>
        ))}
      </View>

      {/* flecha abajo */}
      {!showAllCategories && categories.length > 4 && (
        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => setShowAllCategories(true)}
        >
          <Ionicons name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>Novedades</Text>
      <View style={styles.artistsContainer}>
        {newArtists.map((artist) => (
          <View key={artist.id} style={styles.artistItem}>
            <Image source={{ uri: artist.image }} style={styles.artistImage} />
            <Text style={styles.artistText}>{artist.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
