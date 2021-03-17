import React, { useEffect } from "react";
import { Link,useHistory,useLocation } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
//components


import Loader from "../components/Loader";
import Message from "../components/Message";
import CartMessage from "../components/CartMessage";
//actions
import {getUserDetails} from "../actions/userActions";
import { logout } from "../actions/userActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profileAnimation} from "../animations";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Meta from "../components/Meta";

const Profile = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const pathname=location.pathname
    const history = useHistory()
    const userDetails=useSelector((state)=>state.userDetails)
    const {loading,error,user}=userDetails
    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin;
useEffect(()=>{
    if(!userInfo){
        history.push("/login")
    }
else{
    dispatch(getUserDetails("me"))
}
},[dispatch,history,userInfo,]);

const submitHandler = (e) => {
    e.preventDefault()
    //Update Profile

  }
  const logoutHandler = () => {
    dispatch(logout())
  }

    return ( <StyledProfile variants={profileAnimation} initial="hidden" animate="show" exit="exit">
          <Meta title="Orders"/>
            {error && <Message variant="danger">{error}</Message>}
    {loading&&user.orders.length==0 && <Loader />}
    <StyledMain>
<StyledLeftNav>
   <div className="nav">
       <Link to="/profile" className={pathname==="/profile"?"active":""} >My Account</Link>
       <Link to="/orders" className={pathname==="/orders"?"active":""}>Orders</Link>
       {user.role=="admin"||user.role=="moderator"? 
       <div className="admin">
         <div className="line"></div>
         <p>Admin</p>
         <div className="line"></div>
         <Link to="/admin/userlist" className={pathname==="/admin/userlist"?"active":""}>Users</Link>
         <Link to="/admin/productlist" className={pathname==="/admin/productlist"?"active":""}>Products</Link>
         <Link to="/admin/orderlist" className={pathname==="/admin/orderlist"?"active":""}>Orders</Link>
      
      </div>
:""
      }
       <div className="line"></div>
       <Link  onClick={logoutHandler} className="logout" >Logout</Link>
   </div>
  
</StyledLeftNav>

        <StyledRight>
        <div className="row">
            <h3>Orders</h3>
            {user.orders.length===0?<CartMessage>You have no orders</CartMessage>:(
           <div className="flex">
  <table>
<thead>
    <tr>
        <th>ID</th>
        <th>DATE</th>
        <th>TOTAL</th>
        <th>PAID</th>
        <th>DELIVERED</th>
        <th></th>
    </tr>
    </thead>
    <tbody>
        {
            user.orders.map((order)=>(
                <tr key={order._id}>
                     <td>{order._id}</td>
                     <td>{new Date(order.createdAt).toISOString().substring(0,10)}</td>
                     <td>{order.totalPrice}</td>
                     <td>{order.isPaid?new Date(order.paidAt).toISOString().substring(0,10):(
                 <FontAwesomeIcon icon={faTimes} color="red"/>
                     )}</td>

                      <td>{order.isDelivered?new Date(order.deliveredAt).toISOString().substring(0,10):(
                 <FontAwesomeIcon icon={faTimes} color="red"/>
                     )}</td>
                     <td><Link to={`/order/${order._id}`}>
                         <button>Details</button>
                         </Link></td>
                </tr>
            ))
        }
    </tbody>
  </table>
  </div>
            )}
</div>
        </StyledRight>
        </StyledMain>
        </StyledProfile> );
}
 const StyledProfile=styled(motion.div)`
 min-height:81vh;
 padding:2rem 2rem;
 @media screen and (max-width: 900px) {
  padding:0rem;
 
    }
 
 `
 const StyledMain=styled(motion.div)`
  display:flex;

 `

 const StyledLeftNav=styled(motion.div)`
 @media screen and (max-width: 900px) {
     display:none;
    }
flex:25%;

h2{
    font-size:1.8rem;
}
.nav{
    display:flex;
    flex-flow:column wrap;
    background:white;
    border-radius:5px;
    .admin{
    display:flex;
    flex-flow:column wrap;
    p{
      color:black;
      text-align:center;
      font-size:1.2rem;
      font-weight:500;
      padding:0.7rem 0rem
    }
 
  }
    .active{

        background-color:lightgray
    }
    .line{
          height:2px;
          width:100%;
          background-color: #99a8b2
        }
    .logout{
      text-align:center;
      color:#c92020;
      &:hover{
        color:#a13333;
        }
    }
    a{
        padding:1rem 1.5rem;
        color:black;
        font-weight:500;
        &:hover{
            color:#504b4b; 
        }
    }
}

`
 const StyledRight=styled(motion.div)`
 flex:75%;
 padding:0rem 0.8rem;
 @media screen and (max-width: 900px) {
    padding:0rem ;

    }
.row{
border-radius:5px;
padding:1rem 2rem;
border-radius:5px;
background-color:white;
width: 100%;
@media screen and (max-width: 900px) {
    border-radius:0px;
    padding:1rem 0.4rem;
    
    }
h3{
    text-align:center;
    color:black;
    font-size:1.6rem;
    font-weight:500;
    margin-bottom:0.5rem;
    @media screen and (max-width: 900px) {
        font-size:1.2rem;
    }
}
.flex{
    @media screen and (max-width: 900px) {
   width:100%
    }
    table{
    border-collapse: collapse;
    width: 100%;  
font-size:0.85rem;
margin:1rem 0rem;
@media screen and (max-width: 900px) {
    margin:0rem 0rem;
    width: 100%;  
    word-break: break-word;
    font-size:0.52rem;
    }
    td, th {
        border: 1px solid #dddddd;
  text-align: left;
  padding: 0.6rem 0.4rem ;
  
  @media screen and (max-width: 900px) {
    padding: 0.3rem 0.2rem ;
    word-break: break-word;
    }
}

button{
    padding:0.4rem 0.8rem;
    font-size:0.85rem;
    @media screen and (max-width: 900px) {
    padding: 0.3rem 0.2rem ;
    font-size:0.4rem;
    }
}
}
}


}
 `

export default Profile;