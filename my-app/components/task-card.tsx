import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Task } from '@/context/TaskContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onPress, onToggle, onDelete }: TaskCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return 'alert-circle';
      case 'medium': return 'warning';
      case 'low': return 'checkmark-circle';
      default: return 'help-circle';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.taskCard, { backgroundColor: isDark ? '#1a1a1a' : '#f8f9fa' }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ThemedView style={styles.taskHeader}>
        <TouchableOpacity
          onPress={onToggle}
          style={styles.checkboxContainer}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
            size={24}
            color={task.completed ? '#2ed573' : '#999'}
          />
        </TouchableOpacity>
        
        <ThemedView style={styles.taskContent}>
          <ThemedText 
            style={[
              styles.taskTitle,
              task.completed && styles.taskTitleCompleted
            ]}
            numberOfLines={2}
          >
            {task.title}
          </ThemedText>
          {task.description ? (
            <ThemedText 
              style={[
                styles.taskDescription,
                task.completed && styles.taskDescriptionCompleted
              ]}
              numberOfLines={2}
            >
              {task.description}
            </ThemedText>
          ) : null}
        </ThemedView>
        
        <ThemedView style={styles.taskMeta}>
          <Ionicons
            name={getPriorityIcon(task.priority)}
            size={16}
            color={getPriorityColor(task.priority)}
          />
          <TouchableOpacity
            onPress={onDelete}
            style={styles.deleteButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="trash-outline" size={20} color="#ff4757" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      
      {task.category && (
        <ThemedText style={styles.taskCategory}>📂 {task.category}</ThemedText>
      )}
      
      <ThemedView style={styles.taskFooter}>
        <ThemedText style={styles.taskDate}>
          {new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          }).format(task.updatedAt)}
        </ThemedText>
        
        <ThemedView style={[
          styles.priorityBadge, 
          { backgroundColor: getPriorityColor(task.priority) + '20' }
        ]}>
          <ThemedText style={[
            styles.priorityBadgeText, 
            { color: getPriorityColor(task.priority) }
          ]}>
            {task.priority === 'low' ? 'Baixa' : 
             task.priority === 'medium' ? 'Média' : 'Alta'}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkboxContainer: {
    paddingTop: 2,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    lineHeight: 20,
  },
  taskDescriptionCompleted: {
    color: '#999',
  },
  taskMeta: {
    alignItems: 'center',
    gap: 8,
  },
  deleteButton: {
    padding: 4,
  },
  taskCategory: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e1e8ed',
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});