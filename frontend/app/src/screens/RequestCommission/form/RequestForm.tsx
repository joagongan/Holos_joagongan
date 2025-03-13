import { View, TextInput, Image, Text, TouchableOpacity, Button, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { styles } from "../RequestCommissionUserScreen.styles";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { createCommission } from "./formHandlers";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { Commission, Artist } from "../CommissionTypes";

const cameraIcon = "photo-camera";

interface RequestFormProps {
  artist: Artist;
}

export default function RequestForm({ artist }: RequestFormProps) {
  const emptyItem: Partial<Commission> = {
    name: "",
    description: "",
    price: 0,
    numMilestones: 0,
    paymentArrangement: "INITIAL",
  };

  const { loggedInUser } = useContext(AuthenticationContext);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [commission, setCommission] = useState<Partial<Commission>>(emptyItem);

  console.log("Logged In User:", loggedInUser);
  console.log("Authorization Token:", loggedInUser?.token);

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

  const handleChange = (name: keyof Commission, value: string | number | Artist | null) => {
    setCommission((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {

      const commissionData = {
        name: commission.name,
        description: commission.description,
        price: Number(commission.price),
        numMilestones: Number(commission.numMilestones),
        paymentArrangement: "INITIAL"
      };
  
      const createdCommission = await createCommission(artist.id, commissionData, loggedInUser.token);
        Alert.alert("Success", "Commission request sent!");
    } catch (error) {
      Alert.alert("Error", "Failed to create commission.");
    }
  };

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
        placeholder="Describe your request..."
        multiline
        value={commission.description}
        onChangeText={(text) => handleChange("description", text)}
      />
      <TextInput
        style={styles.title}
        placeholder="Enter the price"
        keyboardType="numeric"
        value={commission.price?.toString()}
        onChangeText={(text) => handleChange("price", Number(text))}
      />
      <TextInput
        style={styles.title}
        placeholder="Enter the number of milestones"
        keyboardType="numeric"
        value={commission.numMilestones?.toString()}
        onChangeText={(text) => handleChange("numMilestones", Number(text))}
      />

      <View style={styles.previewContainer}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <Text style={styles.placeholderText}>No image selected</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Icon name={cameraIcon} size={24} />
        </TouchableOpacity>
        <Button title="Submit" onPress={() => handleSubmit()} />
      </View>
    </View>
  );
}
