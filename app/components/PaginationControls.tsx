import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentPage === 1 && styles.buttonDisabled]}
        onPress={onPrevious}
        disabled={currentPage === 1}
      >
        <Text
          style={[
            styles.buttonText,
            currentPage === 1 && styles.buttonTextDisabled,
          ]}
        >
          ← Página Anterior
        </Text>
      </TouchableOpacity>

      <View style={styles.pageInfo}>
        <Text style={styles.pageText}>
          Página {currentPage} de {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          currentPage === totalPages && styles.buttonDisabled,
        ]}
        onPress={onNext}
        disabled={currentPage === totalPages}
      >
        <Text
          style={[
            styles.buttonText,
            currentPage === totalPages && styles.buttonTextDisabled,
          ]}
        >
          Próxima Página →
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F8F8F8',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#D0D0D0',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: '#888888',
  },
  pageInfo: {
    paddingHorizontal: 8,
  },
  pageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
