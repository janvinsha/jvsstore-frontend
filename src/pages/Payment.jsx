import React,{useState,useEffect} from 'react';
import {  useHistory } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";

//components


import CheckoutSteps from "../components/CheckoutSteps";
//actions
import {savePaymentMethod } from "../actions/cartActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pageAnimation } from "../animations";
import Meta from '../components/Meta';
const Payment = () => {
    const history=useHistory() 
    const dispatch=useDispatch()
    const location=useLocation()
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart
    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin;
 
    useEffect(()=>{
        if(!userInfo){
      history.push("/login?redirect=payment")
        }else if(!shippingAddress||!shippingAddress.address){
            history.push("/shipping")
          }
          // eslint-disable-next-line
      },[history,shippingAddress,userInfo])
const [paymentMethod,setPaymentMethod]=useState("Paystack")

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
        }
    return ( <StyledPayment variants={pageAnimation} initial="hidden" animate="show" exit="exit">
          <Meta title="Payment"/>
<CheckoutSteps step1 step2 step3/>
<div className="payment">
<form onSubmit={submitHandler}>
<h2>Payment Method</h2>
<h4>Select Payment Method</h4>
<div class="form-group">
<input type="radio" id="paystack" value="Paystack" name="paymentMethod"
 onChange={(e)=>setPaymentMethod(e.target.value)} checked/>
<label for="paystack">Credit card,Bank tranfer,USSD</label>
        </div>
        <div class="textBtn">
    <button type="submit"
    
    >Continue</button>
    </div>
</form>
</div>



    </StyledPayment> );
}
 const StyledPayment=styled(motion.div)`
 
 min-height:81vh;
 .payment{
    display:flex;
 flex-flow:column wrap;
 align-items:center;
 justify-content:center;
 

 h2{
     font-weight:500;
     padding:0.2rem;
     text-align:center;
     font-size:1.7rem;
     @media screen and (max-width: 900px) {
        font-size:1.3rem;
    }
 }
 h4{
     margin-top:1rem;
     font-size:1.2rem;
     font-weight:500;   
      @media screen and (max-width: 900px) {
        font-size:1.1rem;
    }
 }
 form{margin:0rem 0rem;
     background-color:#1f6f8b;
     color:white;
     width:40%;
     min-height:40vh;
     padding:1rem 2rem;
     border-radius:5px;
     @media screen and (max-width: 900px) {
  width:100%;
  min-height:25vh;
  border-radius:0px;
    }
 .form-group{
 
      flex-flow:row wrap;
      padding:0.2rem 0rem;
      label{
          padding:0.2rem 0rem;
          small{
            color:#e9cece;
            font-size:0.6rem
          }
      }
  }
  a {
  color: lightblue;
  &:hover{
    color: #b1d1db;
  }
}input{
  margin-right:0.3rem;
cursor: pointer;
    &:focus{
outline:none;

    }
}
.textBtn{
    text-align:center;
    button{
  padding: 0.6rem 2rem;
  margin:1rem auto;
}
}
 }
 }
 `
export default Payment;