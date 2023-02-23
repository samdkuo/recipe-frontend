import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { ShoppingListButton } from "../components/ShoppingListButton";
import { deleteShoppinglist, fetchShoppinglist, postshoppinglist } from "../requests/recipe";

const Home = () => {
  interface shopping_list {
    id: number;
    user_id: number;
    name: string;
  }

  interface shopping_list_ingredients {
    id: number;
    user_id: number;
    name: string;
  }
  const [shopping_lists, setshopping_lists] = React.useState<shopping_list[]>([]);
  const [name, setname] = React.useState("");
  const [pressed, setpressed] = React.useState(true);
  const [showlist, setshowlist] = React.useState(false);

  React.useEffect(() => {
    fetchShoppinglist().then((response: shopping_list[]) => {
      if (response) {
        console.log(response);
        setshopping_lists(response);
      }
    });
  }, []);

  const handleClick = useCallback((delid: number, name: string) => {
    console.log("Delete " + delid);
    const clear = shopping_lists.filter((item) => item.id <= 0);
    setshopping_lists(clear);
    const newlist2 = shopping_lists.filter((item: { name: string; }) => item.name !== name);
    setshopping_lists(newlist2);
  },
    [shopping_lists, setshopping_lists]
  );

  const addshoppingliststate = (name: string) => {
    postshoppinglist(name).then((response: any) => {
      console.log(response);
      const uid = localStorage["id"];
      const clear = shopping_lists.filter((item) => item.id <= 0);
      setshopping_lists(clear);
      const newShopping_list = { id: response, user_id: uid, name: name };
      setshopping_lists([...shopping_lists, newShopping_list]);
      setpressed(true);
    });
  };

  const updateshoppingliststate = useCallback((shid: number, name: string) => {
    console.log(name);
    const newState = shopping_lists.map((item) => {
      if (item.id === shid) {
        return {
          ...item,
          name: name,
        };
      }
      return item;
    });
    console.log(newState);
    setshopping_lists(newState);
  },
    [shopping_lists, setshopping_lists]
  );

  const handleChange =
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const data = event.target;
      setname(data.value);
    };
  const handlepress =
    () => {
      setpressed(false);
    };

  return (
    <>
      <div style={{
        display: "flex",
        width: "100%", marginBottom: 16
      }}>

        <TextField
          name="name"
          id="name"
          variant="outlined"
          label="List Name"
          value={name}
          onChange={handleChange}
          type="text"
          style={{ flex: 5, marginRight: 16 }}
          placeholder="List Name..."
        />


        <Button
          style={{
            flex: 1,
            backgroundColor: "#67c4fc",
            color: "white"
          }}
          onClick={() => { addshoppingliststate(name); }}
        >
          Add List
        </Button>
      </div>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
        {shopping_lists.map(({ id, user_id, name }, index) => (
          <ShoppingListButton
            name={name}
            id={id}
            user_id={user_id}
            handleDelete={handleClick}
            handleUpdate={updateshoppingliststate}
          />
        ))}
      </div></>

  )
};

export default Home;
