import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { ProgressDots } from "@/src/components/requestedCommissions/ProgressDots";

type CommissionCardProps = {
  title: string;
  image: string;
  artistUsername: string;
  totalSteps: number;
  currentStep: number;
};

export const CommissionCard: React.FC<CommissionCardProps> = ({ title, image, artistUsername, totalSteps, currentStep }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>by @{artistUsername}</Text>
        </View>
        <ProgressDots totalSteps={totalSteps} currentStep={currentStep} />
        <Text>{currentStep}/{totalSteps}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 320,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
  },
  content: {
    padding: 12,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  artist: {
    fontSize: 12,
    color: "#666",
  },
  progressContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
