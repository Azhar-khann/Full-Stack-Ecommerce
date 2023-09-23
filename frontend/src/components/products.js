import {React,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useLocation } from "react-router-dom";
import { loadProducts,selectdata } from "../slices/productsSlice";



function Products() {

    const {name} = useParams();
    const url = useLocation().pathname;
    const filter = url.split('/')[1];

    const dispatch = useDispatch();
    const products = useSelector(selectdata);

    useEffect(() => {
        dispatch(loadProducts({filter,name}));
    }, 
    [name]);

    return(
    <>
        <div className="row header">

            <div className="col text-center">
                <h1>
                    {name}
                </h1>
            </div>

            <div className="row  listings">


                {products.map(product => {
                    console.log(product)
                    return (
                        <div className="col-3 product">
                            <a href="#"> <img src={process.env.PUBLIC_URL + product.image_path} className="img-fluid" alt="..."/> </a>
                            <a href="#" className="product_name">{product.brand} {product.name}</a>
                            <span>${product.price}</span>
                        </div>
                    )}
                )}

            </div>

    
        </div>

    </>
    )
}



export default Products;
