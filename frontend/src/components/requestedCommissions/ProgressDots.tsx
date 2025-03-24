import React from "react";
import { View, StyleSheet, ViewStyle, Text } from "react-native";

type ProgressDotsProps = {
    totalSteps: number;
    currentStep: number;
    activeColor?: string;
  };
  
  export const ProgressDots: React.FC<ProgressDotsProps> = ({ totalSteps, currentStep, activeColor = "#F05A7E"}) => {
    return (
      <View style={styles.container}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[ styles.dot, {
                backgroundColor: index < currentStep ? activeColor : "#ccc",
                borderWidth: index === currentStep ? 2 : 0,
                borderColor: index === currentStep ? "#999" : "transparent",},
            ]}
          />
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
    },
    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
    },
  });
  