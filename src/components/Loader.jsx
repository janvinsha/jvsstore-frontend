import React from "react";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion} from "framer-motion";
import { loader } from "../animations";

const Loader = () => {
  return(
  <StyledContainer>
   <StyledLoader variants={loader} animate="animateOne"/>
   </StyledContainer>
  )
};
const StyledContainer=styled(motion.div)`

display:flex;
position:fixed;
left:0;
top:0;
height:100vh;
width:100%;
align-items:center;
justify-content:center;
z-index: 20;
background: rgba(0, 0, 0, 0.2);

`
const StyledLoader = styled(motion.div)`
  width: 10px;
  height: 10px;
  margin: 40px auto;
  border-radius: 50%;
  background-color: white;
`;

export default Loader;
