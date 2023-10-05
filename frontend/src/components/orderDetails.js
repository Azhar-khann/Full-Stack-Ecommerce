import {React,useEffect} from "react";
import { Total } from "../util/helperfunc";

function OrderDetails(props){

    console.log('props=',props.orderItems)

    

    return(
    <>
        <div class="modal fade" id="orderDetailsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

                                {props.orderItems.map(item => {
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
        </div>
    </>
    )
}

export default OrderDetails