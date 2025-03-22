import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image, TextInput, ActivityIndicator, Alert, Modal,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {  getAllCategories, createCategory, updateCategory,} from "@/src/services/categoryService";
import { AuthenticationContext } from "@/src/contexts/AuthContext";
import ProtectedRoute from "@/src/components/ProtectedRoute";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

// 2. Ajusta la pantalla
const { width } = Dimensions.get("window");
const isBigScreen = width >= 1024;
const MOBILE_PROFILE_ICON_SIZE = 40;
const MOBILE_CARD_PADDING = 12;
const BASE_URL = "http://localhost:8080";

export default function AdminCategories() {
  const { loggedInUser } = useContext(AuthenticationContext);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  const fetchCategories = async () => {
    try {
      const data: Category[] = await getAllCategories();
      setCategories(data);
    } catch (error) {
      Alert.alert("Error", "Error al obtener las categorías.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, newCategory);
      } else {
        await createCategory(newCategory);
      }
      Alert.alert("Éxito", "Categoría guardada correctamente.");
      setModalVisible(false);
      fetchCategories();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar la categoría.");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>CATEGORÍAS</Text>
        </View>
  
        <ScrollView style={styles.content}>
  <Text style={styles.sectionTitle}>LISTA DE CATEGORÍAS</Text>
  {loading ? (
    <ActivityIndicator size="large" color="#183771" />
  ) : categories.length === 0 ? (
    <Text style={styles.noCategoriesText}>No hay categorías disponibles.</Text>
  ) : (
    <View style={styles.categoriesContainer}>
      {categories.map((cat) => (
        <View key={cat.id} style={styles.card}>
          <View style={styles.categoryImageContainer}>
            <Image
              source={
                cat.image.startsWith("http")
                  ? { uri: cat.image }
                  : { uri: `${BASE_URL}${cat.image}` }
              }
              style={styles.categoryImage}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{cat.name}</Text>
            <Text style={styles.text}>{cat.description}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                setEditingCategory(cat);
                setNewCategory({
                  name: cat.name,
                  description: cat.description,
                  image: cat.image,
                });
                setModalVisible(true);
              }}
            >
              <Ionicons name="pencil" size={24} color="#183771" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )}
</ScrollView>

  
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditingCategory(null);
            setNewCategory({ name: "", description: "", image: "" });
            setModalVisible(true);
          }}
        >
          <Ionicons name="add-circle" size={30} color="#FFF" />
          <Text style={styles.addButtonText}>Agregar Categoría</Text>
        </TouchableOpacity>
  
        {/* Modal para agregar/editar */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{editingCategory ? "Editar Categoría" : "Nueva Categoría"}</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={newCategory.name}
                onChangeText={(text) => setNewCategory({ ...newCategory, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={newCategory.description}
                onChangeText={(text) => setNewCategory({ ...newCategory, description: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="URL de imagen"
                value={newCategory.image}
                onChangeText={(text) => setNewCategory({ ...newCategory, image: text })}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
  categoryImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: isBigScreen ? 40 : 0,
  },
  banner: {
    backgroundColor: "#183771",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noCategoriesText: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    padding: 5,
    borderRadius: 5,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#183771",
    padding: 15,
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#183771",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#BBB",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});