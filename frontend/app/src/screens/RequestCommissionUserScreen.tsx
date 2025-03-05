import React,  { useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";


export default function RequestCommissionUserScreen ({}) {

  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    Alert.alert("Solicitud enviada", inputText || "Debe de ingresar una descripción del trabajo");
    {/* Elimina el contenido de los estados*/}
    setInputText("");
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
    {/* Título de la pagina */}
    <View style={styles.banner}>
      <Text style={styles.bannerText}>SOLICITUD DE TRABAJO PERSONALIZADO</Text>
    </View>

    {/* Contenedor del artista y de los precios de las comisiones*/}
    <View style={styles.content}>
      {/* Sección artista */}
      <View style={styles.artistSection}>
        <Text style={styles.labelArtist}>ARTISTA:</Text>
        <View style={styles.artistContainer}>
          <Image 
            source={{ uri: "https://static.vecteezy.com/system/resources/previews/013/659/054/non_2x/human-avatar-user-ui-account-round-clip-art-icon-vector.jpg" }} 
            style={styles.artistImage} 
          />
        </View>
      </View>

      {/* Tabla de comisiones (Imagen) */}
      <View style={styles.commissionTable}>
        <Image 
          source={require("../../../assets/images/image.png")} 
          style={styles.commissionImage} 
        />
      </View>
    </View>
    
    {/* Input de Texto */}
    <View style={styles.containerTextPhoto}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleBannerInputText}>DESCRIBA EL TRABAJO DESEADO:</Text>
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
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
          ) : (
        <Text style={styles.placeholderText}>No hay imagen seleccionada</Text>
        )}
      </View>
    </View>
   
    
    {/* Contenedor de botones en fila */}
    <View style={styles.buttonContainer}>
        {/* Botón para seleccionar imagen */}
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Icon name="photo-camera" size={24} color="#183771" />
        </TouchableOpacity>

        {/* Botón de enviar */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

  </View>
);
    
};

const styles = StyleSheet.create({
    container: {
        flex:2,
        backgroundColor: "#FFF",
        padding: 40
        },

    banner: {
        backgroundColor: "#173C75",
        paddingVertical: 12,
        alignItems: "center",
        justifyContent: "center"
        },

    bannerText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 25,
        },

    content: {
        flexDirection: "row",
        width: "100%",
        height:"40%",
        marginTop: 10
         },

      artistSection: {
        width: "25%",
        backgroundColor: "#FFD9F2",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
        },

    labelArtist: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#000",
        marginBottom: 10
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
        width: "70%",
        height: "70%",
        resizeMode: "contain"
        },

    commissionTable: {
        flex:2,
        marginLeft: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        padding: 10
        },

    commissionImage: {
        width: "90%",
        height: "100%",
        resizeMode: "contain"
        },

    inputContainer: {
      flex: 1, 
      paddingRight: 10,
    },

    previewContainer: {
      flex: 1/3,
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

    titleBannerInputText:{
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
      height: "100%",
      textAlignVertical: "top"
    },

    previewImage: {
      width: "90%",
      height: "90%",
      resizeMode: "contain",
      borderRadius: 10,
    },

    containerTextPhoto: {
      flexDirection: "row",
      height: "32%",
      marginTop: 15,
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
