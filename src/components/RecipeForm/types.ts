export interface RecipeFormProps {
  rid: number;
  update?: boolean;
  name: any;
  description: any;
  instruction: any;
  cooktime: any;
  image: string;
  addRecipe: (data: any) => void;
  updateRecipeState: (data: any, rid: number) => void;
  updateRecipeImage: (recipe: number, imagepath: string) => void;
  onClose: VoidFunction;
  // handleIngredientSubmit: (data: any) => void;
}

export interface RecipeProps {
  name: string;
  description: string;
  ingredients: Array<IngredientProps>;
  instruction: string;
  cooktime: string;
}

export interface IngredientProps {
  name: string;
  quantity: string;
  description: string;
  units: string;
}

//["Breakfast", "Lunch", "Dinner"]
export const labels = [
  { name: "Breakfast", value: 1 },
  { name: "Lunch", value: 2 },
  { name: "Dinner", value: 3 },
];
