import React from "react";
import { Grid, Paper } from "@material-ui/core";
import Table from "../components/Table";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";


const Home = (porps) => {
  const headers = [
    "Restaurant"
  ];

  const history = useHistory();
  const addRestaurant=()=>{
    history.push("/add");
  }

  const editHandler=(id)=>{
    history.push(`/${id}/edit`);
  }

  const viewHandler=(id)=>{
    history.push(`/${id}/view`);
  }

  return (
    <>
      <Grid container justify="flex-end" display="flex">
        <Grid lg={12} item style={{ padding: "0px 10px 10px 0px" }}>
          <Button onClick={addRestaurant} variant="contained" color="primary">
            Create
          </Button>
        </Grid>
        <Grid lg={12} item className="scrollable">
          <Table headers={headers} editHandler={editHandler} viewHandler={viewHandler}/>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
