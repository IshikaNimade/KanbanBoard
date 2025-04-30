import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  getBoard,
  addColumn,
  addTask,
  deleteTask,
  updateTask,
} from "../services/kanbanService";
import { Board, KanbanContextType, UpdateTaskData } from "../types/types";

export const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

interface KanbanProviderProps {
  children: ReactNode;
}

export const KanbanProvider: React.FC<KanbanProviderProps> = ({ children }) => {
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBoard = async () => {
    setLoading(true);
    try {
      const res = await getBoard();
      setBoard(res);
    } catch (error) {
      console.error("Failed to fetch board:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  const handleAddColumn = async (title: string) => {
    await addColumn(title);
    fetchBoard();
  };

  const handleAddTask = async (
    columnId: string,
    task: { title: string; description: string }
  ) => {
    await addTask(columnId, task);
    fetchBoard();
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    fetchBoard();
  };

  const handleUpdateTask = async (taskId: string, updatedData: UpdateTaskData) => {
    await updateTask(taskId, updatedData);
    fetchBoard();
  };

  return (
    <KanbanContext.Provider
      value={{
        board,
        loading,
        fetchBoard,
        handleAddColumn,
        handleAddTask,
        handleDeleteTask,
        handleUpdateTask,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};
