import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { colors } from "../../theme/colors";


interface Ingredient {
  name?: string;
  quantity?: string;
  description?: string;
  unit?: string;
}
export function IngredientButton(
  {
    name,
    quantity,
    description,
    unit
  }: Ingredient) {
  return (
    <MuiButton
      style={{
        backgroundColor: "white",
        color: "black",
        fontSize: 14
      }
      }
    >
      {name}: {description} {quantity} {unit}
    </MuiButton>
  );
}
