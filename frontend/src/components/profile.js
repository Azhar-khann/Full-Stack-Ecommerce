import {React,useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadorders,selectdata } from "../slices/orderSlice";
import { orderValue, Total } from "../util/helperfunc";
import OrderDetails from "./orderDetails";


function Profile(){

    const [orderItems, setOrderItems] = useState([])

    const dispatch = useDispatch();
    const orders = useSelector(selectdata)
    console.log(orders)
    useEffect(() => {
        dispatch(loadorders());
    }, []);

    function formatDate(date){
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString();
        return formattedDate
    }

    function handleView(items){
        setOrderItems(items)
    }

    return(
    <>
        <div class="row header cart_checkout" id="orders_heading">
            <div class="col text-center">
                <h1>Your orders</h1>
                <p class="fw-lighter mb-5"> Your orders in one place </p> 
            </div>
            
        </div>

        <div class="row justify-content-center orders_row">

            <div class="col-xxl-6 col-xl-7 col-lg-9 col-md-10 col-sm-11">

                <table class="table table-borderless my-3 align-middle">

                    <thead class="table-light">
                        <tr>
                            <th scope="col">Order #</th>
                            <th scope="col">Date</th>
                            <th scope="col">Total</th>
                            <th scope="col" id="action">Action</th>
                        </tr>
                    </thead>

                    <tbody>

                        
                        {orders.map(order => {
                            return (
                                <tr>
                                    <th scope="row">{order.order_id}</th>
                                    <td style= {{width: '28%'}}>{formatDate(order.items[0].date)}</td>
                                    <td class="total_action">${orderValue(order.items)}</td>
                                    <td class="total_action"> <a class="btn btn-outline-dark px-3 py-1 border-1 text-decoration-none view_btn" onClick={() => handleView(order.items)}  data-bs-toggle="modal" data-bs-target="#orderDetailsModal" data-orderid="1" href="#">view</a> </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>

                </table>

            </div>           

        </div>

        {<OrderDetails orderItems = {orderItems}/>} 
        

        <div class="row justify-content-center my-5">
            <div class="col-lg-3 col-md-4">
                <a class="btn btn-outline-dark px-4 border-1 text-decoration-none logout_btn"  href="http://localhost:4000/logout">Log out</a>
            </div>
        </div>

        { orders.length === 0 && <div class="fill" style= {{marginTop: '18%'}}></div>}
        { orders.length === 1 && <div class="fill" style= {{marginTop: '13.6%'}}></div>}
        { orders.length === 2 && <div class="fill" style= {{marginTop: ' 9.5%'}}></div>}
        { orders.length > 2 && <div class="fill" style= {{marginTop: ' 0%'}}></div>}

    </>
    )
}

export default Profile;