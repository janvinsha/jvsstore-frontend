import React from "react";
import { Link } from "react-router-dom";

//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";

const Paginate = ( {pages,page,keyword='',currentPage} ) => {
 
    return pages>1&&(
        <StyledPaginate>
            <div className="paginate">
{
    
    [...Array(pages).keys()].map(x=>(
        <Link className={x+1==page&&"active"} key={x+1} to={
            currentPage=="userList"?`/admin/userlist/?page=${x+1}`:
            currentPage=="productList"?`/admin/productlist/?page=${x+1}`:
            currentPage=="orderList"?`/admin/orderlist/?page=${x+1}`:
            keyword?`/search?keyword=${keyword}&page=${x+1}`:`/?page=${x+1}`}
          >
{x+1}
        </Link>
    ))
}</div>
        </StyledPaginate>
    )
}
 
const StyledPaginate=styled(motion.div)`
display:flex;
align-items:center;
justify-content:center;
padding:1rem;
@media screen and (max-width: 900px) {
  padding:0.5rem;
    }
 
.paginate{
    display:flex;
    background:#99a8b2;
    border-radius:10px;
    overflow:hidden;
    a{
    padding:0.8rem 1rem;
    @media screen and (max-width: 900px) {
  padding:0.3rem 0.5rem ;
    }
 
&:hover{
    background:#b6bdc2
}
       
}
.active{
    background:#b6bdc2
        }
}


`

export default Paginate;