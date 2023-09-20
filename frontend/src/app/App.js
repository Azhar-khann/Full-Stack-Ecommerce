import '../App.css';
import React from "react";
import Home from "../components/Home";
import Root from "../components/Root";



import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root/> }>

    <Route index element = {<Home/>}/>
  </Route>
  
))

function App() {
  return (
    <>
      <RouterProvider router ={router}/>
    </>
  );
}

export default App;
