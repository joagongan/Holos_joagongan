// src/screens/WorkDetailScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Cambia a false para conectar con el backend real
const USE_LOCAL_DATA = true;

export default function WorkDetailScreen() {
  const [work, setWork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Id de la obra (puedes parametrizarlo luego)
  const workId = 1;

  // Objeto local de ejemplo para pruebas
  const workExample = {
    id: 1,
    name: 'Mi Obra de Arte',
    description: 'Descripción de ejemplo para esta obra.',
    price: 150.0,
    artist: {
      id: 10,
      name: 'Artista de Prueba',
    },
  };

  useEffect(() => {
    if (USE_LOCAL_DATA) {
      // Si usamos datos locales, se asigna el objeto de ejemplo
      setWork(workExample);
      setLoading(false);
    } else {
      // Caso contrario, se hace la llamada al backend
      async function fetchWork() {
        try {
          const response = await axios.get(`https://tuservidor.com/api/v1/works/${workId}`);
          setWork(response.data);
        } catch (error) {
          console.error('Error al obtener la obra:', error);
        } finally {
          setLoading(false);
        }
      }
      fetchWork();
    }
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  }

  if (!work) {
    return <Text style={{ marginTop: 50 }}>No se encontró la obra.</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Tarjeta centrada para mostrar la obra */}
      <View style={styles.card}>
        <Text style={styles.title}>{work.name}</Text>
        <Text style={styles.artist}>Artista: {work.artist?.name}</Text>
        <Text style={styles.description}>{work.description}</Text>
        <Text style={styles.price}>Precio: {work.price} €</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Fondo pastel suave
    backgroundColor: '#E8F6EF', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    // Tarjeta con fondo blanco
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',

    // Borde pastel muy sutil
    borderWidth: 1,
    borderColor: '#B8E8D8',

    // Sombra (funciona mejor en iOS; en Android se usa "elevation")
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2F4F4F', // gris oscuro que combina con pastel
    marginBottom: 8,
    textAlign: 'center',
  },
  artist: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#5DAE8B', // verde pastel para resaltar el precio
    fontWeight: '600',
    textAlign: 'center',
  },
});
