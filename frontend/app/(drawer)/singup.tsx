import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
    try {
      const requestBody = {
        username,
        password,
        firstName,
        authority: role,
      };

      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en el registro:', errorData);
        return;
      }

      navigation.navigate("Inicio");

    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo/Nick (username)"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre (firstName)"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={{ flexDirection: 'row', marginVertical: 8 }}>
        <Text>Rol actual: {role}</Text>
        <Button title="CLIENT" onPress={() => setRole('client')} />
        <Button title="ARTIST" onPress={() => setRole('artist')} />
      </View>

      <Button title="REGISTRARME" onPress={handleSignup} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    padding: 8,
  },
});
