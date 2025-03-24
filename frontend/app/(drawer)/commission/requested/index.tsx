import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, Text, ActivityIndicator, StyleSheet } from "react-native";
import { CommissionCard } from "@/src/components/requestedCommissions/CommissionCard";
import { getClientCommissions } from "@/src/services/commisionApi";
import { AuthenticationContext } from "@/src/contexts/AuthContext";
import ProtectedRoute from "@/src/components/ProtectedRoute";
import LoadingScreen from "@/src/components/LoadingScreen";

type ClientCommission = {
    name: string;
    image: string; // base64
    artistUsername: string;
    totalSteps: number;
    currentStep: number;
  };  

export default function ClientCommissionsScreen() {
  const [commissions, setCommissions] = useState<ClientCommission[]>([]);
  const [loading, setLoading] = useState(true);
  const { loggedInUser } = useContext(AuthenticationContext);

  useEffect(() => {
    getClientCommissions(loggedInUser.token)
      .then(setCommissions)
      .catch((err:string) => {
        console.error("Failed to fetch commissions", err);
        // TODO: add toast here!
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <ProtectedRoute allowedRoles={['CLIENT']}>
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.cardGrid}>
                {commissions.length === 0 ? (
                    <Text style={styles.emptyText}>¡Aún no hiciste ningún encargo! 😿</Text>
                ) : (
                    commissions.map((commission, index) => (
                    <CommissionCard
                        key={index}
                        title={commission.name}
                        image={`data:image/jpeg;base64,${commission.image}`}
                        artistUsername={commission.artistUsername}
                        totalSteps={commission.totalSteps}
                        currentStep={commission.currentStep}
                    />
                    ))
                )}
            </View>
        </ScrollView>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#999",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
  },
});
