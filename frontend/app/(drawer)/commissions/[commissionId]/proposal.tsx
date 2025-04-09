import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Button, IconButton, TextInput } from "react-native-paper";
import * as yup from "yup";
import { useCommissionDetails } from "@/src/hooks/useCommissionDetails";
import { reject, toPay, waiting } from "@/src/services/commisionApi";
import { priceValidationSchema } from "@/src/utils/priceValidation";
import { AuthenticationContext } from "@/src/contexts/AuthContext";
import PaymentDetails from "@/src/components/checkout/PaymentDetails";
import WIPPlaceholder from "@/src/components/WorkInProgress";
import colors from "@/src/constants/colors";
import { BaseUser, StatusCommission } from "@/src/constants/CommissionTypes";
import LoadingScreen from "@/src/components/LoadingScreen";
import { BASE_URL } from "@/src/constants/api";
import { getUser } from "@/src/services/userApi";
import UserPanel from "@/src/components/proposal/UserPanel";

export default function CommissionDetailsScreen() {
  const { commissionId } = useLocalSearchParams();
  const { loggedInUser } = useContext(AuthenticationContext);
  const {
    commission,
    setCommission,
    loading,
    errorMessage,
    setErrorMessage,
    refreshCommission,
  } = useCommissionDetails(commissionId);

  const navigation = useNavigation();
  const [newPrice, setNewPrice] = useState("");
  const [showEditCard, setShowEditCard] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAccept = async () => {
    if (!commission) return;
    try {
      await toPay(commission.id, loggedInUser.token);
      await refreshCommission();
      alert("Comisión aceptada");
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleReject = async () => {
    if (!commission) return;
    try {
      await reject(commission.id, loggedInUser.token);
      await refreshCommission();
      alert("Comisión rechazada");
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const handleSavePrice = async () => {
    if (!commission || !loggedInUser.token) return;
    setSaving(true);
    try {
      const parsedPrice = parseFloat(newPrice);
      const price = isClient
        ? parseFloat((parsedPrice / 1.06).toFixed(2))
        : parsedPrice;

      await priceValidationSchema.validate({ newPrice });

      const updatedCommission = { ...commission, price };
      await waiting(commission.id, updatedCommission, loggedInUser.token);

      setCommission(updatedCommission);
      await refreshCommission();
      setShowEditCard(false);
      alert("Precio actualizado con éxito");
    } catch (error: any) {
      const message =
        error instanceof yup.ValidationError
          ? error.message
          : error.message || "Hubo un error al actualizar el precio";

      setErrorMessage(message);
      console.error("Error al actualizar el precio:", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (commission) {
      const basePrice = commission.price;
      const displayedPrice = isClient
        ? (basePrice * 1.06).toFixed(2)
        : basePrice.toFixed(2);

      setNewPrice(displayedPrice);
    }
  }, [commission]);

  useEffect(() => {
    navigation.setOptions({
      title: commission?.name
        ? `Negociación obra: ${commission.name}`
        : "Negociación",
    });
  }, [commission?.name, navigation]);

  if (!commission) return <WIPPlaceholder />;
  if (!loggedInUser) return <LoadingScreen />;

  const yourTurn =
    (commission.artistUsername === loggedInUser.username &&
      (commission.status === StatusCommission.WAITING_ARTIST ||
        commission.status === StatusCommission.REQUESTED)) ||
    (commission.clientUsername === loggedInUser.username &&
      commission.status === StatusCommission.WAITING_CLIENT);

  const isClient = loggedInUser.username === commission.clientUsername;

  const basePrice = commission.price;
  const displayedPrice = isClient
    ? (basePrice * 1.06).toFixed(2)
    : basePrice.toFixed(2);

  const parsedInput = parseFloat(newPrice);
  const canSend =
    !saving &&
    !isNaN(parsedInput) &&
    newPrice.trim() !== "" &&
    parseFloat(newPrice) !== parseFloat(displayedPrice);

  return (
    <View style={styles.container}>
      <View style={styles.sides}>
        <PaymentDetails commission={commission} />
      </View>
      <View style={styles.sides}>
        <View style={styles.card}>
          <View style={{ flexDirection: "row" }}>
            {/* <UserPanel user={commission.client} />
            <UserPanel user={commission.artist} /> */}
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>TODO</View>
        </View>
        {showEditCard ? (
          <View style={[styles.card, { alignItems: "center" }]}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <IconButton
                  icon="arrow-left"
                  iconColor={colors.contentStrong}
                  onPress={() => setShowEditCard(false)}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.label}>¿Cambiar precio?</Text>
              </View>
              <View style={{ flex: 1 }} />
            </View>

            <Text style={{ color: colors.contentStrong, paddingBottom: 10 }}>
              ¡Puedes proponer otro si crees que el actual no está bien!
            </Text>
            <TextInput
              value={newPrice}
              onChangeText={setNewPrice}
              mode="outlined"
              keyboardType="numeric"
              placeholder="€"
              outlineColor={colors.brandPrimary}
              activeOutlineColor={colors.brandPrimary}
              returnKeyType="done"
              onSubmitEditing={handleSavePrice}
              theme={{ roundness: 999 }}
              style={{ backgroundColor: "transparent" }}
              right={
                <TextInput.Icon
                  icon="send"
                  onPress={canSend ? handleSavePrice : undefined}
                  color={canSend ? colors.brandPrimary : colors.surfaceBase}
                  disabled={!canSend}
                />
              }
            />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : (
          <View style={[styles.card, { alignItems: "center" }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: colors.contentStrong,
                }}
              >
                {isClient
                  ? parseFloat(newPrice || "0").toFixed(2)
                  : (parseFloat(newPrice || "0") * 1.06).toFixed(2)}{" "}
                €
              </Text>
              {yourTurn && (
                <IconButton
                  onPress={() => setShowEditCard(true)}
                  icon="pencil"
                  iconColor={colors.brandPrimary}
                />
              )}
            </View>
            <Text
              style={{
                color: colors.contentStrong,
                fontStyle: "italic",
              }}
            >
              ¡Precio total con tarifa incluida!
            </Text>
            {yourTurn && (
              <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                <Button
                  onPress={handleAccept}
                  buttonColor={colors.contentStrong}
                  textColor="white"
                >
                  Aceptar
                </Button>
                <Button
                  onPress={handleReject}
                  buttonColor={colors.brandPrimary}
                  textColor="white"
                >
                  Rechazar
                </Button>
              </View>
            )}
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {isClient ? (
          <View style={[styles.card, { gap: 20 }]}>
            <View>
              <Text style={{ color: colors.brandPrimary, fontSize: 16 }}>
                💰 Tú pagarás: {parseFloat(newPrice || "0").toFixed(2)}€
              </Text>
              <Text
                style={{ color: colors.contentStrong, fontStyle: "italic" }}
              >
                ¡Este es el monto que debes abonar!
              </Text>
            </View>
          </View>
        ) : (
          <View style={[styles.card, { gap: 20 }]}>
            <View>
              <Text style={{ color: colors.brandPrimary, fontSize: 16 }}>
                🎨 Tú recibes: {parseFloat(newPrice || "0").toFixed(2)}€
              </Text>
              <Text
                style={{ color: colors.contentStrong, fontStyle: "italic" }}
              >
                ¡Este será el monto que obtendrás una vez completada la
                comisión!
              </Text>
            </View>
            <View>
              <Text style={{ color: colors.brandPrimary, fontSize: 16 }}>
                💰 Cliente paga:{" "}
                {(parseFloat(newPrice || "0") * 1.06).toFixed(2)}€
              </Text>
              <Text
                style={{ color: colors.contentStrong, fontStyle: "italic" }}
              >
                ¡Este es el monto que el cliente abonará!
              </Text>
            </View>
          </View>
        )}
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
  sides: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    padding: "10%",
    gap: 33,
  },
  totalPrice: {
    fontSize: 16,
    color: colors.contentStrong,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.brandPrimary,
  },
  errorText: {
    color: colors.brandPrimary,
    marginTop: 15,
  },
  card: {
    padding: 25,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: colors.brandPrimary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 6,
  },
});
