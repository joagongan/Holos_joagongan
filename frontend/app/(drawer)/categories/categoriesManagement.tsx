import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { CategoryContext } from "../../../src/contexts/CategoryContext";  

export default function CategoriesManagement() {
  const { categories, setCategories } = useContext(CategoryContext);  

  const addCategory = () => {
    setCategories([...categories, `Nueva Categoría ${categories.length + 1}`]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categorías Disponibles</Text>
      {categories.length > 0 ? (
        categories.map((category: string, index: number) => (  
          <Text key={index} style={styles.text}>{category}</Text>
        ))
      ) : (
        <Text style={styles.text}>No hay categorías disponibles</Text>
      )}
      <Button title="Añadir Categoría" onPress={addCategory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center" 
  },
  header: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10 
  },
  text: { 
    fontSize: 18, 
    color: "#555", 
    marginVertical: 5 
  }
});
