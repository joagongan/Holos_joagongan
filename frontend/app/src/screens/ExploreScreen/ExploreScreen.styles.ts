import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 16,
  },

  categoryItem: {
    width: "22%",
    margin: 8,
    aspectRatio: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  categoryImage: {
    width: "80%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 8,
  },

  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  seeMoreButton: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  artistsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    marginBottom: 16,
  },

  artistItem: {
    width: "22%",
    margin: 8,
    aspectRatio: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  artistImage: {
    width: "80%",
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 12,
    marginBottom: 8,
  },

  artistText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
