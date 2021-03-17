import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <StyledFooter className="footer">
      Copyright &copy; JanvinshaStores
      <p>Website designed by <a href="https://github.com/janvinsha">Janvinsha</a></p>
    </StyledFooter>
  );
};
const StyledFooter = styled(motion.div)`
  text-align: center;
  padding: 1rem;
  background-color: #1c2b2d;
  color: white;
  margin-top: 1rem;
  min-height: 8vh;
  @media screen and (max-width: 900px) {
      font-size:01rem;
      margin-top: 0rem;
    }
  p{
    font-size:1rem;
    padding:0.6rem;
    @media screen and (max-width: 900px) {
      font-size:1rem;
      padding:0.3rem;
    }
    a{
      color:white;
      &:hover{
        color: #ddd6d6;
      }
    }
  }
`;
export default Footer;
