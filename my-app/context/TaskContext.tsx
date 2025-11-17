import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  loading: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const STORAGE_KEY = '@tasks_storage';

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar tarefas do AsyncStorage
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        setTasks(parsedTasks);
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = async (tasksToSave: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasksToSave));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
    }
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTask: Task = {
        ...taskData,
        id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setTasks(prevTasks => {
        const updatedTasks = [...prevTasks, newTask];
        saveTasks(updatedTasks);
        return updatedTasks;
      });
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      throw error;
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task =>
          task.id === id 
            ? { ...task, ...updates, updatedAt: new Date() }
            : task
        );
        saveTasks(updatedTasks);
        return updatedTasks;
      });
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.filter(task => task.id !== id);
        saveTasks(updatedTasks);
        return updatedTasks;
      });
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      throw error;
    }
  };

  const toggleTask = async (id: string) => {
    try {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task =>
          task.id === id 
            ? { ...task, completed: !task.completed, updatedAt: new Date() }
            : task
        );
        saveTasks(updatedTasks);
        return updatedTasks;
      });
    } catch (error) {
      console.error('Erro ao alternar tarefa:', error);
      throw error;
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      loading,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask deve ser usado dentro de TaskProvider');
  }
  return context;
}