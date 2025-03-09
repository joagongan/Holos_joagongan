import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import styles from "./ArtistDetail.styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { RootDrawerParamList } from "@/app/_layout";
import { DrawerNavigationProp } from "@react-navigation/drawer";

interface Artwork {
  id: number;
  title: string;
  image: string;
}

interface Artist {
  id: number;
  name: string;
  image: string;
  description: string;
  artworks: Artwork[];
}

const ALL_ARTISTS = [
  {
    id: 10,
    name: "John Doe",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063",
    description: "John Doe es un artista conocido por su estilo abstracto único. Sus obras exploran el caos y el orden dentro de formas geométricas.",
    artworks: [
      { id: 1, title: "Obra 1", image: "https://images.unsplash.com/photo-1506157786151-b8491531f063" },
    ],
  },
  {
    id: 11,
    name: "Alice",
    image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb", // Imagen del artista
    description: "Alice es una artista paisajista que se especializa en la captura de la serenidad de la naturaleza en su trabajo.",
    artworks: [
      {
        id: 2,
        title: "Obra 2",
        image: "https://images.unsplash.com/photo-1555685812-4b943f1cb0eb",
      },
    ],
  },
  {
    id: 12,
    name: "Bob",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b", // Imagen del artista
    description: "Bob es un reconocido artista de arte moderno que utiliza medios mixtos para expresar temas sobre la vida urbana y la tecnología.",
    artworks: [
      {
        id: 3,
        title: "Obra 3",
        image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b",
      },
    ],
  },
  {
    id: 13,
    name: "Charlie",
    image: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42", // Imagen del artista
    description: "Charlie es un pintor clásico conocido por sus retratos detallados que capturan la esencia de sus sujetos con gran realismo.",
    artworks: [
      {
        id: 4,
        title: "Obra 4",
        image: "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42",
      },
    ],
  },
  {
    id: 14,
    name: "Diana",
    image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664", // Imagen del artista
    description: "Diana es una artista experta en la pintura al óleo, creando atmósferas evocadoras a través de la luz y el color.",
    artworks: [
      {
        id: 5,
        title: "Obra 5",
        image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664",
      },
    ],
  },
  {
    id: 15,
    name: "Eve",
    image: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3", // Imagen del artista
    description: "Eve es una artista contemporánea que mezcla el arte abstracto con elementos de la vida cotidiana, explorando la psicología humana.",
    artworks: [
      {
        id: 6,
        title: "Obra 6",
        image: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3",
      },
    ],
  },
  {
    id: 16,
    name: "Frank",
    image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93", // Imagen del artista
    description: "Frank es conocido por su vibrante y colorida pintura, que explora temas de emociones humanas a través de una paleta rica.",
    artworks: [
      {
        id: 7,
        title: "Obra 7",
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
      },
    ],
  },
  {
    id: 17,
    name: "Georgia",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0", // Imagen del artista
    description: "Georgia es una artista minimalista que se enfoca en la simplicidad y la elegancia del espacio vacío en sus composiciones.",
    artworks: [
      {
        id: 8,
        title: "Obra 8",
        image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      },
    ],
  },
];


const ArtistDetailScreen = ({ route }: any) => {
  const { artistId } = route.params as { artistId: number };
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>(); 

  console.log(route.params);
  const [artist, setArtist] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundArtist = ALL_ARTISTS.find((a) => a.id === artistId);
    setArtist(foundArtist || null);
    setLoading(false);
  }, [artistId]);

   // Verificación de datos antes de renderizar
   if (!artist) {
    return <Text>Loading...</Text>; // Muestra algo mientras no se cargan los datos
  }

  if (!artist.image) {
    return <Text>Imagen no disponible</Text>; // Si no tiene la imagen, muestra un mensaje
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: artist.image }} style={styles.artistImage} />
        <View style={styles.artistDetails}>
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.artistDescription}>{artist.description}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RequestCommission", { artistId: artist.id })}>
          <Text style={styles.buttonText}>Solicitar trabajo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Añadir a favoritos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.artworksContainer}>
        <Text style={styles.artworksTitle}>Obras del artista</Text>
        <View style={styles.artworksList}>
          {artist.artworks.map((artwork: Artwork) => (
            <View key={artwork.id} style={styles.artworkItem}>
              <Image source={{ uri: artwork.image }} style={styles.artworkImage} />
              <Text style={styles.artworkTitle}>{artwork.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ArtistDetailScreen;
