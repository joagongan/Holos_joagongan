import { StyleSheet } from "react-native";


export default StyleSheet.create({
    menuButton: {
        right:10, // Espacio entre la imagen y los tres puntos
        padding: 8,
        backgroundColor:"rgba(229, 194, 194, 0.83)",
        borderRadius: 20,
        position: "absolute",
        zIndex: 12, 
    },
  menuButtonOneImage: {
    position: "absolute",
    right: -20, 
    zIndex: 12, 
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
  },
  menu: {
    position: "absolute",
    top: 42, 
    right: 5,
    backgroundColor: "white",
    padding: 11,
    borderRadius: 5,
    zIndex: 13, 
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    zIndex: 14, 
  },
  menuItemText: {
    fontSize: 14,
    color: "#333",
    zIndex: 200, 
  },
});
