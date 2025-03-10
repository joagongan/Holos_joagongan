import { AuthenticationContext } from "@/app/context/AuthContext";
import { useContext } from "react";
import { Alert, Platform } from "react-native";

const isLaptop = Platform.OS === 'web';
const showAlert = (msg: string) => {
  if (isLaptop) {
    window.alert(msg);
  } else {
    Alert.alert(msg);
  }
}

type Commission = {
  id: number | null;
  name: string;
  description: string;
  price: string;
  status: "REQUESTED" | "APPROVED" | "COMPLETED"; // TODO Cambiar a correcto
  numMilestones: string;
  acceptedDateByArtist: Date | null;
  artist: string;
  paymentArrangement: "INITIAL" | "FULL" | "PARTIAL"; // TODO Cambiar a correcto
  statusKanbanOrder: number | null;
  client: string | null;
};

export const handleSubmit = async (props: { commission: Partial<Commission> }) => {
  const { commission } = props;

  if (!commission.name?.trim() || !commission.description?.trim() || !commission.price?.trim()) {
    showAlert("Todos los campos son obligatorios.");
    return;
  }

  fetch("http://localhost:8080/api/v1/commisions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...commission, price: parseInt(commission.price, 10) }),
  })
    .then((response) => response.text()) // Read response as text
    .then((text) => {
      console.log("Server Response:", text); // Debugging

      try {
        const json = JSON.parse(text);
        showAlert(json.message || "Solicitud enviada con éxito");
      } catch {
        showAlert("Solicitud enviada con éxito");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showAlert("Hubo un error al enviar la solicitud");
    });
};
