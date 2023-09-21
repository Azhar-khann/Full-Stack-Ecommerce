import {React,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadbannerProduct,selectdata } from "../slices/bannerSlice";


function Banner() {

    const dispatch = useDispatch();
    const bannerProduct = useSelector(selectdata);


    useEffect(() => {
        dispatch(loadbannerProduct());
    }, 
    []);

    return(
        <div className="row head">
            
            <div className="taglines col-5 my-auto">
                <h1>Shop sneakers</h1>
                <p>Shop for the collest sneekers this autumn <br/> at the best available prices</p>
                <a className="btn btn-outline-dark" href="#">View collection</a>
            </div>

            <div className="col-7 my-auto">
                <img src={process.env.PUBLIC_URL + bannerProduct.image_path} className ="img-fluid" alt="..."/>
            </div>

        </div>
    )
}



export default Banner;