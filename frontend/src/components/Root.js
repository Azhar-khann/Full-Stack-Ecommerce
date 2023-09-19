import React from "react";
import Nav from "./Nav";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div class = "container-fluid">
        <Nav/>
        <Footer/>
        <div className="main_content">
            <Outlet/>
        </div>
    </div>
  );
}

export default Root;