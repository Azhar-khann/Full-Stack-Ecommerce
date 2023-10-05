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

            <div class="col-6 ">

                <table class="table table-borderless my-3 align-middle">

                    <thead class="table-light">
                        <tr>
                            <th scope="col">Order #</th>
                            <th scope="col">Date</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
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
            <div class="col-3">
                <a class="btn btn-outline-dark px-5 border-1 text-decoration-none login_btn" type="submit" href="#">Log out</a>
            </div>
        </div>

        { orders.length === 0 && <div class="fill" style= {{marginTop: '18%'}}></div>}
        { orders.length === 1 && <div class="fill" style= {{marginTop: '13.6%'}}></div>}
        { orders.length >= 2 && <div class="fill" style= {{marginTop: ' 9.5%'}}></div>}


        {/* <div class="modal fade" id="orderDetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen-lg-down modal-dialog-centered modal-dialog-scrollable modal-lg custom-modal-width">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Order Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <table class="table">

                            <thead>
                                <tr>
                                    <th scope="col">Item</th>
                                    <th scope="col-1">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total</th>
                                </tr>
                            </thead>

                            <tbody id="orderItems">

                               {orders.length > 0 && orders[0].items && orders[0].items.map(item => {
                                    {console.log('item=',item)}
                                    return (
                                    <tr style={{verticalAlign: 'middle'}}>
                                        <td style={{width: '30%'}}>
                                            <div class="d-flex align-items-center">
                                                <img src={process.env.PUBLIC_URL + item.image_path} className="img-fluid" style={{ width: '50%', marginRight: '4%' }} alt="..." />
                                                <div>
                                                    <h5 style={{ fontSize: 'small' }}>{item.name}</h5>
                                                    <h6 style={{ fontSize: 'small' }}>Size {item.size}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td> ${item.price} </td>
                                        <td>  {item.quantity} </td>
                                        <td>  ${Total(item.price,item.quantity)} </td>
                                    </tr>
                                    )
                                })} 

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div> */}
    </>
    )
}

export default Profile;