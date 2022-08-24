export interface RecipeFormProps {
  rid?: number;
  update?: boolean;
  name: any;
  description: any;
  instruction: any;
  cooktime: any;
  addRecipe: (data: any) => void;
  updateRecipeState: (data: any, rid: number) => void;
  handleIngredientSubmit: (data: any) => void;
}

export interface IngredientProps {
  name: string;
  quantity: string;
  description: string;
  units: string;
}
