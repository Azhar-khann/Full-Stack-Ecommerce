import '../App.css';
import {React,useEffect} from "react";
import Home from "../components/Home";
import Products from '../components/products';
import Root from "../components/Root";
import Productdetails from '../components/productDetails';
import Register from '../components/register';
import Login from '../components/login';
import Cart from '../components/cart';
import Thankyou from '../components/thankyou';
import Profile from '../components/profile';
import Iconic from '../components/iconic';
import Protected from '../components/protected';

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';



const router = createBrowserRouter(createRoutesFromElements(


  <Route path="/" element={ <Root/> }>
    
    <Route index element = {<Home/>}/>
    <Route path="/category/:name/products" element={<Products/>}/>
    <Route path="/brand/:name/products" element={<Products/>}/>
    <Route path="/gender/:name/products" element={<Products/>}/>
    <Route path='/iconic' element={<Iconic/>}/>
    <Route path='/product/:ProductId' element={<Productdetails/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/cart' element={<Protected Component = {Cart}/>}/>
    <Route path='/thankyou' element={<Thankyou/>}/>
    <Route path='/profile' element={<Protected Component = {Profile}/>}/>

  </Route>
  
))

function App() {

  return (
    <>
      <RouterProvider router ={router} />
    </>
  );
}

export default App;
