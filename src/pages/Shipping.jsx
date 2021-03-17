import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";

//components

import CheckoutSteps from "../components/CheckoutSteps";
//actions
import {saveShippingAddress } from "../actions/cartActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion} from "framer-motion";
import { pageAnimation } from "../animations";
import Meta from "../components/Meta";

const Shipping = () => {
    const history=useHistory() 
    const dispatch=useDispatch()
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart
const [address,setAddress]=useState(shippingAddress.address||"")
const [city,setCity]=useState(shippingAddress.city||"")
const [country,setCountry]=useState(shippingAddress.country||"")
const [postalCode,setPostalCode]=useState(shippingAddress.postalCode||"")

const userLogin=useSelector((state)=>state.userLogin)
const {userInfo}=userLogin;
useEffect(()=>{
  if(!userInfo){
history.push("/login?redirect=shipping")
  }
    // eslint-disable-next-line
},[userInfo])

const submitHandler=(e)=>{
e.preventDefault()
dispatch(saveShippingAddress({address,city,country,postalCode}))
history.push("/payment")
}
return (  <StyledShipping variants={pageAnimation} initial="hidden" animate="show" exit="exit">
    <Meta title="Shipping"/>
<CheckoutSteps step1 step2/>
<div className="shipping">


<form onSubmit={submitHandler}>
<h2>Shipping</h2>
<div class="form-group">
          <label for="name">Address</label>
          <input class="form-control"
           placeholder="Enter address"
           type="text" value={address} onChange={(e) => setAddress(e.target.value)} required/>
        </div>
        <div class="form-group">
          <label for="name">City</label>
          <input class="form-control" 
           placeholder="Enter city"
          type="text" value={city} onChange={(e) => setCity(e.target.value)} required/>
        </div> 
        <div  class="form-group">
          <label for="name">Postal Code</label>
          <input class="form-control" type="text"
           placeholder="Enter postal code"
           value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div> 
        <div class="form-group">
          <label for="name">Country</label>
          <input class="form-control"
           type="text" value={country}
           placeholder="Enter country"
            onChange={(e) => setCountry(e.target.value)} required/>
        </div> 
        <div class="textBtn">
    <button type="submit"
     disabled={address.length === 0||city.length===0||postalCode.length===0||country.length===0}
    >Continue</button>
    </div>
</form>
</div>

    </StyledShipping>);
}
 const StyledShipping=styled(motion.div)`
 min-height:81vh;
 .shipping{
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
 form{margin:0rem 0rem;
     background-color:#1f6f8b;
     color:white;
     width:40%;
     min-height:68vh;
     padding:1rem 2rem;
     border-radius:5px;
     @media screen and (max-width: 900px) {
  width:100%;
  min-height:50vh;
  border-radius:0px;
  padding:1rem 2rem;
    }
 .form-group{
      display:flex;
      flex-flow:column wrap;
      padding:0.5rem 0rem;
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
    border-radius:5px;
    padding:0.5rem;
    border: 1px solid grey;

    
    &:focus{
outline:none;

    }
}
.textBtn{
    text-align:center;
    button{
  padding: 0.6rem 2rem;
  margin:0.2rem auto;
}
}
 }
 }
 `
export default Shipping;