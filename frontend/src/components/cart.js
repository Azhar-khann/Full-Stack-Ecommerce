import {React,useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadcart,selectdata } from "../slices/cartSlice";
import { Total } from "../util/helperfunc";
import {loadStripe} from '@stripe/stripe-js';
import { serverUrl } from "../api/serverUrl";


function Cart(){

    const dispatch = useDispatch();
    const cart = useSelector(selectdata)
    console.log(cart)

    useEffect(() => {
        dispatch(loadcart());
    }, []);

    async function handleDelete(product_size_id){
        console.log('product_size_id=',product_size_id)
        const response = await fetch(`${serverUrl}/cart/user/${product_size_id}`,{
            method: 'DELETE',
            credentials: 'include',
        })         
        .then(async response => {
            const status =  response.status;
            if (status === 200) {
                dispatch(loadcart())
            }
        })
    }

    // payment integration
    const makePayment = async()=>{
        const stripe = await loadStripe('pk_test_kKgyCXVx78tLCpcQaKlSlEs6');

        const body = {
            products:cart
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch(`${serverUrl}/api/create-checkout-session`,{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });
        
        if(result.error){
            console.log(result.error);
        }
    }

    return(
    <>
       <div class="row header cart_checkout">
            <div class="col text-center">
                <h1>Shopping cart</h1>
            </div>
            
        </div>


        <div class="row cart_row justify-content-center">

            <div class="row justify-content-center p-0">

                <div class="col-xxl-6 col-xl-7 col-lg-9 col-md-10 col-sm-11">
    
                    <table class="table table-borderless mb-2 align-middle">
    
                        <thead class="table-light mb-5">
                            <tr>
                               <th scope="col" class="theads" id="theads-items">Items</th>
                               <th scope="col" class="theads">Price</th>
                               <th scope="col" class="theads">Quantity</th>
                               <th scope="col" class="theads">Total</th>
                            </tr>
                        </thead>
    
                        <tbody>
    
                            {cart.map(item => {
                                return (
                                <tr>
                                    <td style= {{marginRight: '5%'}}>

                                        <div class="row justify-content-evenly">
                                            <div class="col-md-6 col-3 p-0">
                                                <img src={process.env.PUBLIC_URL + item.image_path} class="img-fluid"/>
                                            </div>

                                            <div class="col-md-5 col-8 my-auto">
                                                <h5>{item.name}</h5>
                                                <h6>{item.size}</h6>                                                
                                                <svg onClick={() => handleDelete(item.product_size_id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 
                                                    3h11V2h-11v1Z"/>
                                                </svg>
                                                
                                            </div>

                                        </div>

                                    </td>

                                    <td><h6>${item.price} </h6></td>
                                    <td> <h6><i class="fas fa-times"></i> {item.quantity}</h6></td>
                                    <td><h6>${Total(item.price,item.quantity)}</h6></td>

                                </tr>
                                )
                                })
                            }
    
    
                        </tbody>

                    </table>
    
                </div>
            </div>
        </div>

        
        <div class="row">
            <div class="col text-center">
                <button class="btn btn-outline-dark p-2 border-1 text-decoration-none checkout-btn" onClick={makePayment}>Proceed to Checkout</button>
            </div>
        </div>

        { cart.length === 0 && <div class="fill" style= {{marginTop: '20.5%'}}></div>}
        { cart.length === 1 && <div class="fill" style= {{marginTop: '7.5%'}}></div>}
        { cart.length >= 2 && <div class="fill" style= {{marginTop: '5%'}}></div>}

    </>
    )
}

export default Cart