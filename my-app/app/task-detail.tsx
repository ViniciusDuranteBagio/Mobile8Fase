import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTask } from '@/context/TaskContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, updateTask, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const task = tasks.find(t => t.id === id);

  useEffect(() => {
    if (task) {
      setEditTitle(task.title);
      setEditDescription(task.description);
      setEditCategory(task.category);
      setEditPriority(task.priority);
    }
  }, [task]);

  if (!task) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
        <ThemedView style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#ff4757" />
          <ThemedText style={styles.errorText}>Tarefa não encontrada</ThemedText>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ThemedText style={styles.backButtonText}>Voltar</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SafeAreaView>
    );
  }

  const handleSave = async () => {
    if (!editTitle.trim()) {
      Alert.alert('Erro', 'O título da tarefa é obrigatório');
      return;
    }

    await updateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      category: editCategory.trim() || 'Geral',
      priority: editPriority,
    });

    setIsEditing(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja excluir a tarefa "${task.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            deleteTask(task.id);
            router.back();
          }
        }
      ]
    );
  };

  const toggleCompleted = async () => {
    await updateTask(task.id, { completed: !task.completed });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Indefinida';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? '#000' : '#fff' }]}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        
        <ThemedText type="subtitle" style={styles.headerTitle}>
          {isEditing ? 'Editar Tarefa' : 'Detalhes da Tarefa'}
        </ThemedText>
        
        <TouchableOpacity 
          onPress={() => setIsEditing(!isEditing)}
          style={styles.headerButton}
        >
          <Ionicons 
            name={isEditing ? 'close' : 'create-outline'} 
            size={24} 
            color={isDark ? '#fff' : '#000'} 
          />
        </TouchableOpacity>
      </ThemedView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <ThemedView style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
          <TouchableOpacity onPress={toggleCompleted} style={styles.statusContainer}>
            <Ionicons
              name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={32}
              color={task.completed ? '#2ed573' : '#999'}
            />
            <ThemedView style={styles.statusTextContainer}>
              <ThemedText style={styles.statusLabel}>
                {task.completed ? 'Concluída' : 'Pendente'}
              </ThemedText>
              <ThemedText style={styles.statusHint}>
                Toque para {task.completed ? 'marcar como pendente' : 'concluir'}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        </ThemedView>

        {/* Title */}
        <ThemedView style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
          <ThemedText style={styles.fieldLabel}>Título</ThemedText>
          {isEditing ? (
            <TextInput
              style={[styles.input, { 
                backgroundColor: isDark ? '#2a2a2a' : '#fff',
                color: isDark ? '#fff' : '#000'
              }]}
              value={editTitle}
              onChangeText={setEditTitle}
              placeholder="Digite o título da tarefa"
              placeholderTextColor="#999"
              maxLength={100}
            />
          ) : (
            <ThemedText 
              style={[
                styles.fieldValue,
                task.completed && styles.completedText
              ]}
            >
              {task.title}
            </ThemedText>
          )}
        </ThemedView>

        {/* Description */}
        <ThemedView style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
          <ThemedText style={styles.fieldLabel}>Descrição</ThemedText>
          {isEditing ? (
            <TextInput
              style={[styles.textArea, { 
                backgroundColor: isDark ? '#2a2a2a' : '#fff',
                color: isDark ? '#fff' : '#000'
              }]}
              value={editDescription}
              onChangeText={setEditDescription}
              placeholder="Digite uma descrição (opcional)"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={500}
            />
          ) : (
            <ThemedText 
              style={[
                styles.fieldValue,
                !task.description && styles.emptyValue,
                task.completed && styles.completedText
              ]}
            >
              {task.description || 'Sem descrição'}
            </ThemedText>
          )}
        </ThemedView>

        {/* Category and Priority */}
        <ThemedView style={styles.row}>
          <ThemedView style={[styles.card, styles.halfCard, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
            <ThemedText style={styles.fieldLabel}>Categoria</ThemedText>
            {isEditing ? (
              <TextInput
                style={[styles.input, { 
                  backgroundColor: isDark ? '#2a2a2a' : '#fff',
                  color: isDark ? '#fff' : '#000'
                }]}
                value={editCategory}
                onChangeText={setEditCategory}
                placeholder="Categoria"
                placeholderTextColor="#999"
                maxLength={50}
              />
            ) : (
              <ThemedText style={styles.fieldValue}>
                📂 {task.category}
              </ThemedText>
            )}
          </ThemedView>

          <ThemedView style={[styles.card, styles.halfCard, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
            <ThemedText style={styles.fieldLabel}>Prioridade</ThemedText>
            {isEditing ? (
              <ThemedView style={styles.priorityContainer}>
                {(['low', 'medium', 'high'] as const).map((priority) => (
                  <TouchableOpacity
                    key={priority}
                    style={[
                      styles.priorityChip,
                      { borderColor: getPriorityColor(priority) },
                      editPriority === priority && { backgroundColor: getPriorityColor(priority) }
                    ]}
                    onPress={() => setEditPriority(priority)}
                  >
                    <ThemedText style={[
                      styles.priorityChipText,
                      { color: getPriorityColor(priority) },
                      editPriority === priority && { color: 'white' }
                    ]}>
                      {getPriorityLabel(priority)}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ThemedView>
            ) : (
              <ThemedView style={styles.priorityDisplay}>
                <View 
                  style={[
                    styles.priorityDot,
                    { backgroundColor: getPriorityColor(task.priority) }
                  ]} 
                />
                <ThemedText style={styles.fieldValue}>
                  {getPriorityLabel(task.priority)}
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>

        {/* Dates */}
        <ThemedView style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}>
          <ThemedText style={styles.fieldLabel}>Informações</ThemedText>
          <ThemedView style={styles.dateContainer}>
            <ThemedView style={styles.dateItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <ThemedText style={styles.dateText}>
                Criada em {formatDate(task.createdAt)}
              </ThemedText>
            </ThemedView>
            {task.updatedAt.getTime() !== task.createdAt.getTime() && (
              <ThemedView style={styles.dateItem}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <ThemedText style={styles.dateText}>
                  Atualizada em {formatDate(task.updatedAt)}
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>
      </ScrollView>

      {/* Action Buttons */}
      {isEditing ? (
        <ThemedView style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => setIsEditing(false)}
          >
            <ThemedText style={styles.cancelButtonText}>Cancelar</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSave}
          >
            <ThemedText style={styles.saveButtonText}>Salvar</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      ) : (
        <ThemedView style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Ionicons name="trash-outline" size={20} color="white" />
            <ThemedText style={styles.deleteButtonText}>Excluir</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e1e8ed',
  },
  headerButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfCard: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  statusHint: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    lineHeight: 22,
  },
  emptyValue: {
    color: '#999',
    fontStyle: 'italic',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
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
    minHeight: 100,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  priorityChip: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
  },
  priorityChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priorityDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dateContainer: {
    gap: 8,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: '600',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff4757',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});