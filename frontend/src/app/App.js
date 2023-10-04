import '../App.css';
import React from "react";
import Home from "../components/Home";
import Products from '../components/products';
import Root from "../components/Root";
import Productdetails from '../components/productDetails';
import Register from '../components/register';
import Login from '../components/login';
import Cart from '../components/cart';
import Checkout from '../components/checkout';
import Thankyou from '../components/thankyou';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Root/> }>

    <Route index element = {<Home/>}/>
    <Route path="/category/:name/products" element={<Products/>}/>
    <Route path="/brand/:name/products" element={<Products/>}/>
    <Route path="/gender/:name/products" element={<Products/>}/>
    <Route path='/product/:ProductId' element={<Productdetails/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/checkout' element={<Checkout/>}/>
    <Route path='/thankyou' element={<Thankyou/>}/>
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
