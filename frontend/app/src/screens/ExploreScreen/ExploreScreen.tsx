// src/screens/ExploreScreen/ExploreScreen.tsx
import React, { useState, useRef, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import styles from "./ExploreScreen.styles";
import { RootDrawerParamList } from "../../../_layout";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { getAllCategories } from "../../../services/categoryService";
import { getAllWorksDone } from "../../../services/WorksDoneService";
import { getArtistById } from "../../../services/ArtistService";

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Artist {
  id: number;
  name: string;
  username: string;
}

interface Work {
  id: number;
  name: string;
  image: string;
  price?: number;
  artist: Artist | number;
  artistName?: string;
}

export default function ExploreScreen() {
  type ExploreNavProp = DrawerNavigationProp<RootDrawerParamList, "Explorar">;
  const navigation = useNavigation<ExploreNavProp>();

  // Definir la URL base del backend; esta variable puede ser reemplazada según el entorno
  const BASE_URL = "http://localhost:8080";

  const [searchText, setSearchText] = useState<string>("");
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const [categories, setCategories] = useState<Category[]>([]);
  const [works, setWorks] = useState<Work[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const data = await getAllWorksDone();

        const worksWithArtist = await Promise.all(
          data.map(async (work: Work) => {
            if (
              work.artist &&
              typeof work.artist === "object" &&
              typeof work.artist.id === "number"
            ) {
              return { ...work, artistName: work.artist.username };
            } else if (typeof work.artist === "number") {
              const artist = await getArtistById(work.artist);
              return { ...work, artistName: artist.username };
            } else {
              console.error("No se encontró artista válido en la obra:", work);
              return work;
            }
          })
        );

        setWorks(worksWithArtist);

        console.log("Obras con nombre de artista agregado:", worksWithArtist);
        setWorks(worksWithArtist);
      } catch (error) {
        console.error("Error fetching works done:", error);
      }
    };

    fetchWorks();
  }, []);

  const isBigScreen = containerWidth >= 1024;
  const COLUMNS_BIG = 5;
  const GAP_BIG = 24;
  const HORIZONTAL_PADDING_BIG = 48;
  const itemWidth = isBigScreen
    ? (containerWidth - HORIZONTAL_PADDING_BIG - GAP_BIG * (COLUMNS_BIG - 1)) /
      COLUMNS_BIG
    : 0;

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

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
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

  const filteredWorks = works.filter((w) =>
    (w.name ?? "").toLowerCase().includes(searchText.toLowerCase())
  );

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
                  { width: itemWidth, marginRight: isLastInRow ? 0 : GAP_BIG },
                ]}
              >
                <View style={styles.categoryImageContainerBig}>
                  <Image
                    // Se construye la URL completa concatenando BASE_URL y la ruta relativa almacenada en la base de datos
                    source={{ uri: `${BASE_URL}${category.image}` }}
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
            onContentSizeChange={(w) => setContentWidth(w)}
            onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
              setScrollX(e.nativeEvent.contentOffset.x)
            }
            scrollEventThrottle={16}
          >
            {displayedCategories.map((category) => (
              <View key={category.id} style={styles.categoryItemMobile}>
                <View style={styles.categoryImageContainerMobile}>
                  <Image
                    source={{ uri: `${BASE_URL}${category.image}` }}
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
        {filteredWorks.map((work, index) => {
          if (isBigScreen) {
            const isLastInRow = index % COLUMNS_BIG === COLUMNS_BIG - 1;
            return (
              <TouchableOpacity
                key={work.id}
                onPress={() => {
                  navigation.navigate("WorkDetail", { workId: work.id });
                }}
              >
                <View
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
                      source={{ uri: `${BASE_URL}${work.image}` }}
                      style={styles.artistImage}
                    />
                  </View>
                  <Text style={styles.artistTextBig}>{work.artistName}</Text>
                </View>
              </TouchableOpacity>
            );
          } else {
            const screenWidth = containerWidth - 32;
            const COLUMNS_MOBILE = 2;
            const GAP_MOBILE = 16;
            const mobileItemWidth =
              (screenWidth - GAP_MOBILE * (COLUMNS_MOBILE - 1)) /
              COLUMNS_MOBILE;
            const isLastInRow = index % COLUMNS_MOBILE === COLUMNS_MOBILE - 1;

            return (
              <TouchableOpacity
                key={work.id}
                onPress={() => {
                  navigation.navigate("WorkDetail", { workId: work.id });
                }}
              >
                <View
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
                      source={{ uri: `${BASE_URL}${work.image}` }}
                      style={styles.artistImage}
                    />
                  </View>
                  <Text style={styles.artistTextMobile}>{work.artistName}</Text>
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </ScrollView>
  );
}
