import React,{useState,useEffect} from "react";

//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faTimes,

} from "@fortawesome/free-solid-svg-icons";
import { fade } from "../animations";
const Message = ({ variant, children }) => {
const [show,setShow]=useState(true);

useEffect(()=>{

setShow(true)
},[])
setTimeout(() => {
  setShow(false)
}, 2000)
  return (
    
    <StyledAlert  variants={fade} initial="hidden" animate="show" onClick={()=>setShow(false)}>
     {show?
     <motion.div className={variant } id="message" onClick={()=>setShow(false)}> <div className="font">
       {children}</div></motion.div>:""}
    </StyledAlert>
    
  );
};
Message.defaultProps = {variant: "blue" };
const StyledAlert = styled(motion.div)`
cursor: pointer;
z-index:20;
#message{
  display:flex;
justify-content:center;
padding: 1.3rem;
    width: 100%;
    position:fixed;
    top:0;
    left:0;
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
    }    @media screen and (max-width: 900px) {width:100%}
  }
//
.danger {
    background-color:#db7777;

    color: white;

    @media screen and (max-width: 900px) {width:100%}
  }

`;
export default Message;
