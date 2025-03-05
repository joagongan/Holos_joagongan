import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isBigScreen = width >= 1024;

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    padding: 40,
    margin: 10
  },
  banner: {
    backgroundColor: "#183771",
    padding: 15,
    borderRadius:8,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  // Contenedor principal del tablero Kanban
  kanbanBoard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 24,
    flexWrap: "wrap",
    backgroundColor: "#bfe6fc", // Fondo azul pastel
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    margin: 10
  },

  // Estilo de cada columna
  kanbanColumn: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical:5,
    backgroundColor: "#e0f7fa", // Azul pastel suave para el fondo de las columnas
    borderRadius: 12,
    padding: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  // Título de cada columna
  columnTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00796b", // Un tono verde suave para el título
    marginBottom: 12,
    textAlign: "center",
  },

  // Estilo de las tarjetas de tareas
  taskCard: {
    backgroundColor: "#ffffff", // Blanco para las tarjetas
    padding: 16,
    margin: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#80deea", // Detalles en azul pastel más intenso
  },

  // Texto dentro de las tarjetas
  taskText: {
    fontSize: 16,
    color: "#00796b", // Tono suave de verde para el texto de la tarea
    fontStyle: "italic"
  },

  // Estilo del botón para mover tareas
  moveButton: {
    backgroundColor: "#639CFF", // Azul pastel suave para el botón
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#00796b",
  },

  // Texto dentro del botón
  moveButtonText: {
    color: "#00796b", // Texto en verde suave
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
});
