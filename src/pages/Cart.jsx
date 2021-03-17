
import React, { useEffect } from "react"; 
import { Link } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
//components

import CartMessage from "../components/CartMessage";
//actions
import { addToCart,removeFromCart } from "../actions/cartActions";
//Styling and Animationimport styled from "styled-components";
import { pageAnimation } from "../animations";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

import { motion} from "framer-motion";
import { useLocation,useHistory } from "react-router-dom";
import Meta from "../components/Meta";
const Cart = () => {
    const dispatch = useDispatch();
    const location=useLocation();
    const history=useHistory()
    const productId=location.pathname?location.pathname.split('/')[2]:""
  const qty=location.search?Number(location.search.split("=")[1]):1

  const cart=useSelector((state)=>state.cart.cartItems)
useEffect(()=>{
if(productId){
    dispatch(addToCart(productId,qty))
}
},[dispatch,productId,qty])
const removeFromCartHandler=(id)=>{
dispatch(removeFromCart(id))

}
const checkoutHandler=()=>{
history.push('/login?redirect=shipping')
}
    return ( <StyledCart variants={pageAnimation} initial="hidden" animate="show"  exit="exit">
        <Meta title="Cart"/>
        <h2 >Shopping Cart</h2>
{cart.length===0?<CartMessage>Your cart is empty <Link to="/">Go back</Link></CartMessage>:
<>
    <StyledDeskCart>
      {/* <!--jvProRow starting--> */}
      <StyledCol80>
        {/* <!--jvCol80 starting--> */}
        <div className="col80Col">
          <div className="row">
            <div className="col85 ">
          <h4 >Products</h4></div>
          <div className="col15">
          <h4 >Price</h4></div>
        </div>
      
        {/* //   <!--col80 starting--> */}
        {cart.map((product)=>(
        <div className="row proRow" key={product.product}>
          <div className="col15 mt-1">
            <img src={product.image&&product.image.url}/>
          </div>
          <div className="col70 ">
           <Link to={`/product/${product.product}`}>{product.name}</Link>
            <form>
            <select name="qty" value={product.qty} onChange={(e)=>dispatch(addToCart(product.product,Number(e.target.value)))}>
{
[...Array(product.countInStock).keys()].map((x)=>(
<option value={x+1} key={x+1}>{x+1}</option>
))
}
  </select>
               <button type="button" onClick={()=>removeFromCartHandler(product.product)}>
                 Delete
                </button>
              </form>
          </div>
          <div className="col15 price">${product.price}</div>
          </div>  
           ))}
            {/* <!--col80 end--> */}
          </div>
          {/* <!--jvCol80 ending--> */}
        </StyledCol80>
    
        <StyledCol20>
          {/* <!--col starting--> */}
          <div className="col20Col">
            <div className="text-dark pl-3 pt-2 pb-1 ">Subtotal({cart.reduce((acc,item)=>acc+item.qty,0)}
             items) <div className="price">
               ${cart.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}</div>
              </div>
         
              <button type="button" disabled={cart.length===0} className="cartBtn" onClick={checkoutHandler}>
                Proceed to Checkout
              </button>
            
          </div>
          {/* <!--col ending--> */}
        </StyledCol20>
        {/* <!--jvProRow--> */}
      </StyledDeskCart>
    
      {/* <!--Mobile version--> */}
      <StyledMobCart>
        {cart.map((product)=>(
      <StyledMobRow key={product.product}>
          <div className="mobRow">
       <div className="mobCartCol30">
        <img src={product.image.url} />
       </div>
       <div className="mobCartCol70">
       <Link to={`/product/${product.product}`}> {product.name}</Link>
       <h3 className="price">${product.price}</h3>
      </div>
      </div>
      <div className="form">
        <button type="button" className="btn30" onClick={()=>removeFromCartHandler(product.product)}>
           Delete
          </button>
          <div className="signText">
      
      <form >
   <button type="button"  disabled={product.qty<=1} onClick={()=>dispatch(addToCart(product.product,product.qty-1))
 
  }> <FontAwesomeIcon icon={faMinus} /></button>
   
      <input type="text"  value={product.qty} disabled  />
      <button type="button"
      disabled={product.qty>=product.countInStock}
      onClick={()=>dispatch(addToCart(product.product,product.qty+1))}>
           <FontAwesomeIcon icon={faPlus} /></button>
           </form>
        </div>
        </div>
      </StyledMobRow>
    ))}
      <StyledCheck>
      <div className="col20Col">
            <div className="text-dark pl-3 pt-2 pb-1 ">Subtotal({cart.reduce((acc,item)=>acc+item.qty,0)}
             items) <div className="price">
               ${cart.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}</div>
              </div>
         
              <button type="button" disabled={cart.length===0} className="cartBtn" onClick={checkoutHandler}>
                Proceed to Checkout
              </button>

          </div>
      </StyledCheck>
      </StyledMobCart>
      </>}
      </StyledCart>);
}
 
const StyledCart=styled(motion.div)`
min-height:81vh;
 h2 {
    text-align: center;
    padding: 1rem;
  }
  @media screen and (max-width: 900px) {
      h2{
        padding:0.5rem;
        font-size:1.4rem
      }
    }

`
const StyledDeskCart=styled(motion.div)`
  display: flex;
  flex-flow: row wrap;
  padding: 0rem 1rem;
  width: 100%;
  @media screen and (max-width: 900px) {display:none}
  `
  const StyledCol80=styled(motion.div)`
     flex: 80%;
  padding: 0px 0.5rem 0px 0px;
  .col85{
      flex:85%
  }
  .col15{
      flex:15%;
      img{
        height: 4rem;
  width: 4rem;
      }
     
  }
  .price{
          font-weight:500
      }
  .col70{
      flex:70%;
   
    a{
        color:black;
        font-weight:400;
    
        &:hover{
            color:#221e1e;
        }
    }
      select{
width:3rem;
height:1.8rem
      }
      button{
          padding:0.35rem;
          margin-left:0.2rem;
          cursor: pointer;
      }
  }
  .col80Col{
    background-color: white;
  width: 100%;
  border-radius: 5px;
  display: flex;
  flex-flow: row wrap;
  padding: 1rem;

 h4{
     font-size:1.4rem;
     font-weight:500
 }
  .row{
      display:flex;
      flex-flow: row wrap;
      width:100%
  }
  .proRow{
    display:flex;
      flex-flow: row wrap;
      width:100%;
     
      padding:0.3rem 0rem;
  }
}
  `

  const StyledCol20=styled(motion.div)`
   flex: 20%;
  padding: 0px;

  .col20Col{
    min-height: 5rem;
    border: 0px solid grey;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-flow: column wrap;
    padding: 0.5rem;
    text-align: center;
.price{
    font-weight:500
}
      button {
        margin-top:0.5rem;
        border-radius: 5px;
        width: 100%;
        padding: 0.8rem;
        text-align: center;
        cursor: pointer;
     
    }}
 
  `
////////////////////////////Mobile styles
const StyledMobCart=styled(motion.div)`
display:none;
min-height:81vh;
@media screen and (max-width: 900px) {
display:block
}
`
const StyledMobRow=styled(motion.div)`

@media screen and (max-width: 900px) {
background-color:white;

margin-bottom:0.3rem;
display:block;
.mobRow{
    display:flex;
    .mobCartCol30{
    flex:20%;
    padding:0.3rem;
    img{
        width:100%;
    }
}
.mobCartCol70{
    flex:80%;
    padding:0.3rem 0rem;
    a{
        color:black;
        font-size:1.2rem;
    }
    h3{
        font-weight:500;
        font-size:1.4rem;
        color:black;
    }
}
}

.form{
    display:flex;
    width:100%;
    padding:0.2rem 0.4rem;
    .btn30{

        margin-right:auto;
        padding:0.2rem 0.6rem;
        font-size:1rem;
cursor: pointer;
    }
    form{

        width:2rem;
        margin-left:auto;
        margin-right:3rem;
        display:flex;
        input{
width:2rem;
padding:0.2rem;
text-align: center;
border:1px solid grey;
border-radius:5px;
        }button{
            border-radius:50% ;
           
         padding:0.2rem;
         margin:0rem 0.2rem;
        
cursor: pointer;
    
        }
    }
}
}
`
const StyledCheck=styled(motion.div)`
@media screen and (max-width: 900px) {
    min-height: 5rem;
    border: 0px solid grey;
    background-color: white;
    border-radius: 0px;
    display: flex;
    flex-flow: column wrap;
    padding: 0.5rem;
    text-align: center;

.price{
    font-weight:500
}
      button {
        margin-top:0.5rem;
        border: 0px;
    
       
        width: 100%;
        padding: 0.8rem;
        text-align: center;
        cursor: pointer;
   
    }


}
`
export default Cart;