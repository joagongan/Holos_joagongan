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

interface Category {
  id: number;
  name: string;
  image: string;
}

interface Work {
  id: number;
  name: string;
  image: string;
  price?: number;
  artistName?: string;
}

export default function ExploreScreen() {
  type ExploreNavProp = DrawerNavigationProp<RootDrawerParamList, "Explorar">;
  const navigation = useNavigation<ExploreNavProp>();

  const [searchText, setSearchText] = useState<string>("");
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // Estado para las categorías obtenidas del service
  const [categories, setCategories] = useState<Category[]>([]);

  // Cargar las categorías al montar el componente
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

  // Consideramos "big screen" cuando el contenedor >= 1024
  const isBigScreen = containerWidth >= 1024;

  // Constantes para layout de escritorio
  const COLUMNS_BIG = 5;
  const GAP_BIG = 24;
  const HORIZONTAL_PADDING_BIG = 48;

  // Cálculo del ancho de cada tarjeta
  const itemWidth = isBigScreen
    ? (containerWidth - HORIZONTAL_PADDING_BIG - GAP_BIG * (COLUMNS_BIG - 1)) /
      COLUMNS_BIG
    : 0;

  // Obras (novedades)
  const [works] = useState<Work[]>([
    {
      id: 1,
      name: "Obra 1",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063", // Pintura abstracta
      price: 100,
      artistName: "John Doe",
    },
    {
      id: 2,
      name: "Obra 2",
      image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb", // Paisaje
      price: 200,
      artistName: "Alice",
    },
    {
      id: 3,
      name: "Obra 3",
      image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b", // Arte moderno
      price: 300,
      artistName: "Bob",
    },
    {
      id: 4,
      name: "Obra 4",
      image: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42", // Retrato clásico
      price: 400,
      artistName: "Charlie",
    },
    {
      id: 5,
      name: "Obra 5",
      image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664", // Pintura al óleo
      price: 250,
      artistName: "Diana",
    },
    {
      id: 6,
      name: "Obra 6",
      image: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3", // Arte contemporáneo
      price: 180,
      artistName: "Eve",
    },
    {
      id: 7,
      name: "Obra 7",
      image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93", // Arte colorido
      price: 350,
      artistName: "Frank",
    },
    {
      id: 8,
      name: "Obra 8",
      image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", // Pintura minimalista
      price: 120,
      artistName: "Georgia",
    },
  ]);

  // Para scroll horizontal en móvil (categorías)
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

  // Filtrar categorías según búsqueda
  const filteredCategories = searchText
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : categories;

  // Si no se está buscando y no has pulsado "ver más", mostramos solo 5
  let displayedCategories = filteredCategories;
  if (isBigScreen && !searchText && !showAllCategories) {
    displayedCategories = filteredCategories.slice(0, 5);
  }

  // Filtrar obras
  const filteredWorks = works.filter((w) =>
    w.name.toLowerCase().includes(searchText.toLowerCase())
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

      {/* En escritorio, 5 columnas ajustadas de ancho */}
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
        // En móvil: scroll horizontal
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

      {/* Botón "ver más" en escritorio */}
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
                      source={{ uri: work.image }}
                      style={styles.artistImage}
                    />
                  </View>
                  <Text style={styles.artistTextBig}>{work.name}</Text>
                </View>
              </TouchableOpacity>
            );
          } else {
            const screenWidth = containerWidth - 32; // 32 = padding horizontal
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
                      source={{ uri: work.image }}
                      style={styles.artistImage}
                    />
                  </View>
                  <Text style={styles.artistTextMobile}>{work.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    </ScrollView>
  );
}
