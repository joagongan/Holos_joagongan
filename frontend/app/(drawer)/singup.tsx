import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { API_URL } from "@/src/constants/api";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../_layout';
import { RouteProp } from '@react-navigation/native';

type SignupScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, "Singup">;
type SignupScreenRouteProp = RouteProp<RootDrawerParamList, "Singup">;

type SignupScreenProps = {
  navigation: SignupScreenNavigationProp;
  route: SignupScreenRouteProp;
};

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); 
  const router = useRouter(); 
  const navigation = useNavigation<SignupScreenNavigationProp>();

  const handleSignup = async () => {
    console.log("Botón Crear cuenta pulsado");
    Alert.alert("Debug", "Se ha pulsado el botón de registro");
    
    try {
      const requestBody = {
        username,
        password,
        firstName,
        authority: role,
      };
      console.log("Enviando request a", `${API_URL}/auth/signup`, requestBody);

      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      console.log("Respuesta HTTP status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en el registro:', errorData);
        Alert.alert("Error", JSON.stringify(errorData));
        return;
      }

      console.log("Respuesta OK, navegando a Inicio");
      Alert.alert("Registro exitoso", "Usuario registrado correctamente");
      navigation.navigate("Inicio");

    } catch (error) {
      console.error('Error en la petición:', error);
      Alert.alert("Error", String(error));
    }
  };

  return (
    <View style={styles.screenBackground}>
      <Text style={styles.pageTitle}>Nuevo {role}</Text>
      
      {/* "Card" contenedor con borde morado */}
      <View style={styles.cardContainer}>
        
        <View style={styles.formRow}>
          {/* Nombre */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Roberto"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          {/* Apellidos */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Apellidos</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Pérez López"
            />
          </View>
        </View>

        <View style={styles.formRow}>
          {/* Correo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
              style={styles.input}
              placeholder="correo@ejemplo.com"
            />
          </View>

          {/* Nombre de usuario */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="UsuarioEjemplo"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>

        <View style={styles.formRow}>
          {/* Nueva contraseña */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nueva contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="********"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Confirmar contraseña */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirma contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="********"
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.formRow}>
          {/* Foto de perfil */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Foto de perfil</Text>
            <TextInput
              style={styles.input}
              placeholder="URL/imagen"
            />
          </View>

          {role === 'artist' && (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>Añade tablero de comisiones</Text>
      <TextInput
        style={styles.input}
        placeholder="URL/imagen"
      />
    </View>
  )}
</View>

        {/* Rol actual (client, artist) + Botones de rol */}
        <View style={styles.roleContainer}>
          <Text style={styles.label}>Rol actual: {role}</Text>
          <View style={styles.roleButtonsRow}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'client' && styles.roleButtonActive
              ]}
              onPress={() => setRole('client')}
            >
              <Text style={styles.roleButtonText}>CLIENT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'artist' && styles.roleButtonActive
              ]}
              onPress={() => setRole('artist')}
            >
              <Text style={styles.roleButtonText}>ARTIST</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botón crear cuenta */}
        <TouchableOpacity style={styles.createButton} onPress={handleSignup}>
          <Text style={styles.createButtonText}>Crear cuenta</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenBackground: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#403568',
    alignSelf: 'flex-start',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#403568', // Borde morado
    borderRadius: 10,
    padding: 16,
    // Sombra suave (iOS/Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  label: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    fontSize: 14,
    backgroundColor: '#fafafa',
  },
  roleContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  roleButtonsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  roleButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  roleButtonActive: {
    backgroundColor: '#403568',
  },
  roleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#403568',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
