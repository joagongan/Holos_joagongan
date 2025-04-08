import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  rejectCommission,
  getCommissionById,
  requestChangesCommission,
  toPayCommission,
  waitingCommission,
} from "@/src/services/commisionApi";
import { CommissionDTO } from "@/src/constants/CommissionTypes";
import { AuthenticationContext } from "@/src/contexts/AuthContext";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import * as yup from "yup";
import PaymentDetails from "@/src/components/checkout/PaymentDetails";
import LoadingScreen from "@/src/components/LoadingScreen";
import colors from "@/src/constants/colors";
import { Button } from "react-native-paper";

export default function CommissionDetailsScreen() {
  const { commissionId } = useLocalSearchParams();
  const { loggedInUser } = useContext(AuthenticationContext);
  const router = useRouter();
  const navigation = useNavigation();

  const [commission, setCommission] = useState<CommissionDTO | null>(null);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const priceValidationSchema = yup.object().shape({
    newPrice: yup
      .string()
      .required("El precio es obligatorio")
      .matches(
        /^\d+(\.\d{1,2})?$/,
        "El precio debe ser un número con hasta 2 decimales"
      ),
  });

  useEffect(() => {
    const fetchCommission = async () => {
      try {
        if (commissionId) {
          const data = await getCommissionById(Number(commissionId));
          setCommission(data);
          setNewPrice(data.price.toString());
          setTotalPrice(data.price + data.price * 0.06);
        }
      } catch (error) {
        router.push(`/`);
      } finally {
        setLoading(false);
      }
    };

    fetchCommission();
  }, [commissionId]);

  useEffect(() => {
    const price = parseFloat(newPrice) || 0;
    setTotalPrice(price + price * 0.06);
  }, [newPrice]);

  const handleAccept = async () => {
    if (commission) {
      try {
        await toPayCommission(commission.id, loggedInUser.token);
        alert("Comisión aceptada");
      } catch (error: any) {
        let errorMessage = "Hubo un error al aceptar la comisión";
        if (error.response?.data) {
          if (typeof error.response.data === "string") {
            errorMessage = error.response.data.replace(/^Error:\s*/, "");
          } else if (
            typeof error.response.data === "object" &&
            error.response.data.message
          ) {
            errorMessage = error.response.data.message;
          }
        }
        setErrorMessage(errorMessage);
      }
    }
  };

  const handleReject = async () => {
    if (commission) {
      try {
        await rejectCommission(commission.id, loggedInUser.token);
        alert("Comisión rechazada");
      } catch (error: any) {
        let errorMessage = "Hubo un error al rechazar la comisión";
        if (error.response?.data) {
          if (typeof error.response.data === "string") {
            errorMessage = error.response.data.replace(/^Error:\s*/, "");
          } else if (
            typeof error.response.data === "object" &&
            error.response.data.message
          ) {
            errorMessage = error.response.data.message;
          }
        }
        setErrorMessage(errorMessage);
      }
    }
  };

  const handleSavePrice = async () => {
    if (!commission || !commission.id || !loggedInUser.token) return;

    try {
      if (isEditingPrice) {
        await priceValidationSchema.validate({ newPrice });
        const updatedCommission = {
          ...commission,
          price: parseFloat(newPrice),
        };
        await requestChangesCommission(
          commission.id,
          updatedCommission,
          loggedInUser.token
        );
        await waitingCommission(commission.id, loggedInUser.token);
        setIsEditingPrice(!isEditingPrice);
      }
      alert("Precio actualizado con éxito");
    } catch (error: any) {
      let errorMessage = "Hubo un error al actualizar el precio";

      if (error instanceof yup.ValidationError) {
        errorMessage = error.message;
      } else if (error.response?.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data.replace(/^Error:\s*/, "");
        } else if (
          typeof error.response.data === "object" &&
          error.response.data.message
        ) {
          errorMessage = error.response.data.message;
        }
      }

      setErrorMessage(errorMessage);
      console.error("Error al actualizar el precio:", error);
    }
  };

  const handleEditPrice = () => {
    setIsEditingPrice(true);
  };

  useEffect(() => {
    navigation.setOptions({
      title: commission?.name
        ? `Negociación obra: ${commission.name}`
        : "Negociación",
    });
  }, [commission?.name, navigation]);

  if (!commission) {
    return (
      <View>
        <Text style={styles.errorText}>
          No se encontraron detalles para esta comisión.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <PaymentDetails commission={commission} />
      </View>
      <View style={styles.content}>
        <Text style={styles.errorText}>{errorMessage}</Text>

        <Text style={styles.priceLabel}>Fijar precio</Text>
        {isEditingPrice ? (
          <TextInput
            style={styles.priceInput}
            value={newPrice}
            onChangeText={setNewPrice}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.priceInput}>{newPrice}€</Text>
        )}
        <TouchableOpacity
          style={styles.adjustButton}
          onPress={isEditingPrice ? handleSavePrice : handleEditPrice}
        >
          <Text style={styles.buttonText}>
            {isEditingPrice ? "GUARDAR" : "AJUSTAR PRECIO"}
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <Button onPress={handleAccept}>Aceptar</Button>
          <Button onPress={handleReject}>Rechazar</Button>
        </View>

        <Text style={styles.totalPrice}>Total = €{totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.surfaceMuted,
    width: "100%",
  },
  content: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    padding: "10%",
  },
  priceLabel: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#183771",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  clientImage: { width: 150, height: 150, borderRadius: 8 },
  imagePlaceholderText: { fontSize: 14, color: "#888", textAlign: "center" },
  priceInput: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#183771",
    textAlign: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 5,
    padding: 8,
    width: "80%",
  },
  adjustButton: {
    backgroundColor: "#D4A5F7",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  rejectButton: {
    backgroundColor: "#F44336",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
