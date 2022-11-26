import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  TextField,
} from "@mui/material";
import { useState } from "react";


interface Shopping_list {
  name: string;
  buttonHandler: VoidFunction;
}

export function Shownrecipe(
  {
    name,
    buttonHandler
  }: Shopping_list) {
  const [buttonname, setbname] = useState("" + name);
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
      }
      }
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
    </MuiButton>
  );
}
