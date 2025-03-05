import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  ScrollView,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
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
  const [searchText, setSearchText] = useState<string>("");
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const isBigScreen = containerWidth >= 1024;
  const COLUMNS_BIG = 5;
  const COLUMNS_MOBILE = 2;
  const GAP_BIG = 24;
  const GAP_MOBILE = 16;
  const horizontalPaddingBig = 48;
  const horizontalPaddingMobile = 32;

  const columns = isBigScreen ? COLUMNS_BIG : COLUMNS_MOBILE;
  const gap = isBigScreen ? GAP_BIG : GAP_MOBILE;
  const horizontalPadding = isBigScreen
    ? horizontalPaddingBig
    : horizontalPaddingMobile;

  // Para calcular el ancho de cada item en pantallas grandes
  const itemWidth = isBigScreen
    ? (containerWidth - horizontalPadding - gap * (columns - 1)) / columns
    : 0;

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

  const scrollViewRef = useRef<ScrollView>(null);

  const [contentWidth, setContentWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  const showLeftArrow = scrollX > 0;
  const showRightArrow = scrollX + viewWidth < contentWidth;

  const handleScrollRight = () => {
    scrollViewRef.current?.scrollTo({ x: scrollX + 195, animated: true });
  };

  const handleScrollLeft = () => {
    const newX = scrollX - 195 < 0 ? 0 : scrollX - 195;
    scrollViewRef.current?.scrollTo({ x: newX, animated: true });
  };

  useEffect(() => {}, []);

  const handleLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setContainerWidth(width);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const filteredCategories = searchText
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : categories;

  let displayedCategories = filteredCategories;
  if (isBigScreen && !searchText && !showAllCategories) {
    displayedCategories = filteredCategories.slice(0, 5);
  }

  const filteredArtists = searchText
    ? newArtists.filter((artist) =>
        artist.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : newArtists;

  return (
    <ScrollView style={styles.container} onLayout={handleLayout}>
      <TextInput
        style={styles.searchBar}
        placeholder="Encuentra arte o artistas para ti"
        placeholderTextColor="rgba(50, 50, 50, 0.8)"
        value={searchText}
        onChangeText={handleSearch}
      />

      <Text style={styles.title}>Categorías</Text>

      {isBigScreen ? (
        <View style={styles.categoriesContainer}>
          {displayedCategories.map((category, index) => {
            const isLastInRow = index % COLUMNS_BIG === COLUMNS_BIG - 1;
            return (
              <View
                key={category.id}
                style={[
                  styles.categoryItemBig,
                  {
                    width: itemWidth,
                    marginRight: isLastInRow ? 0 : GAP_BIG,
                  },
                ]}
              >
                <View style={styles.categoryImageContainerBig}>
                  <Image
                    source={{ uri: category.image }}
                    style={styles.categoryImage}
                  />
                </View>
                <Text style={styles.categoryTextBig}>{category.name}</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={{ position: "relative" }}>
          {showLeftArrow && (
            <TouchableOpacity
              style={styles.leftArrow}
              onPress={handleScrollLeft}
            >
              <Ionicons name="chevron-back" size={24} color="black" />
            </TouchableOpacity>
          )}

          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainerMobile}
            onLayout={(e) => setViewWidth(e.nativeEvent.layout.width)}
            onContentSizeChange={(w, h) => setContentWidth(w)}
            onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
              setScrollX(e.nativeEvent.contentOffset.x)
            }
            scrollEventThrottle={16}
          >
            {displayedCategories.map((category) => (
              <View key={category.id} style={styles.categoryItemMobile}>
                <View style={styles.categoryImageContainerMobile}>
                  <Image
                    source={{ uri: category.image }}
                    style={styles.categoryImage}
                  />
                </View>
                <Text style={styles.categoryTextMobile}>{category.name}</Text>
              </View>
            ))}
          </ScrollView>

          {showRightArrow && (
            <TouchableOpacity
              style={styles.rightArrow}
              onPress={handleScrollRight}
            >
              <Ionicons name="chevron-forward" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Botón "ver más" en pantallas grandes (si aplica) */}
      {isBigScreen && categories.length > 5 && !searchText && (
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
        {filteredArtists.map((artist, index) => {
          if (isBigScreen) {
            const isLastInRow = index % COLUMNS_BIG === COLUMNS_BIG - 1;
            return (
              <View
                key={artist.id}
                style={[
                  styles.artistItemBig,
                  {
                    width: itemWidth,
                    marginRight: isLastInRow ? 0 : GAP_BIG,
                  },
                ]}
              >
                <View style={styles.artistImageContainerBig}>
                  <Image
                    source={{ uri: artist.image }}
                    style={styles.artistImage}
                  />
                </View>
                <Text style={styles.artistTextBig}>{artist.name}</Text>
              </View>
            );
          } else {
            const screenWidth = containerWidth - horizontalPaddingMobile;
            const mobileItemWidth =
              (screenWidth - GAP_MOBILE * (COLUMNS_MOBILE - 1)) /
              COLUMNS_MOBILE;
            const isLastInRow = index % COLUMNS_MOBILE === COLUMNS_MOBILE - 1;

            return (
              <View
                key={artist.id}
                style={[
                  styles.artistItemMobile,
                  {
                    width: mobileItemWidth,
                    marginRight: isLastInRow ? 0 : GAP_MOBILE,
                  },
                ]}
              >
                <View style={styles.artistImageContainerMobile}>
                  <Image
                    source={{ uri: artist.image }}
                    style={styles.artistImage}
                  />
                </View>
                <Text style={styles.artistTextMobile}>{artist.name}</Text>
              </View>
            );
          }
        })}
      </View>
    </ScrollView>
  );
}
