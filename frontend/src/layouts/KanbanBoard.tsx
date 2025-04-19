import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Add, DashboardCustomizeRounded } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useKanban from "../hooks/useKanban";
import CustomAddTaskDialog from "../components/CustomAddTaskDialog";
import CustomTaskCard from "../components/CustomTaskCard";
import SortableTaskCard from "../components/SortableTaskCard";
import DroppableColumn from "../components/DroppableColumn";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task, ColumnData, BoardData } from "../types/types";

const KanbanBoard: React.FC = () => {
  const theme = useTheme();
  const { board, loading, handleUpdateTask } = useKanban() as {
    board: BoardData;
    loading: boolean;
    handleUpdateTask: (taskId: string, payload: { columnId: string; order: number }) => Promise<void>;
  };

  const [openTaskDialog, setOpenTaskDialog] = useState<boolean>(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string>("");
  const [columnsWithTasks, setColumnsWithTasks] = useState<ColumnData[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    if (board?.columns && board?.tasks) {
      const mergedData = board.columns.map((column) => {
        const tasksForColumn = board.tasks
          .filter((task) => task.column === column._id)
          .sort((a, b) => a.order - b.order);
        return { ...column, tasks: tasksForColumn };
      });
      setColumnsWithTasks(mergedData);
    }
  }, [board]);

  const handleOpenTaskDialog = (columnId: string) => {
    setSelectedColumnId(columnId);
    setOpenTaskDialog(true);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sourceColumn = columnsWithTasks.find((col) =>
      col.tasks.find((task) => task._id === active.id)
    );
    const destinationColumn = columnsWithTasks.find(
      (col) =>
        col._id === over.id || col.tasks.some((task) => task._id === over.id)
    );

    if (!sourceColumn || !destinationColumn) return;

    const draggedTask = sourceColumn.tasks.find(
      (task) => task._id === active.id
    );
    if (!draggedTask) return;
    const newSourceTasks = sourceColumn.tasks.filter(
      (task) => task._id !== active.id
    );
    let newDestTasks = [...destinationColumn.tasks];

    if (sourceColumn._id === destinationColumn._id) {
      const oldIndex = sourceColumn.tasks.findIndex((t) => t._id === active.id);
      const newIndex = destinationColumn.tasks.findIndex(
        (t) => t._id === over.id
      );
      newDestTasks = arrayMove(destinationColumn.tasks, oldIndex, newIndex);
    } else {
      const overIndex = destinationColumn.tasks.findIndex(
        (t) => t._id === over.id
      );
      const insertIndex = overIndex >= 0 ? overIndex : newDestTasks.length;
      newDestTasks.splice(insertIndex, 0, draggedTask);
    }

    const newColumns = columnsWithTasks.map((col) => {
      if (col._id === sourceColumn._id)
        return { ...col, tasks: newSourceTasks };
      if (col._id === destinationColumn._id)
        return { ...col, tasks: newDestTasks };
      return col;
    });

    setColumnsWithTasks(newColumns);

    await handleUpdateTask(active.id as string, {
      columnId: destinationColumn._id,
      order: newDestTasks.length - 1,
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = board.tasks.find((t) => t._id === taskId);
    if (task) {
      setActiveTask(task);
    }
  };

  const isBoardEmpty = !columnsWithTasks.length;

  return (
    <Box p={3}>
      {loading ? (
        <Box textAlign="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : isBoardEmpty ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="70vh"
          textAlign="center"
          color={theme.palette.primary.main}
        >
          <DashboardCustomizeRounded sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h5" fontWeight="bold">
            No Columns or Tasks Found
          </Typography>
          <Typography variant="body1">
            Start by adding a new column to begin your project.
          </Typography>
        </Box>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={(event) => {
            handleDragEnd(event);
            setActiveTask(null);
          }}
        >
          <Box display="flex" gap={3} overflow="auto" mt={3}>
            {columnsWithTasks.map((column) => (
              <Box
                key={column._id}
                sx={{
                  width: 300,
                  borderRadius: 3,
                  overflow: "hidden",
                  backgroundColor: theme.palette.secondary.main,
                  flexShrink: 0,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: theme.palette.ternery.main,
                    color: theme.palette.primary.main,
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography fontWeight="bold" fontSize="1.4rem">
                    {column.title}
                  </Typography>
                  <IconButton
                    onClick={() => handleOpenTaskDialog(column._id)}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    <Add />
                  </IconButton>
                </Box>

                <DroppableColumn id={column._id}>
                  <SortableContext
                    items={column.tasks.map((task) => task._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {column.tasks.map((task, index) => (
                      <SortableTaskCard
                        key={task._id}
                        task={task}
                        index={index}
                      />
                    ))}
                  </SortableContext>
                </DroppableColumn>
              </Box>
            ))}
          </Box>

          <DragOverlay>
            {activeTask && (
              <Box sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CustomTaskCard task={activeTask} />
              </Box>
            )}
          </DragOverlay>
        </DndContext>
      )}

      <CustomAddTaskDialog
        open={openTaskDialog}
        onClose={() => setOpenTaskDialog(false)}
        columnId={selectedColumnId}
      />
    </Box>
  );
};

export default KanbanBoard;
