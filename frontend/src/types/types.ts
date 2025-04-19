export interface UserData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  email: string;
}

export interface Column {
  _id: string;
  title: string;
}

export interface Task {
  _id: string;
  column: string;
  title: string;
  description: string;
  order: number;
}

export interface UpdateTaskData {
  columnId: string;
  order: number;
}

export interface Board {
  columns: Column[];
  tasks: Task[];
}

export interface ColumnData {
  _id: string;
  title: string;
  tasks: Task[];
}

export interface BoardData {
  columns: Omit<Column, "tasks">[];
  tasks: Task[];
}

export interface PrivateRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any;
}

export interface AuthUser {
  email: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: { email: string; password: string }) => Promise<any>;
  register: (userData: { email: string; password: string }) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface KanbanContextType {
  board: Board | null;
  loading: boolean;
  fetchBoard: () => Promise<void>;
  handleAddColumn: (title: string) => Promise<void>;
  handleAddTask: (columnId: string, task: { title: string; description: string }) => Promise<void>;
  handleDeleteTask: (taskId: string) => Promise<void>;
  handleUpdateTask: (taskId: string, updatedData: UpdateTaskData) => Promise<void>;
}


