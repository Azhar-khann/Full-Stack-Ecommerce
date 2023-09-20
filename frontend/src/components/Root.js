import React from "react";
import Nav from "./Nav";
import Footer from "./footer";
import Home from "./Home";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div class = "container-fluid">
        <Nav/>
          
          <Outlet/>
        
        <Footer/>
    </div>
  );
}

export default Root;