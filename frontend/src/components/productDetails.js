import {React,useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { loadProduct,selectdata } from "../slices/productDetailsSlice";
import { loadcart } from "../slices/cartSlice";


function Productdetails() {

    const [product_size_id, setProduct_size_id] = useState();
    const [quantity, setquantity] = useState();
    const [error, setError] = useState('')
    console.log(product_size_id)

    const handleSize = (e) => {
        setProduct_size_id(e.target.value);        
    }
    const handleQuantity = (e) => {
        setquantity(e.target.value);      
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {product_size_id,quantity}
        const response = await fetch('http://localhost:4000/cart/user',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include',
        }) 
        .then(async response => {
            const status =  response.status;
            if (status === 200) {
                dispatch(loadcart())
            }
        })
    }
    

    const {ProductId} = useParams();
    const dispatch = useDispatch();
    const product = useSelector(selectdata);

    useEffect(() => {
        dispatch(loadProduct(ProductId));
    }, 
    []);

    return (
    <>
        <div class="row product_detail">
            

            <div class="col-6 image">
                <img src={product && process.env.PUBLIC_URL + product.image_path} class="img-fluid" alt="..."/>
            </div>
            


            <div class="col-5 mx-3 my-5">

                <h1 class="mb-4">{product && product.name}</h1>

                <div class="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between mb-4">
                    <ul class="list-inline mb-2 mb-sm-0">
                        <li class="list-inline-item h4 fw-light mb-0">${product && product.price}</li>
                    </ul>
                </div>

                <p class="mb-4 text-muted">{product && product.description}</p>

                <form onSubmit={handleSubmit}>

                    <div class="row">
                        <div class="col-sm-6 col-lg-12 detail-option mb-3">

                            <h6 class="detail-option-heading mb-4">Size <span>(required)</span></h6>

                            {Object.keys(product).length > 0 && Object.keys(product.product_size_ids).map(size => (
                                <label class="btn btn-sm btn-outline-secondary detail-option-btn-label mb-3 mx-2 p-2" for={size}> {size} 
                                    <input class="input-invisible mx-2" type="radio" name="size" value={product.product_size_ids[size]}  id={size} required="" onClick={handleSize}/>
                                </label>
                            ))}

                        </div>
        
                        <div class="col-12 col-lg-6 detail-option mb-5">
                            <label class="detail-option-heading fw-bold mb-2">Quantity <span>(required)</span></label>
                            <input class="form-control detail-quantity" style={{width: '46%'}} name="num" type="number"  min={1} max={product && product.quantity} onChange={handleQuantity} value={quantity}/>
                        </div>

                    </div>

                    <ul class="list-inline">
                        <li class="list-inline-item">
                            <button class="btn btn-dark btn-lg mb-1 add_cart_button" type="submit"> <i class="fa fa-shopping-cart"></i> Add to Cart</button>
                            <span style={{ color: 'red', display:'block' }}>{error}</span>
                        </li>
                    </ul>

                </form>

            </div>
        </div>        

        <div class="row guranntee justify-content-evenly">

            <div class="col-12 text-center">
                <h3>StockX guranntee</h3>
            </div>

            <div class="col mx-4">
                <h5>Confidence in Every Step.</h5>
                    <p> We understand the value of a genuine product. At StockX, we guarantee the quality and authenticity <br/>  of every pair of shoes we sell.
                        In the rare event that any concerns arise, our dedicated team is here <br/>  to assist you.
                    </p> 
            </div>

        <div class="col mx-3">
          <h5>Safe and Swift Delivery.</h5>
          <p>Your order is handled with utmost care, ensuring it reaches you in pristine condition. 
              From the moment you <br/> confirm your purchase to the day it arrives at your doorstep, we keep you informed and guarantee a <br/>  timely delivery.
          </p>

        </div>

        <div class="col mx-3">
          <h5>Customer Delight.</h5>
          <p>
            We take pride in providing a seamless shopping experience. <br/>  With a 90-day, hassle-free return policy  and a team of friendly experts at your disposal, 
            we're here to make sure you're delighted with every <br/>  purchase.
          </p>
        </div>


        </div>


    </>
    )
}



export default Productdetails;