import React, { useState } from "react";
import { Header } from "semantic-ui-react";
import { Modal, Button, Box, Typography } from "@mui/material"
import { useModalState } from "../hooks";
import { deleteRecipe, fetchRecipeIngredients, updateRecipe } from "../requests/recipe";
import { RecipeForm } from "../RecipeForm";

interface RecipeCardProps {
  id: number;
  title: string;
  totalIngredients?: number;
  cookTime?: number | undefined;
  image?: string;
  description?: string;
  instruction?: string;
}

export function RecipeCard({
  id,
  title,
  totalIngredients,
  cookTime,
  description,
  instruction,
  image = "https://images.unsplash.com/photo-1454944338482-a69bb95894af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
}: RecipeCardProps) {
  const { visible, onClose, onOpen } = useModalState();
  const [ingredients, setIngredients] = React.useState([]);


  React.useEffect(() => {
    fetchRecipeIngredients(id).then((response: any) => {
      console.log(response);
      if (response) { setIngredients(response) };
    });
  }, [id]);

  const handleClick = (delid: number) => {
    console.log("Delete " + delid)
    deleteRecipe(delid);
  }
  const handleClick2 = (uplid: number) => {
    console.log("Update " + uplid)
    updateRecipe(uplid, uplid);
  }

  const [test, settest] = useState(<Button onClick={onOpen}>
    <div style={{ padding: 8 }}>
      <img
        style={{ width: "100%", height: 150 }}
        src={image}
      />
      <Header type="title2">
        {title}
      </Header>
      <div>
        <label>{`Cook Time: ${cookTime}`}</label>
      </div>
    </div>
  </Button>);
  return (
    <div>
      {test}
      <Modal
        open={visible}
        onClose={onClose}
        aria-labelledby="recipe-name"
      >
        <Box sx={style}>
          <Typography id="recipe-name" variant="h6" component="h2">
            {`${title}`}
          </Typography>
          <img
            style={{ width: "100%", height: 200 }}
            src={image}
          />
          <Header type="title4">Description</Header>
          <Typography id="instruction" sx={{ mt: 2 }}>{`${description}`}</Typography>
          <Header type="title4">Ingredients</Header>
          {ingredients.map(({ name, quantity }) => (
            <Typography id="instruction" sx={{ mt: 2 }}>
              {name}: {quantity}
            </Typography>
          ))}
          <Header type="title4">Instructions</Header>
          <Typography id="instruction" sx={{ mt: 2 }}>{`${instruction}`}</Typography>

          <Button style={{ position: 'absolute', width: 300, bottom: 0, marginBottom: 10 }} onClick={() => { handleClick2(id) }}>
            Update
          </Button>

          <Button style={{ position: 'absolute', width: 300, bottom: 0, marginBottom: 0 }} onClick={() => { handleClick(id) }}>
            Delete
          </Button>
        </Box>
      </Modal>
    </div>
    // </Modal>
    // <Modal
    //   onClose={onClose}
    //   onOpen={onOpen}
    //   open={visible}
    //   size="tiny"
    //   closeIcon
    //   trigger={
    //     <Button>Here</Button>
    // <Input
    // style={{
    //   backgroundColor: colors.yellow,
    //   borderRadius: 8,
    //   shadowColor: colors.lightBlue,
    //   shadowOffset: { width: 0, height: 1 },
    //   shadowOpacity: 0.3,
    //   shadowRadius: 8,
    //   overflow: "hidden",
    //   flex: 1,
    // // }}
    //   // onPress={onOpen}
    // >
    //   <Image
    //     style={{ width: "100%", height: 200 }}
    //     src={
    //       image
    //     }
    //   />
    //   <div style={{ padding: 16 }}>
    //     <Header type="title2">
    //       {title}
    //     </Header>
    //     <div>
    //       <label>{`Cook Time: ${cookTime}`}</label>
    //     </div>
    //   </div>
    // </Input>
    //   }
    // >
    //   <Modal.Header>
    //     <Header type="title2">{title}</Header>
    //   </Modal.Header>
    //   <Modal.Content style={{ minWidth: 240, minHeight: 240 }}>
    //     <img
    //       style={{ width: "100%", height: 200 }}
    //       src={ image }
    //     />
    //     <div>
    //       <Header type="title4">Ingredients</Header>
    //       <div style={{ width: 8 }}>
    //         {ingredients.map(({ name, quantity }, index) => (
    //           <Header>
    //             {name}: {quantity}
    //           </Header>
    //         ))}
    //       </div>
    //       <Header type="title4">Description</Header>
    //       <div style={{ width: 8 }}>
    //         <Header>{`${description}`}</Header>
    //       </div>
    //       <Header type="title4">Instructions</Header>
    //       <div style={{ width: 8 }}>
    //         <Header>{`${instruction}`}</Header>
    //       </div>
    //     </div>
    //   </Modal.Content>

    //   <button style={{ width: 140, marginBottom: 16 }} onClick={() => {handleClick(id)}}>
    //     Delete
    //   </button>
    // </Modal>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};