import { useCallback, useState, useMemo } from "react";
import { Stack, TextField, MenuItem, Button } from "@mui/material";
import { IngredientProps } from "./types";

export function IngredientInput({
  handleIngredientSubmit,
}: {
  handleIngredientSubmit: (ingredient: IngredientProps) => void;
}) {
  const initialValues = useMemo(() => {
    return {
      name: "",
      adjective: "",
      quantity: "",
      unit: "",
    };
  }, []);
  const [ingredient, setIngredient] = useState(initialValues);
  const units = ["tsp", "tbsp", "c", "fl oz", "gal", "pt", "qt"];

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const data = event.target;
      setIngredient({ ...ingredient, [data.name]: data.value });
    },
    [ingredient]
  );

  const handleSubmit = useCallback(() => {
    handleIngredientSubmit(ingredient);
    setIngredient(initialValues);
  }, [ingredient, initialValues, handleIngredientSubmit]);

  return (
    <Stack spacing={2}>
      <label>Add Ingredients</label>
      <Stack direction="row" spacing={1}>
        <TextField
          name="name"
          label="Ingredient"
          onChange={handleChange}
          value={ingredient.name}
          fullWidth
        />
        <TextField
          name="adjective"
          label="Description"
          onChange={handleChange}
          value={ingredient.adjective}
          fullWidth
        />
        <TextField
          name="quantity"
          label="quantity"
          type="number"
          onChange={handleChange}
          value={ingredient.quantity}
          style={{ width: 250 }}
        />
        <TextField
          name="unit"
          label="unit"
          select
          onChange={handleChange}
          value={ingredient.unit}
          style={{ width: 250 }}
        >
          {units.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Button onClick={handleSubmit}>Add</Button>
      </Stack>
    </Stack>
  );
}
