import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";

interface DroppableColumnProps {
    id: string;
    children: React.ReactNode;
}

const DroppableColumn: React.FC<DroppableColumnProps> = ({ id, children }) => {
    const { setNodeRef } = useDroppable({ id });
    return (
        <Box ref={setNodeRef} sx={{ p: 2, minHeight: 100 }}>
            {children}
        </Box>
    );
};

export default DroppableColumn;