import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTask } from '@/context/TaskContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function AddTaskModal() {
  const { addTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título da tarefa é obrigatório');
      return;
    }

    try {
      await addTask({
        title: title.trim(),
        description: description.trim(),
        category: category.trim() || 'Geral',
        priority,
        completed: false,
      });

      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a tarefa. Tente novamente.');
    }
  };

  const getPriorityColor = (priorityLevel: string) => {
    switch (priorityLevel) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ThemedText style={styles.cancelButton}>Cancelar</ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle">Nova Tarefa</ThemedText>
        <TouchableOpacity onPress={handleSave}>
          <ThemedText style={styles.saveButton}>Salvar</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Título *</ThemedText>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
              color: isDark ? '#fff' : '#000'
            }]}
            value={title}
            onChangeText={setTitle}
            placeholder="Digite o título da tarefa"
            placeholderTextColor="#999"
            maxLength={100}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Descrição</ThemedText>
          <TextInput
            style={[styles.textArea, { 
              backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
              color: isDark ? '#fff' : '#000'
            }]}
            value={description}
            onChangeText={setDescription}
            placeholder="Digite uma descrição (opcional)"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            maxLength={500}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Categoria</ThemedText>
          <TextInput
            style={[styles.input, { 
              backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa',
              color: isDark ? '#fff' : '#000'
            }]}
            value={category}
            onChangeText={setCategory}
            placeholder="Ex: Trabalho, Pessoal, Estudos"
            placeholderTextColor="#999"
            maxLength={50}
          />
        </ThemedView>

        <ThemedView style={styles.inputGroup}>
          <ThemedText style={styles.inputLabel}>Prioridade</ThemedText>
          <ThemedView style={styles.priorityContainer}>
            {(['low', 'medium', 'high'] as const).map((priorityLevel) => (
              <TouchableOpacity
                key={priorityLevel}
                style={[
                  styles.priorityButton,
                  { borderColor: getPriorityColor(priorityLevel) },
                  priority === priorityLevel && { backgroundColor: getPriorityColor(priorityLevel) }
                ]}
                onPress={() => setPriority(priorityLevel)}
              >
                <ThemedText style={[
                  styles.priorityButtonText,
                  { color: getPriorityColor(priorityLevel) },
                  priority === priorityLevel && { color: 'white' }
                ]}>
                  {priorityLevel === 'low' ? 'Baixa' : 
                   priorityLevel === 'medium' ? 'Média' : 'Alta'}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e8ed',
  },
  cancelButton: {
    color: '#ff4757',
    fontSize: 16,
  },
  saveButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  textArea: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    textAlignVertical: 'top',
    height: 100,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
