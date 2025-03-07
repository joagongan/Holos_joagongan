import React,  { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";


{/* Images variables*/}
const avatarArtist = "https://static.vecteezy.com/system/resources/previews/013/659/054/non_2x/human-avatar-user-ui-account-round-clip-art-icon-vector.jpg";
const commissionTablePrice = "../../../assets/images/image.png";
const cameraIcon = "photo-camera";
//----------------------------------------------------


const isLaptop = Platform.OS === 'web';

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



export default function RequestCommissionUserScreen ({ route }: any) {
  const { artistId } = route.params as { artistId: number };

  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

   {/* Se muestra un pop-up u otro en función de si se está accediendo por móvil o por ordenador, con el objetivo de proporcionar  al cliente información
      sobre el estado del formulario */}
      
     if (!inputText.trim()) {
      if(isLaptop){
        window.alert( "Debe de ingresar una descripción del trabajo");
      }else{ 
        Alert.alert("Debe de ingresar una descripción del trabajo");
      }
      return;
    }else{
      if(isLaptop){
        window.alert("Solicitud enviada" );
      }else{
        Alert.alert("Solicitud enviada");
      }
    }

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
        <Text style={styles.labelArtist}>ARTISTA: {artist.name}</Text>
        <View style={styles.artistContainer}>
          <Image 
            source={{ uri: artist.image }} 
            style={styles.artistImage} 
          />
        </View>
      </View>

      {/* Tabla de comisiones (Imagen) */}
      <View style={styles.commissionTable}>
        <Image 
          source={require(commissionTablePrice)} 
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
          <Icon name = {cameraIcon} size={24} color="#183771" />
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
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        resizeMode: "cover"
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
