import React from "react";
import { Link } from "react-router-dom";
//Redux

//components
import Rating from "../components/Rating";

//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion} from "framer-motion";

import { popUp } from "../animations";
const Product = ({ product }) => {
  return (
    <StyledProduct variants={popUp} animate="show" initial="hidden">
      <Link to={`/product/${product.id}`}>
        <img src={product.image.url} alt="image" />
      </Link>
      <div className="talk">
        <div className="title">
          <Link to={`/product/${product.id}`}>
            <strong>{product.name.length>70?product.name.substring(0,70)+"...":product.name}</strong>
          </Link>
        </div>
        <Rating value={product.ratingAverage} text={`${product.ratingQuantity} reviews`} />
        <h3>${product.price} </h3>
      </div>
    </StyledProduct>
  );
};
const StyledProduct = styled(motion.div)`
  background: white;
  border-radius: 10px;
  min-height: 40vh;

  overflow: hidden;
  color: black;
  @media (max-width: 900px) {
    min-height: 30vh;
    border-radius: 5px;
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
  .talk {
    padding: 0.2rem 0.8rem;
    @media (max-width: 900px) {
      padding: 0.1rem 0.3rem;
  }
    a {
      color: black;
      &:hover {
        color: #413737;
      }
    }
  }
  .title {
    color: black;
    padding: 0.2rem 0rem;
    
  }
  .rating {
    color: black;
    padding: 0.2rem 0rem;
  }
  h3 {
    color: black;
    padding: 0.2rem 0rem 0.4rem 0rem;
    font-weight:500
  }
`;
export default Product;
