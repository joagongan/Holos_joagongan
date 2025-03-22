import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  Alert, StyleSheet, Image 
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { API_URL } from "@/src/constants/api";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../_layout';
import { RouteProp } from '@react-navigation/native';

type SignupScreenNavigationProp = DrawerNavigationProp<RootDrawerParamList, "Signup">;
type SignupScreenRouteProp = RouteProp<RootDrawerParamList, "Signup">;

type SignupScreenProps = {
  navigation: SignupScreenNavigationProp;
  route: SignupScreenRouteProp;
};

export default function SignupScreen() {
  // Estados compartidos
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar contraseña
  const [passwordError, setPasswordError] = useState('');     // Estado para mensaje de error
  const [imageProfile, setImageProfile] = useState('');
  const [role, setRole] = useState('client');

  // Estados específicos para artistas
  const [numSlotsOfWork, setNumSlotsOfWork] = useState('');
  const [tableCommisionsPrice, setTableCommisionsPrice] = useState('');

  const router = useRouter();
  const navigation = useNavigation<SignupScreenNavigationProp>();

  // Validación en tiempo real: cuando cambie password o confirmPassword
  useEffect(() => {
    if (confirmPassword.length > 0 && password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  const handleSignup = async () => {
    console.log("Botón Crear cuenta pulsado");

    // Verifica si hay error de contraseña
    if (passwordError) {
      Alert.alert("Error", "Por favor, corrige el error en la confirmación de la contraseña");
      return;
    }

    if (!password || !confirmPassword) {
      Alert.alert("Error", "Ingresa la contraseña y su confirmación");
      return;
    }

    try {
      const requestBody: any = {
        firstName,
        username,
        email,
        password,
        imageProfile,
        authority: role,
      };

      if (role === 'artist') {
        requestBody.numSlotsOfWork = parseInt(numSlotsOfWork, 10);
        requestBody.tableCommisionsPrice = tableCommisionsPrice;
      }

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

      console.log("Registro exitoso, navegando a Inicio");
      Alert.alert("Registro exitoso", "Usuario registrado correctamente");
      router.push(`/(drawer)/explore`);

    } catch (error) {
      console.error('Error en la petición:', error);
      Alert.alert("Error", String(error));
    }
  };

  return (
    <View style={styles.screenBackground}>
      <Image
        source={require('../(drawer)/logo/logo.png')} // Ajusta la ruta según tu estructura
        style={styles.logo}
      />

      <Text style={styles.pageTitle}>Nuevo {role}</Text>

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
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
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
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.formRow}>
          {/* Foto de perfil */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Foto de perfil (URL)</Text>
            <TextInput
              style={styles.input}
              placeholder="URL de la imagen"
              value={imageProfile}
              onChangeText={setImageProfile}
            />
          </View>
        </View>

        {role === 'artist' && (
          <>
            <View style={styles.formRow}>
              {/* Slots de trabajo */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Slots de trabajo (1-8)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Número entre 1 y 8"
                  value={numSlotsOfWork}
                  onChangeText={setNumSlotsOfWork}
                  keyboardType="numeric"
                />
              </View>
              {/* Precio del tablero */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Precio del tablero de comisiones</Text>
                <TextInput
                  style={styles.input}
                  value={tableCommisionsPrice}
                  onChangeText={setTableCommisionsPrice}
                />
              </View>
            </View>
          </>
        )}

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
    backgroundColor: '#FAE8F0',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    color: '#403568',
    alignSelf: 'center',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#C68FA2',
    borderRadius: 10,
    padding: 16,
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
    color: '#403568',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E9C2CF',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
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
    backgroundColor: '#E9C2CF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  roleButtonActive: {
    backgroundColor: '#C68FA2',
  },
  roleButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#C68FA2',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
