import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export function IngredientItem({
  name,
  description,
  quantity,
  units,
  onDelete,
}: {
  name: string;
  description: string;
  quantity: string;
  units: string;
  onDelete: VoidFunction;
}) {
  return (
    <div>
      <p>{`${name}: ${description} ${quantity} ${units}`}</p>
      <IconButton aria-label="delete" onClick={onDelete}>
        <Delete />
      </IconButton>
    </div>
  );
}
