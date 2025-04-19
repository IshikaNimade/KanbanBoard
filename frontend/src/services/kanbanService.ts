import api from "../api/api";
import { Column, Task, UpdateTaskData, Board } from "../types/types";

export const getBoard = async (): Promise<Board> => {
  try {
    const response = await api.get("/board");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch board.");
    }
    throw new Error("Failed to fetch board.");
  }
};

export const addColumn = async (columnData: string): Promise<Column> => {
  try {
    const response = await api.post("/board/column", { title: columnData });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to add column.");
    }
    throw new Error("Failed to add column.");
  }
};

export const addTask = async (
  columnId: string,
  taskData: { title: string; description: string }
): Promise<Task> => {
  try {
    const response = await api.post("/board/task", {
      column: columnId,
      title: taskData.title,
      description: taskData.description,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to add task.");
    }
    throw new Error("Failed to add task.");
  }
};

export const updateTask = async (
  taskId: string,
  updatedData: UpdateTaskData
): Promise<Task> => {
  try {
    const response = await api.patch(`/board/task/${taskId}`, {
      columnId: updatedData.columnId,
      order: updatedData.order,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to update task.");
    }
    throw new Error("Failed to update task.");
  }
};

export const deleteTask = async (taskId: string): Promise<boolean> => {
  try {
    await api.delete(`/board/task/${taskId}`);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to delete task.");
    }
    throw new Error("Failed to delete task.");
  }
};
