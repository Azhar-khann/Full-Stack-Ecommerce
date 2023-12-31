import {React,useEffect} from "react";
import { useDispatch, useSelector, } from "react-redux";
import { loadIconic, selectdata } from "../slices/iconicSlice";
import { Link } from "react-router-dom";


function Iconic() {

    const dispatch = useDispatch();
    const products = useSelector(selectdata);

    useEffect(() => {
        dispatch(loadIconic());
    }, 
    []);

    return(
        <>
            <div className="row header">
    
                <div className="col text-center">
                    <h1 style={{textTransform: 'capitalize'}}>
                        Classic
                    </h1>
                </div>
    
                <div className="row  listings">
    
    
                    {products.map(product => {
                        console.log(product)
                        return (
                            <div className="col-lg-3 col-md-4 col-6 product">
                                <Link to={`/product/${product.id}`}> <img src={process.env.PUBLIC_URL + product.image_path} className="img-fluid" alt="..."/> </Link>
                                <Link to={`/product/${product.id}`} className="product_name">{product.brand} {product.name}</Link>
                                <span>${product.price}</span>
                            </div>
                        )}
                    )}
    
                </div>
    
        
            </div>
    
        </>
    )
}

export default Iconic