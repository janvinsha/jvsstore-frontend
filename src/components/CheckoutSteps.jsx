import React from 'react';
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
const CheckoutSteps = ({step1,step2,step3,step4}) => {
    return ( <StyledSteps>
<div className="steps">
{step1?   <Link to="/login">
            Login
        </Link>:  
         <Link to="/login" disabled className="disabledCursor">
            Login
        </Link>}
        {step2?   <Link to="/shipping">
            Shipping
        </Link>:  
         <Link to="/shipping" className="disabledCursor" disabled>
            Shipping
        </Link>}
        {step3?   <Link to="/payment">
            Payment
        </Link>:  
         <Link to="/payment" className="disabledCursor" disabled>
            Payment
        </Link>}
        {step4?   <Link to="/placeorder">
            Place order
        </Link>:  
         <Link to="/placeorder" className="disabledCursor" disabled>
        Place order
        </Link>}

</div>
  
    </StyledSteps> );
}
 const StyledSteps=styled(motion.div)`
 
 padding:1rem;
 display:flex;
 justify-content:center;
 a{
     padding:0rem 1rem;
     color:black;
     font-weight:500;
     cursor:pointer;
 }
 .disabledCursor{
    color:#918585;
    cursor: default;
    pointer-events:none
 }
 @media screen and (max-width: 900px) {
      
        padding:0.8rem;
        a{
     padding:0rem 0.2rem;
     color:black;
     font-weight:500;
     font-size:0.8rem;
     cursor:pointer;
 }
      
      }
 `
export default CheckoutSteps;