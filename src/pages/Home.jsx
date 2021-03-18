import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";

//components

import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
//actions
import { listProducts } from "../actions/productActions";
import {confirmEmail} from "../actions/userActions"
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pageAnimation } from "../animations";
import { USER_CONFIRM_EMAIL_RESET } from "../constants/userConstants";
import ProductCarousel from "../components/ProductCarousel";
import CartMessage from "../components/CartMessage";
import Meta from "../components/Meta";

const Home = () => {
  const location=useLocation()
  const history=useHistory()
  const dispatch = useDispatch();
  const userLogin=useSelector((state)=>state.userLogin)
  const {userInfo}=userLogin;
  const [verifyTokenError,setVerifyTokenError]=useState(false)

  const userConfirmEmail=useSelector((state)=>state.userConfirmEmail)
  const {success:confirmSuccess,error:confirmError}=userConfirmEmail;
const search=location.search
const verifyToken = search.startsWith("?verify")&&search.split("=")[1] 
const searchString=search&&search.startsWith("?category")&&search.split("&")
const category=searchString?searchString[0].split("=")[1]:""
const keyword=searchString?searchString[1].split("=")[1]:""

let pageNumber=search&&search.startsWith("?page")&&search.split("=")[1]
 if(search&&search.startsWith("?keyword")){
 let string= search.split("&")[1]
 pageNumber=string.split("=")[1]
 }
  useEffect(() => {
    dispatch(listProducts(keyword,category,pageNumber));
    if(userInfo){
    if(verifyToken){
      dispatch(confirmEmail(verifyToken))
      setTimeout(() => {
        dispatch({type:USER_CONFIRM_EMAIL_RESET})
        history.push("/")
      }, 2000)
  }
  }else{
    if(verifyToken){
      setVerifyTokenError(true)
      setTimeout(() => {
        history.push("/")
      }, 2000)
    }
  }
  }, [dispatch,history,verifyToken,keyword,category,pageNumber]);

const productList = useSelector(
    (state) => state.productList
  );
const { loading, products, error ,page,pages}=productList

  return (
    <ProductList variants={pageAnimation} initial="hidden" animate="show"  exit="exit">
  <Meta />
  {keyword&&<Link to="/"> <button className="btn">Go back</button></Link>}
      {confirmError&&<Message variant="danger">{confirmError}</Message>}
{verifyTokenError&&<Message variant="danger">Please login to confirm email</Message>}
{confirmSuccess&&<Message variant="success">Email confirmed successfully</Message>}
{!keyword&&<ProductCarousel/>}
    {!keyword?<h2>Latest Products</h2>:<h2>Searched Products</h2>}
    {products&&products.length==0&&<CartMessage>No products found</CartMessage>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (<>
        <Products >
          {products.map((product) => (
            <Product
              key={product._id}
              id={product._id}
          product={product}
            />
          ))}
        </Products>
        <Paginate pages={pages} page={page} keyword={keyword?keyword:""}/>
        </>
      )}
    </ProductList>
  );
};

const ProductList = styled(motion.div)`
  min-height: 81vh;
  h2 {
    text-align: center;
    padding: 1rem;
    @media (max-width: 900px) {
    font-size:1.4rem;
    padding: 0.7rem;
  }
  }
  .btn {
    @media screen and (max-width: 900px) {
      display:none
    }
    padding: 0.5rem 1rem;
    background-color: #1c2b2d;
    border: none;
    color: white;
    margin: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: #1c2324;
    }
  }
`;
const Products = styled(motion.div)`
  min-height: 40vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding: 0rem 2rem;
  @media (max-width: 900px) {
    min-height: 30vh;
    padding: 0rem 0.5rem;
    padding-bottom:0.5rem;
    grid-row-gap: 0.5rem;
    grid-column-gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    width:100%;
  }
`;
export default Home;
