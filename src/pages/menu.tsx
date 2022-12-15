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
    const clear = shopping_lists.filter((item) => item.id <= 0);
    setshopping_lists(clear);
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
  const changeshowlist = () => {
    setshowlist(true);
  };
  return (
    <>
      {pressed ?
        <Button
          style={{
            position: "sticky",
            marginLeft: "2%",
            marginBottom: "2%",
            width: "20%",
            height: "5%",
            backgroundColor: "#67c4fc",
            color: "white"
          }}
          onClick={handlepress}
        >
          Add New List
        </Button>
        : <><TextField
          name="name"
          id="name"
          variant="outlined"
          label="Name"
          value={name}
          onChange={handleChange}
          type="text" /><Button
            style={{
              position: "sticky",
              marginLeft: "2%",
              marginBottom: "2%",
              width: "20%",
              height: "5%",
              backgroundColor: "#67c4fc",
              color: "white"
            }}
            onClick={() => { addshoppingliststate(name); }}
          >
            Submit
          </Button></>}
      <Button
        style={{
          position: "sticky",
          marginLeft: "2%",
          marginBottom: "2%",
          width: "20%",
          height: "5%",
          backgroundColor: "#67c4fc",
          color: "white"
        }}
        onClick={() => { changeshowlist(); }}
      >
        Generate Ingredient List
      </Button>

      <ul>
        <Grid
        >
          {shopping_lists.map(({ id, user_id, name }) => (
            <Typography id="instruction" sx={{ mt: 2 }}>
              <Button
                style={{
                  position: "sticky",
                  left: "0%",
                  width: "20%",
                  backgroundColor: "#67c4fc",
                  color: "white"
                }}>
                <ShoppingListButton
                  name={name}
                  id={id}
                  user_id={user_id}
                  handleDelete={handleClick}
                  handleUpdate={updateshoppingliststate}
                />
              </Button>

            </Typography>
          ))}
        </Grid>
      </ul></>

  )
};

export default Home;
