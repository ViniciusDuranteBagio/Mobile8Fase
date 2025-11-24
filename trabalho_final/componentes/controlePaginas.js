import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function PaginationControls({ onNext, onPrev, disableNext, disablePrev, page, totalPages }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev} disabled={disablePrev} style={[styles.button, disablePrev && styles.disabled]}>
        <Text style={styles.buttonText}>Página Anterior</Text>
      </TouchableOpacity>

      <View style={styles.pageInfo}>
        <Text> {totalPages ? `${page} / ${totalPages}` : `Página ${page}`} </Text>
      </View>

      <TouchableOpacity onPress={onNext} disabled={disableNext} style={[styles.button, disableNext && styles.disabled]}>
        <Text style={styles.buttonText}>Próxima Página</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8 },
  button: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#007AFF", borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
  disabled: { backgroundColor: "#c6d6ff" },
  pageInfo: { justifyContent: "center", alignItems: "center", paddingHorizontal: 8 },
});
