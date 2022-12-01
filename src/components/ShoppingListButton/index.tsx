import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  Dialog,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useModalState } from "../../hooks";
import { Shownrecipe } from "../Shownrecipe";


interface Shopping_list {
  name: string;
  id: number
}

export function ShoppingListButton(
  {
    name,
    id
  }: Shopping_list) {
  const [buttonname, setbname] = useState("" + name);
  const { visible, onClose, onOpen } = useModalState();
  const handleChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const data = event.target;
      setbname(data.value);
    };
  return (

    <MuiButton
      style={{
        backgroundColor: "white",
        color: "black",
        fontSize: 14
      }} onClick={onOpen}
    >
      <TextField
        name="name"
        id="name"
        variant="outlined"
        label="Name"
        style={{ flex: 1, margin: '0 20px 0 0', color: 'white' }}
        onChange={handleChange}
        value={buttonname}
        type="text" />
      <Dialog
        fullWidth
        maxWidth="md"
        open={visible}
        aria-labelledby="recipe-name"
      >
        <Shownrecipe
          onClose={onClose} name={"example"} id={id} />
      </Dialog>
    </MuiButton >
  );
}
