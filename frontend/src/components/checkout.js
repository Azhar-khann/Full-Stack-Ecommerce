import {React,useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadcart,selectdata } from "../slices/cartSlice";
import { OrderTotal} from "../util/helperfunc";
import { Link,useNavigate } from "react-router-dom";

function Checkout(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(selectdata)
    const OrderSubTotal = OrderTotal(cart)

    useEffect(() => {
        dispatch(loadcart());
    }, []);

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString(); // "mm/dd/yyyy"

    const [error, setError] = useState('')
    const[date,setDate] = useState(formattedDate)


    const [email, setEmail] = useState();
    const [address, setAddress] = useState();
    const [address2, setAddress2] = useState();
    const [city, setCity] = useState();
    const [zip, setZip] = useState();
    const [nameOnCard, setNameOnCard] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [expiration, setExpiration] = useState();
    const [cvv, setCvv] = useState();

    

    async function handlesubmit(e){
        e.preventDefault();

        const data = {date,email,address,address2,city,zip,nameOnCard,cardNumber,expiration,cvv};

        const response = await fetch('http://localhost:4000/cart/user/checkout',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include',
        }) 
        .then(async response => {
            const status =  response.status;
            if (status !== 200) {
                throw new Error('Server error');
            } else{
                dispatch(loadcart())
                navigate({pathname:'/thankyou'})
            }
        })
        .catch(error => {
            console.error(error);
            setError('An error has occurred. Please try again');
        })
    }

    return(
    <>
      <div class="row header cart_checkout">
            <div class="col text-center">
                <h1>Checkout</h1>
            </div>
            
        </div>

        <div class="row">

            <div class="col-5 offset-1">

                <form class="row g-3" onSubmit={handlesubmit}>

                    <h5 class="mb-4 mt-5">Billing details</h5>

                    <div class="col-md-6">
                      <label for="inputEmail4" class="form-label">Email</label>
                      <input type="email" class="form-control" id="inputEmail4" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    
                    <div class="col-12">
                      <label for="inputAddress" class="form-label">Address</label>
                      <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" value={address} onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div class="col-12">
                      <label for="inputAddress2" class="form-label">Address 2</label>
                      <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" value={address2} onChange={(e) => setAddress2(e.target.value)}/>
                    </div>
                    <div class="col-md-6">
                      <label for="inputCity" class="form-label">City</label>
                      <input type="text" class="form-control" id="inputCity" value={city} onChange={(e) => setCity(e.target.value)}/>
                    </div>
                
                    <div class="col-md-2">
                      <label for="inputZip" class="form-label">Zip</label>
                      <input type="text" class="form-control" id="inputZip" value={zip} onChange={(e) => setZip(e.target.value)}/>
                    </div>

                    <h5 class="mb-4 mt-5">Payment</h5>


                    <div class="row mb-4">
                        <div class="col">
                            <div class="form-outline">
                                <input type="text" id="formNameOnCard" class="form-control" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)}/>
                                <label class="form-label" for="formNameOnCard">Name on card</label>
                            </div>
                        </div>

                        <div class="col">
                           <div class="form-outline">
                                <input type="text" id="formCardNumber" class="form-control" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
                                <label class="form-label" for="formCardNumber">Credit card number</label>
                            </div>
                        </div>
                    </div>

                    <div class="row mb-4">
                        <div class="col-3">
                            <div class="form-outline">
                                <input type="text" id="formExpiration" class="form-control" placeholder="MM/YY" value={expiration} onChange={(e) => setExpiration(e.target.value)}/>
                                <label class="form-label" for="formExpiration">Expiration</label>
                            </div>
                        </div>

                        <div class="col-3">
                            <div class="form-outline">
                                <input type="text" id="formCVV" class="form-control" value={cvv} onChange={(e) => setCvv(e.target.value)}/>
                                <label class="form-label" for="formCVV">CVV</label>
                            </div>
                        </div>
                    </div>

                    <div class="col-3 offset-9">
                        <button type="submit" class="btn btn-outline-dark px-3 border-1 text-decoration-none">Place order</button>
                        <span style={{ color: 'red', display:'block' }}>{error}</span>
                    </div>

                </form>

            </div>

            <div class="col-4 offset-1">

                <div class="col offset-lg-1 order_summary px-4">
                    <h4>Order Summary</h4>
                    <div class="row py-4">                     
    
                        <div class="col-6 mt-5">
                            <span>Order Subtotal </span>
                        </div>
    
                        <div class="col-1 offset-3 mt-5">
                            <span>${OrderSubTotal}</span>
                        </div>
    
                        <hr class="hr my-3"/>
    
                        <div class="col-6 mt-5">
                            <span>Shipping and handling </span>
                        </div>
    
                        <div class="col-1 offset-3 mt-5">
                            <span>$0</span>
                        </div>

                        <hr class="hr my-3"/>

                        <div class="col-6 mt-5">
                            <span> Total </span>
                        </div>
    
                        <div class="col-1 offset-3 mt-5">
                            <span>${OrderSubTotal}</span>
                        </div>         
    
                    </div>
                </div>

            </div>

        </div>     
    </>

    )
}

export default Checkout