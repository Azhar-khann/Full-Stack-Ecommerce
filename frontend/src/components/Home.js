import {React,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadbannerProduct,selectdata } from "../slices/bannerSlice";
import Banner from "./banner";
//import myImage from '../images/6.jpg';


function Home() {
    
    const dispatch = useDispatch();
    const bannerProduct = useSelector(selectdata);


    useEffect(() => {
        dispatch(loadbannerProduct());
    }, 
    []);

    return(
        <Banner bannerimage={bannerProduct.image_url}/>
    )
}



export default Home;