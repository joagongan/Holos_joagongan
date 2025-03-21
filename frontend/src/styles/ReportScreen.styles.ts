import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: "#F5F5F5",
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 10,
      textAlign: "center",
    },
    loading: {
      fontSize: 16,
      color: "#888",
      marginBottom: 10,
    },
    errorText: {
      fontSize: 16,
      color: "red",
      marginBottom: 10,
    },
    artworkImage: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
    },
    artworkTitle: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 5,
    },
    artistName: {
      fontSize: 16,
      color: "#555",
      textAlign: "center",
      marginBottom: 15,
    },
    input: {
      width: "100%",
      height: 100,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: "#fff",
      padding: 10,
      marginBottom: 20,
      textAlignVertical: "top",
    },
    button: {
      backgroundColor: "#007BFF",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      width: "100%",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    placeholder: {
        backgroundColor: "#eee",
        width: "100%",
        aspectRatio: 1.2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
      },
  });
  
  export default styles;