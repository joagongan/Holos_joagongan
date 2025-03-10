import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { getArtistById } from "../../../services/ArtistService";

export interface Artist {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  phoneNumber?: string;
  imageProfile?: string | null;
  createdUser: string;
  numSlotsOfWork: number;
  tableCommisionsPrice?: string | null;
}

const BASE_URL = "http://localhost:8080";

const cameraIcon = "photo-camera";
const isLaptop = Platform.OS === "web";

export default function RequestCommissionUserScreen({ route }: any) {
  const { artistId } = route.params;

  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const data: Artist = await getArtistById(artistId);
        setArtist(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching artist: ", error);
        Alert.alert("Error", "No se pudo cargar la información del artista");
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [artistId]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!artist) {
    return <Text>Artista no disponible</Text>;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) {
      if (isLaptop) {
        window.alert("Debe de ingresar una descripción del trabajo");
      } else {
        Alert.alert("Debe de ingresar una descripción del trabajo");
      }
      return;
    }
    if (isLaptop) {
      window.alert("Solicitud enviada");
    } else {
      Alert.alert("Solicitud enviada");
    }
    setInputText("");
    setSelectedImage(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          SOLICITUD DE TRABAJO PERSONALIZADO
        </Text>
      </View>

      {/* Sección de artista y tabla de comisiones */}
      <View style={styles.content}>
        <View style={styles.artistSection}>
          <Text style={styles.labelArtist}>ARTISTA: {artist.name}</Text>
          <View style={styles.artistContainer}>
            {artist.imageProfile ? (
              <Image
                source={{ uri: `${BASE_URL}${artist.imageProfile}` }}
                style={styles.artistImage}
              />
            ) : (
              <Text>Imagen no disponible</Text>
            )}
          </View>
        </View>
        <View style={styles.commissionTable}>
          {artist.tableCommisionsPrice ? (
            <Image
              source={{ uri: `${BASE_URL}${artist.tableCommisionsPrice}` }}
              style={styles.commissionImage}
            />
          ) : (
            <Text>Tabla de comisiones no disponible</Text>
          )}
        </View>
      </View>

      {/* Área para descripción y vista previa de imagen */}
      <View style={styles.containerTextPhoto}>
        <View style={styles.inputContainer}>
          <Text style={styles.titleBannerInputText}>
            DESCRIBA EL TRABAJO DESEADO:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Describa su solicitud..."
            multiline
            value={inputText}
            onChangeText={setInputText}
          />
        </View>
        <View style={styles.previewContainer}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.previewImage}
            />
          ) : (
            <Text style={styles.placeholderText}>
              No hay imagen seleccionada
            </Text>
          )}
        </View>
      </View>

      {/* Botones para seleccionar imagen y enviar solicitud */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Icon name={cameraIcon} size={24} color="#183771" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
    padding: 40,
  },
  banner: {
    backgroundColor: "#173C75",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 25,
  },
  content: {
    flexDirection: "row",
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  artistSection: {
    flex: 1,
    backgroundColor: "#FFD9F2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  labelArtist: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  artistContainer: {
    backgroundColor: "#FFF",
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  artistImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
    resizeMode: "cover",
  },
  commissionTable: {
    flex: 2,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  commissionImage: {
    width: "90%",
    height: "100%",
    resizeMode: "contain",
  },
  containerTextPhoto: {
    flexDirection: "row",
    height: 150,
    marginTop: 15,
  },
  inputContainer: {
    flex: 1,
    paddingRight: 10,
  },
  titleBannerInputText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#173C75",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#173C75",
    flex: 1,
    textAlignVertical: "top",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  previewImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  imageButton: {
    backgroundColor: "#FECEF1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#173C75",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
