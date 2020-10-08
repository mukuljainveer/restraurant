import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './layouts/Layout';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import AddRestaurant from './pages/AddRestaurant';
import EditRestaurant from "./pages/EditRestaurant";
import ViewRestaurant from './pages/ViewRestaurant';

function App() {

  return (
    <>
      <Layout>
        <Switch>
          <Route path="/:edit/edit" exact>
            <EditRestaurant />
          </Route>
          <Route path="/:id/view" exact>
            <ViewRestaurant />
          </Route>
          <Route path="/add">
            <AddRestaurant />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
