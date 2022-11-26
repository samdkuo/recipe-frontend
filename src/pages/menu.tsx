import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
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

  const handleClick = (delid: number, name: string) => {
    console.log("Delete " + delid);
    deleteShoppinglist(delid);
    const newlist2 = shopping_lists.filter((item: { name: string; }) => item.name !== name);
    setshopping_lists(newlist2);
  };
  let listid = 0;
  const addshoppingliststate = (name: string) => {
    postshoppinglist(name).then((response: any) => {
      console.log(response);
      listid = response;
    });
    const uid = localStorage["id"];
    const newShopping_list = { id: listid, user_id: uid, name: name };
    setshopping_lists([...shopping_lists, newShopping_list]);
    setpressed(true);
  };
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
          {shopping_lists.map(({ id, name }) => (
            <Typography id="instruction" sx={{ mt: 2 }}>
              <Button
                style={{
                  position: "sticky",
                  left: "0%",
                  height: "5%",
                  backgroundColor: "#67c4fc",
                  color: "white"
                }}>
                <ShoppingListButton
                  name={name}
                />
                <Button
                  onClick={() => {
                    handleClick(id, name);
                  }}>
                  Delete
                </Button>
              </Button>

            </Typography>
          ))}
        </Grid>
      </ul></>

  )
};

export default Home;
