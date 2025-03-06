import React, { useState } from "react";
import { View, Text, TextInput, Image, Button, StyleSheet, Platform, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";

const isWeb = Platform.OS === "web";
const UserProfileScreen = () => {

    interface Order {
        id: number;
        name: string;
        description: string;
        prize: number;
    }
    
    interface Artwork {
        id: number;
        name: string;
        description: string;
        prize: number;
    }
    
    interface ClientUser {
        id: number;
        name: string;
        userName: string;
        email: string;
        phoneNumber: string;
        imagePerfil: string;
        createdUser: string;
        role: "client";
        orders: Order[];
    }
    
    interface ArtistUser {
        id: number;
        name: string;
        userName: string;
        email: string;
        phoneNumber: string;
        imagePerfil: string;
        createdUser: string;
        role: "artist";
        artworks: Artwork[];
    }
    
    type User = ClientUser | ArtistUser;
    
    const navigation = useNavigation<any>();
    
    const [user1, setUser1] = useState<ClientUser>({
        id: 1,
        name: "Juan Pérez",
        userName: "juanp",
        email: "juan@example.com",
        phoneNumber: "1234567890",
        imagePerfil: "https://randomuser.me/api/portraits/men/1.jpg",
        createdUser: "2024-03-05",
        role: "client",
        orders: [
            { id: 1, name: "Pintura Abstracta", description: "Una pintura moderna de estilo abstracto con colores vibrantes.", prize: 450 },
            { id: 2, name: "Escultura Contemporánea", description: "Escultura de metal con formas geométricas y acabados pulidos.", prize: 1200 },
            { id: 3, name: "Cuadro Clásico", description: "Un retrato clásico pintado al óleo, con un enfoque en la luz y sombras.", prize: 800 },
        ],
    });
    
    const [user, setUser] = useState<ArtistUser>({
        id: 2,
        name: "Carlos Gómez",
        userName: "carlosg",
        email: "carlos@example.com",
        phoneNumber: "9876543210",
        imagePerfil: "https://randomuser.me/api/portraits/men/2.jpg",
        createdUser: "2023-08-15",
        role: "artist",
        artworks: [
            { id: 1, name: "Bosque Encantado", description: "Paisaje natural que representa un bosque en calma", prize: 1200 },
            { id: 2, name: "Mar en Tempestad", description: "Una obra que representa el mar durante una tormenta", prize: 1500 },
        ],
    });
    
    const handleEdit = () => {
        console.log("Editar perfil");
    };
    
    const navigateToOrderHistory = () => {
        if ("orders" in user) {
            navigation.navigate("Historial de Pedidos", { orders: user.orders });
        }
    };
    
    const navigateToArtworks = () => {
        if ("artworks" in user) {
            navigation.navigate("Obras Subidas", { artworks: user.artworks });
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
            <Text style={styles.title}>{"orders" in user ? "CLIENTE" : "ARTISTA"}</Text>
                <Image source={{ uri: user.imagePerfil }} style={styles.image} />
                <Text style={styles.label}>DATOS {"orders" in user ? "CLIENTE" : "ARTISTA"}</Text>
                <Text style={styles.fieldLabel}>Nombre:</Text>
                <TextInput style={styles.input} value={user.name} editable={false} />
                <Text style={styles.fieldLabel}>Usuario:</Text>
                <TextInput style={styles.input} value={user.userName} editable={false} />
                <Text style={styles.fieldLabel}>Correo Electrónico:</Text>
                <TextInput style={styles.input} value={user.email} editable={false} />
                <Text style={styles.fieldLabel}>Teléfono:</Text>
                <TextInput style={styles.input} value={user.phoneNumber} editable={false} />
                <View style={[styles.buttonsContainer]}>   
                    {user.role === "artist" ? (
                        <>
                            <Button title="Ver Historial de Trabajos" onPress={navigateToArtworks} color="#1E3A8A" />
                            <Button title="Hacer un Pedido" color="#1E3A8A" />
                        </>
                    ) : (
                        <Button title="Ver Historial de Pedidos" onPress={navigateToOrderHistory} color="#1E3A8A" />
                    )}
                </View>

                
                <View style={styles.buttonsContainer}>
                    <Button title="EDITAR" onPress={handleEdit} color="#1E3A8A" />
                </View>
            </View>
        </ScrollView>
    );
    };

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start", 
        backgroundColor: "#F9FAFB",
        paddingTop: 10, 
        paddingHorizontal: 20,
        },
        scrollView: {
            flex: 1, 
            backgroundColor: "#F9FAFB", 
        },
        title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 10, 
        },
        image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 5, 
        marginBottom: 10,
        },
        label: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1E3A8A",
        marginTop: 5,
        },
        fieldLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#374151",
        marginTop: 5,
        },
        input: {
            width: "80%",
            padding: 8,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 5,
            backgroundColor: "#FFFFFF",
            marginBottom: 10,
            textAlign: "center",
        },
        buttonsContainer: {
            justifyContent: 'center', 
            marginTop: 10,
            gap: 10,
            width: isWeb ? "20%" : "80%"
        }
    });

    export default UserProfileScreen;
