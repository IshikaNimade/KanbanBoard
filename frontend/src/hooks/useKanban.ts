import { useContext } from "react";
import { KanbanContext } from "../context/KanbanContext";
import { KanbanContextType } from "../types/types";

const useKanban = (): KanbanContextType => {
  const context = useContext(KanbanContext);

  if (!context) {
    throw new Error("useKanban must be used within a KanbanProvider");
  }

  return context;
};

export default useKanban;
