import React, { useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";

//components

import Loader from "../components/Loader";
import Message from "../components/Message";
import CartMessage from "../components/CartMessage";
import CheckoutSteps from "../components/CheckoutSteps";
//actions

import {createOrder} from "../actions/orderActions"
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion,} from "framer-motion";

import { pageAnimation } from "../animations";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import Meta from "../components/Meta";

const PlaceOrder = () => {
    const history=useHistory() 
    const dispatch=useDispatch()
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart
    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin;
//CALCULATE PRICES
const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2)
}
cart.itemsPrice= addDecimals(cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0))
cart.shippingPrice=addDecimals(cart.itemsPrice>100?100:0)
cart.taxPrice=addDecimals( Number((0.15*cart.itemsPrice).toFixed(2)))
cart.totalPrice=(Number(cart.itemsPrice)+Number(cart.taxPrice)+Number(cart.shippingPrice)).toFixed(2)


const orderCreate=useSelector((state)=>state.orderCreate)
const {order,success,error,loading}=orderCreate
useEffect(()=>{
  if(!userInfo){
history.push("/login?redirect=placeorder")
  }else if(success){
    dispatch({type:ORDER_CREATE_RESET})
        history.push(`/order/${order._id}`)
    }
    else if(error){
    
    
        setTimeout(() => {
          dispatch({type:ORDER_CREATE_RESET})
        }, 2000)
      }
    // eslint-disable-next-line
},[history,success,userInfo,error])

const placeOrderHandler=(e)=>{
e.preventDefault()
dispatch(createOrder({
orderItems:cart.cartItems,
shippingAddress,
paymentMethod:cart.paymentMethod,
itemsPrice:cart.itemsPrice,
shippingPrice:cart.shippingPrice,
taxPrice:cart.taxPrice,
totalPrice:cart.totalPrice,
}))

}
return (  <StyledShipping variants={pageAnimation} initial="hidden" animate="show" exit="exit">
    <Meta title="Place Order"/>
      {error && <Message variant="danger">{error}</Message>}
    {loading && <Loader />}
<CheckoutSteps step1 step2 step3 step4/>

<StyledContainer>
        {/* <!--starting of row--> */}

        <StyledCol70>
          {/* <!--col starting--> */}
          <div className="col70">
            <div className="row ">
    <div className="title">SHIPPING</div>
    <div className="text">{cart.shippingAddress.address}</div>
  
            </div>
            <div className="line"></div>
            <div className="row ">
    <div className="title">PAYMENT METHOD</div>
    <div className="text">Method: {cart.paymentMethod}</div>
            </div>
            <div className="line"></div>
            <div className="row ">
    <div className="title">ORDER ITEMS</div>
    {cart.cartItems.length===0?<CartMessage> Your cart is empty</CartMessage>:
    
    <div className="img">
        {cart.cartItems.map((item,index)=>(
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
            <span className="w2">${cart.itemsPrice}</span></div>
            <div className="line"></div>
            <div className="price"><span className="w1">Shipping</span> 
            <span className="w2"> ${cart.shippingPrice}</span></div>
            <div className="line"></div>
            <div className="price"><span className="w1">Tax</span>
             <span className="w2">${cart.taxPrice} </span></div>
            <div className="line"></div>
            <div className="price"><span className="w1">Total</span>
             <span className="w2">${cart.totalPrice} </span></div>
            <div className="line"></div>
            <div className="form">
              <button
   disabled={cart.cartItems===0}
   onClick={placeOrderHandler}
              >
                Place Order
              </button>
            </div>
          </div>
          {/* <!--col ending--> */}
        </StyledCol30>
        {/* <!--ending of row--> */}
      </StyledContainer>


    </StyledShipping>);
}
 const StyledShipping=styled(motion.div)`
min-height:81vh;
 `
 const StyledContainer = styled(motion.div)`
 padding: 0rem 2rem;
 display: flex;
 flex-flow: row wrap;
 @media screen and (max-width: 900px) {
  flex-flow: column wrap;
  padding: 0rem 0rem;
    }
 width: 100%;
`;

const StyledCol70 = styled(motion.div)`
  flex: 70%;
  padding: 0rem 0.5rem 0rem 0rem;
  @media screen and (max-width: 900px) {
  padding: 0rem;
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
        .text,.img{
            padding-top:0.2rem;
          padding-bottom:0.8rem;
        }
        .img{
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
      }
    }
  }
`;
export default PlaceOrder;