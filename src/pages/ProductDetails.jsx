import React, { useEffect ,useState} from "react";
import { Link,useHistory,useLocation } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
//components
import Rating from "../components/Rating";

import Loader from "../components/Loader";
import Message from "../components/Message";
//actions
import { listProductDetails,createProductReview ,deleteProductReview} from "../actions/productActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion} from "framer-motion";
import { pageAnimation } from "../animations";
import {PRODUCT_CREATE_REVIEW_RESET, PRODUCT_DELETE_REVIEW_RESET} from "../constants/productConstants"
import CartMessage from "../components/CartMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Meta from "../components/Meta";

const ProductDetails = () => {
  const history=useHistory()
  const [qty,setQty]=useState(1)
  const [rating,setRating]=useState(0)
  const [comment,setComment]=useState("")
  const dispatch = useDispatch();
  const location=useLocation();
  const id=location.pathname.split('/')[2];
  const productDetails=useSelector((state)=>state.productDetails)
const { loading, product, error}=productDetails
const [imgSrc,setImgSrc]=useState("")
  const productCreateReview=useSelector((state)=>state.productCreateReview)
const { loading:loadingCreateReview, error:errorCreateReview,success:successCreateReview}=productCreateReview
const productDeleteReview=useSelector((state)=>state.productDeleteReview)
const { loading:loadingDeleteReview, error:errorDeleteReview,success:successDeleteReview}=productDeleteReview

const userLogin=useSelector((state)=>state.userLogin)
const {userInfo}=userLogin;

  useEffect(() => {

    if(successCreateReview){
      setTimeout(() => {
        setRating(0)
        setComment('')
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        dispatch(listProductDetails(id))
      }, 2000)
    }
    else if(successDeleteReview){
      setTimeout(() => {
        dispatch({type:PRODUCT_DELETE_REVIEW_RESET})
        dispatch(listProductDetails(id))
      }, 2000)
    }
    else if(errorCreateReview){
      setTimeout(() => {
        dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
      }, 2000)
    }
    else if(errorDeleteReview){
      setTimeout(() => {
        dispatch({type:PRODUCT_DELETE_REVIEW_RESET})
      }, 2000)
    }
    else{dispatch(listProductDetails(id));}
  },[dispatch,location.pathname,successCreateReview,errorCreateReview,successDeleteReview,errorDeleteReview]);

const addToCartHandler=()=>{
history.push(`/cart/${id}?qty=${qty}`)
}
const submitHandler=(e)=>{
e.preventDefault()
dispatch(createProductReview(id,{rating,review:comment}))
}
const deleteHandler=(id)=>{
  if(window.confirm("Are you sure")){
  dispatch(deleteProductReview(id))}
}
  return (
    <StyledDetails variants={pageAnimation} initial="hidden" animate="show" exit="exit">
    
      <Link to="/">
        <button className="btn">Go back</button>
      </Link>
      {errorCreateReview&&
      <Message variant="danger">{errorCreateReview}</Message>
    }
          {errorDeleteReview&&
      <Message variant="danger">{errorDeleteReview}</Message>
    }
      {successCreateReview&&<Message variant="success">Review created successfully</Message>}
      {successDeleteReview&&<Message variant="success">Review deleted successfully</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (<>
        <Meta title={product.name}  />
      <StyledContainer>
        {/* <!--starting of row--> */}
        <StyledCol30>
          {/* <!--col starting--> */}
          <div className="col30">
            <img src={imgSrc||product.image.url}  id="expandedImg" />

            <div className="jvProColRow">
              <div className="proCol20">
                <img src={product.image.url} onClick={()=>(setImgSrc(product.image.url))}
                 className={imgSrc===product.image.url?"active":imgSrc===""?"active":""} />
              </div>
              {product.images.map((image) => (
                <div key={image.id} className="proCol20">
                  <img src={image.url} className={imgSrc===image.url?"active":""} onClick={()=>(setImgSrc(image.url))}/>
                </div>
              ))}
            </div>
          </div>
          {/* <!--col ending--> */}
        </StyledCol30>

        <StyledCol50>
          {/* <!--col starting--> */}
          <div className="col50">
            <div className="title ">
              <h4>{product.name}</h4>
            </div>
            <h2 className="price">${product.price}</h2>
            <div className="rating">
              <Rating
                value={product.ratingAverage}
                text={`${product.ratingQuantity}reviews`}
              />
            </div>

            <div className="des mt-3 text-justify">
              <h2>Product Details</h2>
              {product.description}
            </div>
          </div>
          {/* <!--col ending--> */}
        </StyledCol50>

        <StyledCol20>
          {/* <!--col starting--> */}
          
          <div className="col20">
       
            <div className="price"><span className="w1">Price:</span> <span className="w2"> ${product.price}</span></div>
            <div className="status">
            <span className="w1">Status:</span> 
            <span className="w2">{product.countInStock > 0 ? "In stock" : "Out of stock"}</span>
            </div>
            
{product.countInStock>0&&(
<div className="listGroup"><span className="w1">Qty</span><span  className="w2">
 
  <select name="qty" value={qty} onChange={(e)=>setQty(e.target.value)}>
{
[...Array(product.countInStock).keys()].map((x)=>(
<option value={x+1} key={x+1}>{x+1}</option>
))
}
  </select>

  </span></div>

)}

            <div className="form">
              <button
                type="submit"
                name="btn"
                disabled={product.countInStock === 0}
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </div>
          </div>
          {/* <!--col ending--> */}
        </StyledCol20>
        {/* <!--ending of row--> */}
      </StyledContainer>
      <StyledContainer>
      <StyledReviewCont>
        
<div className="reviewCont">
<h2>Reviews</h2>
{product.reviews.length===0&&<CartMessage>No reviews</CartMessage>}
<div className="reviews">
  {product.reviews.length!==0?product.reviews.map((review)=>(
   <div className="review" key={review.id}>
     <div className="left"><strong>{review.user.name&&review.user.name.split(" ")[0]}</strong>
<Rating value={review.rating&&review.rating}/>
<p>{review.createdAt&&review.createdAt.substring(0,10)}</p>
<p>{review.review&&review.review}</p></div>
{userInfo&&userInfo.role!=="user"&&
<div className="right">
  <button onClick={()=>deleteHandler(review.id)}><FontAwesomeIcon icon={faTrash}/></button>
</div>}
   </div>

  )):""}
</div>
<div className="createReview">
    <h2>Write a review</h2>
    {userInfo?(
      <form onSubmit={submitHandler}>
       <FormGroup>
          <label for="rating">Rating</label>
     <select value={rating} onChange={(e)=>setRating(e.target.value)}>
<option value="">Select...</option>
<option value="1">1-Poor</option>
<option value="2">2-Fair</option>
<option value="3">3-Good</option>
<option value="4">4-Very Good</option>
<option value="5">5-Excellent</option>
     </select>
        </FormGroup>
        <FormGroup>
          <label for="rating">Comment</label>
 <textarea row="3" value={comment} onChange={(e)=>setComment(e.target.value)}>
 </textarea>
        </FormGroup>
        <button type="submit" disabled={comment.length===0||rating===0}>Submit</button>
      </form>
    ):
    <CartMessage>Please <Link to="/login">log in</Link> to create review</CartMessage>}
  </div>
</div>
      </StyledReviewCont>
      </StyledContainer>
      </>
      )}
    </StyledDetails>
  );
};
const StyledDetails = styled(motion.div)`
  min-height: 85vh;
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
const StyledContainer = styled(motion.div)`
  padding: 0rem 1rem;
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  @media screen and (max-width: 900px) {
    flex-flow: column wrap;
    padding: 0rem 0rem;
    }
`;
const StyledCol30 = styled(motion.div)`
  flex: 30%;
  display: flex;
  flex-flow: column wrap;
background:white;
border-radius:5px 0px 0px 5px;
@media screen and (max-width: 900px) {
      border-radius: 0px;
    
    }
  .col30 {
    @media screen and (max-width: 900px) {
      border-radius: 0px;
     height: none;
    }
    border-radius: 5px 0px 0px 5px;
    height: 70vh;
    background-color: white;
    img {
      height: 82%;
      width: 100%;
      border-radius: 5px 0px 0px 5px;
      @media screen and (max-width: 900px) {
      border-radius: 0px;
    }
      display: block;
    }
    .jvProColRow {
      display: flex;
      height: 18%;
      padding: 0.2rem;
    }
    .proCol20 {
      flex: 33.33%;
      padding: 0.1rem;
      white-space: nowrap;
      overflow: hidden;
 
      .active{
        border:2px solid #5892d4;
        opacity:0.8;
        &:hover {
          border:2px solid #5892d4;
        opacity:0.8;
        }
      }
      img {
        height: 100%;
        width: 100%;
        border: 1px solid #99a8b2;
        border-radius: 2px;
        display: block;
        object-fit:contain;
        &:hover{
          cursor: pointer;
          border: 1.5px solid #147abe;
        }
      }
 
    }
  }
`;
const StyledCol50 = styled(motion.div)`
  flex: 50%;
  padding: 0rem 0.5rem 0rem 0rem;
  @media screen and (max-width: 900px) {
    padding: 0rem;
    }
  .col50 {
    background-color: white;
    border-radius: 0px 5px 5px 0px;
    min-height: 70vh;
    width: 100%;
    padding: 0rem 0.8rem 0rem 0.8rem;
    @media screen and (max-width: 900px) {
    padding: 0rem 0.5rem;
    border-radius:0px;

    }
    .title {
      h4 {
        font-size: 1.8rem;
        padding: 0.2rem 0rem;
        font-weight: 500;
      }
    }
    .price {
      font-size: 1.5rem;
      font-weight: 500;
    }
    .rating {
      padding: 0.2rem 0rem;
    }
    .des {
      h2 {
        font-size: 1.5rem;
        padding-top: 0.5rem;
        font-weight: 500;
      }
      width: 100%;
      word-break: normal;
      white-space: normal;
    }
  }
`;
const StyledCol20 = styled(motion.div)`
  flex: 20%;
  padding: 0rem;

  @media screen and (max-width: 900px) {
    position:fixed;
  bottom:0;
  left:0;
  width:100%
    }
  .col20 {
    @media screen and (max-width: 900px) {
border-radius: 0px;
min-height: 2rem;
    }
    min-height: 5rem;
    border: 0px solid grey;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-flow: column wrap;
    padding: 0.5rem;
    .price,
    .status,.listGroup {
      font-size: 1.1rem;
      display:flex;
      @media screen and (max-width: 900px) {
display:none;
border-radius: 0px;
    }
  .w1{
  width:30%;

    }
    .w2{
width: 70%;
select{
padding:0.3rem 1.5rem
      }
    }
    }
 
    .form {
      text-align: center;
      button {
        margin-top:0.5rem;
        width: 100%;
        padding: 0.8rem;
        text-align: center;
        cursor: pointer;
   
      }
    }
  }
`;


const StyledReviewCont= styled(motion.div)`
width:80%;
padding: 0.5rem 0.5rem 0rem 0rem;
@media screen and (max-width: 900px) {
width:100%;
padding: 0rem;
background-color:white;
margin:none
    }
.reviewCont{
  @media screen and (max-width: 900px) {
    border-radius:0px;
    padding: 0.5rem;
    margin:none
    }
border-radius:5px;
display: flex;
background-color:white;
    flex-flow: column wrap;
    padding: 1rem;

    h2{
  
      font-size:1.7rem;
      font-weight: 500;
      padding:0.6rem 0rem;
      @media screen and (max-width: 900px) {
text-align: center;
 }
    }
    .reviews{
     display: flex;
     flex-flow:column wrap;
    
      .review{padding:0.4rem 0.4rem;
      display:flex;
      .right{
        margin-left:auto;
        button{
          background:red;
          padding:0.2rem 0.4rem;
          cursor: pointer;
        }
      }
      }
    }
    .createReview{
        display:flex;
        flex-flow: column wrap;
        form{
          @media screen and (max-width: 900px) {
width:100%;
display:flex;
flex-flow: column wrap;
align-items:center
 }
          width:30rem;
          button{
  padding: 8px 20px;
  margin:0.1rem 0rem;
}
        }
      }
}
`
const FormGroup= styled(motion.div)`
      display:flex;
      flex-flow:column wrap;
      padding:0.2rem 0rem;
      @media screen and (max-width: 900px) {
width:100%;
align-items:center
    }
      label{
          padding:0.1rem 0rem;
       
      }
select{
  padding:0.4rem;
  width:20rem;
 
  @media screen and (max-width: 900px) {
  width:100%;
  border: 1px solid grey;
    }
}

textarea{
  padding:0.2rem;
  width:20rem;
  &:focus{

    }
    outline:none;
@media screen and (max-width: 900px) {
  width:100%;
  border: 1px solid grey;
    }
}
`
export default ProductDetails;
