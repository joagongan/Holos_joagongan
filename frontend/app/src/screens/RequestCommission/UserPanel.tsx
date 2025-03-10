import { View, Text, Image } from "react-native";

export default function UserPanel({ artist }: { artist: any }) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        margin: 10,
        width: 250,
      }}
    >
      <Image
        source={{ uri: artist.image }}
        style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 10 }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>{artist.name}</Text>
      <Text style={{ fontSize: 14, color: "#333" }}>@{artist.username}</Text>
      <Text style={{ fontSize: 14, color: "#333" }}>{artist.id}</Text>
      <Text style={{ fontSize: 14, textAlign: "center", color: "#666", marginTop: 5 }}>
        {artist.description}
      </Text>
    </View>
  );
}
