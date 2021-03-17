import React, { useEffect, useState } from "react";
import { Link, useHistory,useLocation } from "react-router-dom";
import { usePaystackPayment } from 'react-paystack';
//Redux
import { useDispatch, useSelector } from "react-redux";

//components



import Loader from "../components/Loader";
import Message from "../components/Message";
import CartMessage from "../components/CartMessage";
import {ORDER_PAY_RESET,ORDER_DELIVER_RESET} from "../constants/orderConstants"
//actions

import {getOrderDetails,payOrder,deliverOrder} from "../actions/orderActions"
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { pageAnimation } from "../animations";
import Meta from "../components/Meta";

const Order = () => {
    const history=useHistory() 
    const dispatch=useDispatch()
const location=useLocation()
const orderId=location.pathname.split('/')[2]
const orderDetails=useSelector((state)=>state.orderDetails)
const {order,success,error,loading}=orderDetails
const orderPay=useSelector((state)=>state.orderPay)
const {success:successPay,loading:loadingPay}=orderPay
const orderDeliver=useSelector((state)=>state.orderDeliver)
const {success:successDeliver,loading:loadingDeliver}=orderDeliver

const userLogin=useSelector((state)=>state.userLogin)
const {userInfo}=userLogin

useEffect(()=>{
 if(!userInfo){
   history.push("/login")
 }else if(!order._id||successPay||order._id!=orderId||successDeliver){
        dispatch({type:ORDER_PAY_RESET})
        dispatch({type:ORDER_DELIVER_RESET})
        dispatch(getOrderDetails(orderId))
    }  
       // eslint-disable-next-line
   },[dispatch,orderId,successPay,order,userInfo,successDeliver,history],
   )

 
const config = {
    reference: (new Date()).getTime(),
    email: order.user.email,
    amount:order.totalPrice*100,
    currency:"USD",
    publicKey: 'pk_test_b6d1f8fd9cd352f50a6f02c5433d4a302395c77d',
};
const onSuccess = (reference) => {
dispatch(payOrder(order._id))
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
   history.push(`/order/${order._id}`)
  }
  const initializePayment = usePaystackPayment(config);

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id))
      };

return (<StyledShipping variants={pageAnimation} initial="hidden" animate="show" exit="exit">
    <Meta title="Order"/>
  {loadingDeliver&&<Loader/>}
{loading?<Loader/>:error?<Message variant="danger">{error}</Message>: (
<StyledContainer>
  {/* <!--starting of row--> */}

  <StyledCol70>
    {/* <!--col starting--> */}
    <div className="col70">
        <h1>Order {order.id}</h1>
      <div className="row ">
<h2 className="title">SHIPPING</h2>
<div className="text">
    <p><strong>Name:</strong> {order.user.name} </p>

<p><strong>Email:</strong> <a href={`mailto:${order.user.email}`}> {order.user.email}</a></p>
 <p><strong>Address:</strong> {order.shippingAddress.address}</p>
 <p>{order.isDelivered?<div class="paid">Delivered on {order.deliveredAt.substring(0,10)}</div>:<div class="notPaid">Not delivered</div>}</p>
</div>

      </div>
      <div className="line"></div>
      <div className="row ">
<h2 className="title">PAYMENT METHOD</h2>

<div className="text">Method: {order.paymentMethod}

<p>{order.isPaid?<div class="paid">Paid on { order.paidAt.substring(0,10)}</div>:<div class="notPaid">Not paid</div>}</p>
</div>

      </div>
      <div className="line"></div>
      <div className="row ">
<h2 className="title">ORDER ITEMS</h2>
{order.orderItems.length===0?<CartMessage> Order is empty</CartMessage>:

<div className="img">
  {order.orderItems.map((item,index)=>(
      <div key={index}>
<div className="imgRow" >
<img src={item.image.url} alt="photo"/>
<Link to={`/product/${item.product}`}>{item.name}</Link>
<div className="price">
{item.qty} x ${item.price}=${item.qty*item.price}
</div>

</div>

</div>
  ))}
  </div>}

      </div>

    </div>
    {/* <!--col ending--> */}
  </StyledCol70>

  <StyledCol30>
    {/* <!--col starting--> */}
    <div className="col30">
        <h2>Order Summary</h2>
        <div className="line"></div>
      <div className="price"><span className="w1">Items</span> 
      <span className="w2">${order.itemsPrice}</span></div>
      <div className="line"></div>
      <div className="price"><span className="w1">Shipping</span> 
      <span className="w2"> ${order.shippingPrice}</span></div>
      <div className="line"></div>
      <div className="price"><span className="w1">Tax</span>
       <span className="w2">${order.taxPrice} </span></div>
      <div className="line"></div>
      <div className="price"><span className="w1">Total</span>
       <span className="w2">${order.totalPrice} </span></div>
      <div className="line"></div>
      <div className="form">
      {order.isPaid?"":  <button
disabled={order.orderItems===0||order.isPaid}
onClick={() => {
    initializePayment(onSuccess, onClose)
}}>
          {order.isPaid?"Paid":"Pay"}
        </button>}
        {
         userInfo&& (userInfo.role==="admin"||userInfo.role==="moderator") &&order.isPaid&&!order.isDelivered&&(
            <button onClick={deliverHandler}>Mark as delivered</button>
          )}
      </div>
    </div>
    {/* <!--col ending--> */}
  </StyledCol30>
  {/* <!--ending of row--> */}
</StyledContainer>)}


</StyledShipping>);
}
 const StyledShipping=styled(motion.div)`
min-height:81vh;
 `
 const StyledContainer = styled(motion.div)`
 padding: 2rem 2rem;
 display: flex;
 flex-flow: row wrap;
 width: 100%;
 @media screen and (max-width: 900px) {
  flex-flow: column wrap;
  padding: 0rem 0rem;
    }
`;

const StyledCol70 = styled(motion.div)`
  flex: 70%;
  padding: 0rem 0.5rem 0rem 0rem;
  @media screen and (max-width: 900px) {
  padding: 0rem;
  width:100%
    }
  .col70 {
    background-color: white;
    border-radius: 5px;
    min-height: 70vh;
    width: 100%;
    display:flex;
    flex-flow:column wrap;
    padding: 2rem 3rem;
    @media screen and (max-width: 900px) {
      border-radius: 0px;
      min-height: 50vh;
      padding: 1rem 1rem;
      width:100%
    }
    h1{
        font-weight:500;
        @media screen and (max-width: 900px) {
    font-size:1.3rem;
    }
    }
    .line{
        height:1px;
        background-color:#99a8b2;
    }
    .row{
        .title{
            padding:0.2rem 0rem;
            font-size:1.35rem;
            font-weight:500;
            padding-top:0.8rem;
            padding-bottom:0.2rem
        }
        .text{
            padding-top:0.2rem;
          padding-bottom:0.8rem;
          .paid{
            padding:0.4rem 1rem;
              background-color:lightblue;
              font-size:1rem;
              font-weight:500;
              @media screen and (max-width: 900px) {
      width:100%
    }
          }
          .notPaid{
              padding:0.4rem 1rem;
              background-color:#db7777;
              font-size:1rem;
              font-weight:500;
              @media screen and (max-width: 900px) {
      width:100%
    }
          }
          p{
              padding:0.1rem;
              font-size:1rem;
              color:black
          }
          strong{
              font-weight:500;
              
          }a{
              color:black;&:hover{
                  color:#3b3333
              }
          }
        }
        .img{
            padding-top:0.2rem;
          padding-bottom:0.8rem;
            .line{
        height:1px;
        background-color:#99a8b2;
    }
.imgRow{
    display:flex;
    flex-flow:row wrap;
    align-items:center;
    padding:0.5rem 0rem;
    img{
        width:1rem;
        flex:6%
    }
    a{
        color:black;
        flex:70%;
        padding:0rem 1rem;
        cursor: pointer;
        &:hover{
            color:#221e1e;
        }
    }
    .price{
flex:24%;
font-weight:500
    }
}

        }
    }
  }
`;

const StyledCol30 = styled(motion.div)`
  flex: 20%;
  padding: 0rem;
  .col30 {
    min-height: 5rem;
    border: 0px solid grey;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-flow: column wrap;
    padding: 0.8rem;
    @media screen and (max-width: 900px) {
      border-radius: 0px;
    
    }
    .line{
        height:1px;
        background-color:#99a8b2;
    }
    h2{
        font-size:1.4rem;
        font-weight:500;
     padding-top:0.1rem;
     padding-bottom:0.4rem;
    }
    .price
    {
      font-size: 1.1rem;
      display:flex;
      padding:0.3rem 0rem;
  .w1{
  width:50%;

    }
    .w2{
width: 50%;
font-weight:500
    }
    }
 
    .form {
      text-align: center;
      button {
        margin-top:0.5rem;
        width: 100%;
        padding: 0.8rem;
        text-align: center;
        cursor: pointer;
        &:disabled{
            cursor:default
        }
      }
    }
  }
`;
export default Order;