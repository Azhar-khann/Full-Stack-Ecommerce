import {React,useState,useEffect, useRef} from "react";
import { loadcart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { serverUrl } from "../api/serverUrl";

function Thankyou(){

    const dispatch = useDispatch();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // "mm/dd/yyyy"
    const[date,setDate] = useState(formattedDate)
    const effectRan = useRef(false);

    async function createOrder(){

        const data = {date};

        const response = await fetch(`${serverUrl}/cart/user/checkout`,{
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

    useEffect(() => {
        if (effectRan.current){
            createOrder()
        }
        effectRan.current = true;
        
    }, []);


    return (
    <>
      <div class="d-flex justify-content-center align-items-center" style= {{marginTop: '8.5%'}}>
            <div class="card col-md-4 bg-white shadow-md p-5">
                <div class="mb-4 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-success" width="75" height="75"
                        fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path
                            d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                    </svg>
                </div>
                <div class="text-center">
                    <h1>Thank You !</h1>
                    <p>Your order has been placed Successfully. Thanks you for choosing StockX. </p>
                    <Link to={'/'} class="btn btn-outline-dark text-decoration-none">Back Home</Link>
                </div>
            </div>
        </div>

        <div class="fill" style= {{marginTop: '20%'}}></div>
    </>
    )
}

export default Thankyou