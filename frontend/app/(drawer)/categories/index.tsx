// frontend/app/(drawer)/categories/index.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CategoriesManagement from './categoriesManagement';  // Asegúrate de que la ruta sea correcta.

export default function CategoriesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gestión de Categorías</Text>
      <CategoriesManagement />  {/* Aquí renderizamos CategoriesManagement */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 50, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  header: {
    marginTop: 20, 
    fontSize: 24, 
    fontWeight: "bold",
    color: "#333"
  },
});
