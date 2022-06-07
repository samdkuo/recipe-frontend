import { Header } from "semantic-ui-react";


const NotFound = () => {
  return (
    <div style={{ width: "50%", margin: "auto", justifyContent: "center" }}>
      <Header as='h1'>Oops!</Header>
      <Header as='h3'>
      Page not found!
      </Header>

    </div>
  );
};

export default NotFound;
