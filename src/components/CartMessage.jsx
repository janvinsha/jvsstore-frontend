import React from "react";

//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";

const CartMessage = ({ variant, children }) => {

  return (
    
    <StyledAlert >
   
     <motion.div className={variant } id="message"> <div className="font">
       {children}</div></motion.div>
    </StyledAlert>
    
  );
};
CartMessage.defaultProps = {variant: "blue" };
const StyledAlert = styled(motion.div)`
cursor: pointer;
#message{
  display:flex;
justify-content:center;
padding: 1.2rem;
    width: 30rem;
    text-align: center;
    color: white;
    margin-left: auto;
    margin-right: auto;
    margin-bottom:1.5rem;
    font-weight:500;
    @media screen and (max-width: 900px) {width:100%}
.font{
  color:white
}
}

 //colors
 .success {
  background:#07a707;
    @media screen and (max-width: 900px) {width:100%}
  }
  //
  .blue {
    background-color: lightblue;
  
    margin-bottom:1.5rem;
    a{
      color:black;
      font-weight:600;
      &:hover{
color:#443636
      }
    }    
    @media screen and (max-width: 900px) {width:100%}
  }
//
.danger {
    background-color: #db4646;

    color: white;

    @media screen and (max-width: 900px) {width:100%}
  }

`;
export default CartMessage;
