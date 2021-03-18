import React, { useEffect } from 'react';
import {Link} from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
//Redux
import { useDispatch, useSelector } from "react-redux";

import {listTopProducts} from "../actions/productActions"
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion,} from "framer-motion";

import Loader from './Loader';
import { pageAnimation } from '../animations';

const ProductCarousel = () => {
    const dispatch=useDispatch()
    const productTopRated=useSelector((state)=>state.productTopRated)
    const {error,loading,products}=productTopRated;
    useEffect(()=>{
dispatch(listTopProducts())
    },[dispatch]);
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3200,
      pauseOnHover: true,
      className: "center",
      centerPadding: "0px",
      centerMode: true,
    };
      return (
     <StyledCarousel variants={pageAnimation} initial="hidden" animate="show"  exit="exit">
        <Slider {...settings}>
      
          {
           products&&products.map((product)=>(
              <Link to={`/product/${product.id}`}>
            
              <Product>
<img src={product.image.url} alt=""/>
<h2>{product.name.length>30?product.name.substring(0,30)+"...":product.name} <p> ${product.price} </p></h2>
              </Product>
              </Link>
              ))
          }
 
      </Slider>
      </StyledCarousel>
)
}
const StyledCarousel=styled(motion.div)`


a{
  color:white;
  @media screen and (max-width: 900px) {
color:black
}
}
margin:0rem 2rem;
margin-top:1rem;
padding:1rem 6rem;
background-color: #1c2b2d;
border-radius:5px;

@media screen and (max-width: 900px) {
  margin:0rem 0rem;
  margin-top:0rem;
  padding:0.2rem 0rem;
  border-radius:0px;
  overflow-x:hidden;
  background-color:white
}

`

const Product=styled(motion.div)`
display:flex;
flex-flow:column wrap;
align-items:center;
img{
width:8rem;
border-radius:50%;
@media screen and (max-width: 900px) {
  width:4rem;
}
}
h2{
  font-weight:500;
  font-size:1.2rem;
  @media screen and (max-width: 900px) {
    font-size:1rem;
}
}
`
export default ProductCarousel;



  