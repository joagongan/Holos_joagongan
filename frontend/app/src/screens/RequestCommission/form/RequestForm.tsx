import { View, TextInput, Image, Text, TouchableOpacity, Alert, Platform, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../RequestCommissionUserScreen.styles";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import tokenService from "../../../../services/token.service";
import useFetchData from "../../../../util/useFetchData";
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handleSubmit } from "./formHandlers";
import { AuthenticationContext } from "@/app/context/AuthContext";

const cameraIcon = "photo-camera";

interface Artist {
  id: number;
  name: string;
  profileImage?: string;
}

interface RequestFormProps {
  artist: Artist;
}

type Commission = {
  id: number | null;
  name: string;
  description: string;
  price: string;
  status: "REQUESTED" | "APPROVED" | "COMPLETED"; // Adjust as needed
  numMilestones: string;
  acceptedDateByArtist: Date | null;
  artist: string;
  paymentArrangement: "INITIAL" | "FULL" | "PARTIAL"; // Adjust as needed
  statusKanbanOrder: number | null;
  client: string | null;
};

export default function RequestForm({ artist }: RequestFormProps) {

  const emptyItem: Partial<Commission> = {
    id: null,
    name: "",
    description: "",
    price: "",
    status: "REQUESTED",
    numMilestones: "",
    acceptedDateByArtist: null,
    artist: "",
    paymentArrangement: "INITIAL",
    statusKanbanOrder: null,
    client: null,
  };
  
  const { loggedInUser } = useContext(AuthenticationContext);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [commission, setCommission] = useState(emptyItem);
  const artists = useFetchData(`/api/v1/artists`, loggedInUser.token);
  
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
  }

  const handleChange = (name: string, value: string | number) => {
    setCommission((prev) => ({ ...prev, [name]: value }));
    if (name === "artist") {
      const artist = artists.find((artist: { id: number; }) => artist.id === Number(value));
      setCommission({ ...commission, artist: artist });
    }
  }
  
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.title}
        placeholder="Title"
        value={commission.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Describa su solicitud..."
        multiline
        value={commission.description}
        onChangeText={(text) => handleChange("description", text)}
      />

      <TextInput
        style={styles.title}
        placeholder="Ingrese el precio"
        keyboardType="numeric"
        value={commission.price}
        onChangeText={(text) => handleChange("price", text)}
      />

      <TextInput
        style={styles.title}
        placeholder="Ingrese el número de milestones"
        keyboardType="numeric"
        value={commission.numMilestones}
        onChangeText={(text) => handleChange("numMilestones", text)}
      />

      <View style={styles.previewContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <Text style={styles.placeholderText}>No hay imagen seleccionada</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Icon name={cameraIcon} size={24} />
        </TouchableOpacity>

        <Button title="Submit" onPress={() => handleSubmit({ commission })} />
      </View>
    </View>
  );
}
