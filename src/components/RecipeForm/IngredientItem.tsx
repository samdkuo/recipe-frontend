import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export function IngredientItem({
  name,
  adjective,
  quantity,
  unit,
  onDelete,
}: {
  name: string;
  adjective: string;
  quantity: string;
  unit: string;
  onDelete: VoidFunction;
}) {
  return (
    <div>
      <p>{`${name}: ${adjective} ${quantity} ${unit}`}</p>
      <IconButton aria-label="delete" onClick={onDelete}>
        <Delete />
      </IconButton>
    </div>
  );
}
