import React, { useEffect ,useState} from "react";
import { Link} from "react-router-dom";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion} from "framer-motion";

import { pageAnimation } from "../animations";

import Meta from "../components/Meta";

const NotFound = () => {


    return (<StyledLogin variants={pageAnimation} initial="hidden" animate="show" exit="exit">
  <Meta title="404"/>
         <div className="notFound">
<h1>Page Not Found</h1>
<Link to="/">Go to home page</Link>
         </div>
    </StyledLogin>
   
       );
}



 
const StyledLogin = styled(motion.div)`
min-height:81vh;
display:flex;
align-items:center;
justify-content:center;
.notFound{
    min-height:60vh;
    background-color:white;
    width:60rem;
    display:flex;
    flex-flow:column wrap;
    align-items:center;
    justify-content:center;
    a{
        color:black;
        font-size:1rem;
        &:hover{
color:#75baf1
        }
    }
}
`
export default NotFound;