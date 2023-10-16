import {React,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadbannerProduct,selectdata } from "../slices/bannerSlice";
import { Link } from "react-router-dom";


function Banner() {

    const dispatch = useDispatch();
    const bannerProduct = useSelector(selectdata);


    useEffect(() => {
        dispatch(loadbannerProduct(6));
    }, 
    []);

    return(
        <div className="row head">
            
            <div className="taglines col-md-5 mt-5 my-md-auto intro">
                <h1>Unleash Your Style</h1>
                <p>Elevate your look with the<br/> new Nike Court Royale.</p>
                <Link to={`product/${bannerProduct.id}`} className="btn btn-outline-dark text-decoration-none text-center" href="#">Buy now</Link>
            </div>

            <div className="col-md-7 my-auto ">
                <img src={process.env.PUBLIC_URL + '/images/banner.jpg'} className ="img-fluid" alt="..."/>
            </div>

        </div>
    )
}



export default Banner;