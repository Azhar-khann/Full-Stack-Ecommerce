import {React,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadcart,selectdata } from "../slices/cartSlice";
import { Total } from "../util/helperfunc";
import {loadStripe} from '@stripe/stripe-js';


function Cart(){

    const dispatch = useDispatch();
    const cart = useSelector(selectdata)
    console.log(cart)

    useEffect(() => {
        dispatch(loadcart());
    }, []);

    async function handleDelete(product_size_id){
        console.log('product_size_id=',product_size_id)
        const response = await fetch(`http://localhost:4000/cart/user/${product_size_id}`,{
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
        const response = await fetch("http://localhost:4000/api/create-checkout-session",{
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


        <div class="row cart_row">

            <div class="row justify-content-center">

                <div class="col-6 ">
    
                    <table class="table table-borderless mb-2 align-middle">
    
                        <thead class="table-light mb-5">
                            <tr>
                               <th scope="col" style={{width: '45%', padding: '1.5rem 0.5rem', margin: 0, paddingLeft: '6%'}}>Items</th>
                               <th scope="col" style={{padding: '1.5rem 0.5rem'}}>Price</th>
                               <th scope="col" style={{padding: '1.5rem 0.5rem'}}>Quantity</th>
                               <th scope="col" style={{padding: '1.5rem 0.5rem'}}>Total</th>
                            </tr>
                        </thead>
    
                        <tbody>
    
                            {cart.map(item => {
                                return (
                                <tr>
                                    <td style= {{marginRight: '5%'}}>

                                        <div class="row justify-content-evenly">
                                            <div class="col-6 p-0">
                                                <img src={process.env.PUBLIC_URL + item.image_path} class="img-fluid"/>
                                            </div>

                                            <div class="col-5 my-auto">
                                                <h5 style= {{fontSize: '15px'}}>{item.name}</h5>
                                                <h6>{item.size}</h6>                                                
                                                <svg onClick={() => handleDelete(item.product_size_id)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 
                                                        3h11V2h-11v1Z"/>
                                                </svg>
                                                
                                            </div>

                                        </div>

                                    </td>

                                    <td>${item.price}</td>
                                    <td> <i class="fas fa-times"></i> {item.quantity}</td>
                                    <td>${Total(item.price,item.quantity)}</td>

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
                <button class="btn btn-outline-dark p-2 border-1 text-decoration-none" onClick={makePayment}>Proceed to Checkout</button>
            </div>
        </div>

        { cart.length === 0 && <div class="fill" style= {{marginTop: '20.5%'}}></div>}
        { cart.length === 1 && <div class="fill" style= {{marginTop: '8.5%'}}></div>}
        { cart.length >= 2 && <div class="fill" style= {{marginTop: '5%'}}></div>}

    </>
    )
}

export default Cart