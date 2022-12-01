import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { deleteShoppinglist, updateShoppinglist } from "../../requests/recipe";


interface Shopping_list {
  name: string;
  id: number;
  onClose: VoidFunction;
}

export function Shownrecipe(
  {
    name,
    id,
    onClose
  }: Shopping_list) {
  const [buttonname, setbname] = useState("" + name);
  const handleChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const data = event.target;
      setbname(data.value);
    };
  const updateName = (updatedname: string) => {
    updateShoppinglist(updatedname, id);
  };
  const deleteList = () => {
    deleteShoppinglist(id);
  };
  return (
    <><MuiButton
      style={{
        backgroundColor: "white",
        color: "black",
        fontSize: 14
      }}
      onClick={() => {
        updateName("updated name");
      }}
    >
      Edit Name
    </MuiButton>
      <MuiButton
        style={{
          backgroundColor: "white",
          color: "black",
          fontSize: 14
        }}
        onClick={() => {
          deleteList();
        }}
      >
        Delete List
      </MuiButton>
      <MuiButton
        style={{
          backgroundColor: "white",
          color: "black",
          fontSize: 14
        }}
        onClick={() => {
          onClose();
        }}
      >
        Close
      </MuiButton></>
  );
}
