import React, { useEffect } from "react";
import { Link,useHistory,useLocation } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
//components
import Rating from "../components/Rating";

import Loader from "../components/Loader";
import Message from "../components/Message";
import CartMessage from "../components/CartMessage";
import Paginate from "../components/Paginate";
//actions
import {getUserDetails} from "../actions/userActions";
import { logout} from "../actions/userActions";
import {listOrders} from "../actions/orderActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion, } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profileAnimation} from "../animations";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Meta from "../components/Meta";



const AdminOrderList = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const pathname=location.pathname
    const history = useHistory()
    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin;
    const orderList=useSelector((state)=>state.orderList)
    const {success,error,loading,orders,page,pages}=orderList;
    const userDetails=useSelector((state)=>state.userDetails)

    const search=location.search
    const pageNumber=search&&search.startsWith("?page")&&search.split("=")[1]
useEffect(()=>{
    if(!userInfo){
        history.push("/login")

    }else if(userInfo.role==="user"){
        history.push("/")
    }
    else{
        dispatch(getUserDetails("me"))
        dispatch(listOrders(pageNumber))
    }
},[dispatch,userInfo,history,pageNumber]);

 const logoutHandler = () => {
    dispatch(logout())
  }

    return ( <StyledProfile variants={profileAnimation} initial="hidden" animate="show" exit="exit">
          <Meta title="Order list"/>
    {error && <Message variant="danger">{error}</Message>}
            {userDetails.error && <Message variant="danger">{userDetails.error}</Message>}
    {loading && <Loader />}
    <StyledMain>
<StyledLeftNav>
   <div className="nav">
       <Link to="/profile" className={pathname==="/profile"?"active":""} >My Account</Link>
       <Link to="/orders" className={pathname==="/orders"?"active":""}>Orders</Link>
       {userDetails.user.role=="admin"||userDetails.user.role=="moderator"? 
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
            <span className="title"><h3>Orders</h3> 
            </span> 
            {orders&&orders.length===0?<CartMessage>No Orders Available</CartMessage>:(
           <div className="flex">
  <table>
<thead>
    <tr>
        <th>ID</th>
        <th>USER</th>
        <th>DATE</th>
        <th>TOTAL</th>
        <th>PAID</th>
        <th>DELIVERED</th>
        <th></th>
    </tr>
    </thead>
    <tbody>
        {
            orders&&orders.map((order)=>(
                <tr key={order._id}>
          <td>{order._id}</td>
          <td>{order.user&&order.user.name}</td>
          <td>{order.createdAt.substring(0,10)}</td>
          <td>${order.totalPrice}</td>
          <td>{
          order.isPaid?(order.paidAt.substring(0,10))
          :(<FontAwesomeIcon icon={faTimes} color="red"/>)
          }
          </td>
          <td>{
          order.isDelivered?(order.deliveredAt.substring(0,10))
          :(<FontAwesomeIcon icon={faTimes} color="red"/>)
          }
          </td>
         <td><Link to={`/order/${order._id}/`}>
             <button>Details</button></Link>
             </td>
                </tr>
            ))
        }
    </tbody>
    <Paginate page={page} pages={pages} currentPage="orderList"/>
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
flex:25%;
@media screen and (max-width: 900px) {
     display:none;
    }

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
 

button{
padding:0.2rem 0.6rem
}
}

.flex{
  
    table{
    border-collapse: collapse;
    width: 100%;  
font-size:0.85rem;
margin:1rem 0rem;
@media screen and (max-width: 900px) {
    margin:0rem 0rem;
    width: 100%;  
    word-break: break-word;
    font-size:0.5rem;
    }
    td, th {
        border: 1px solid #dddddd;
  text-align: left;
  padding: 0.6rem 0.4rem ;
  @media screen and (max-width: 900px) {
    padding: 0.3rem 0.2rem ;
    word-break: break-word;
    }
a{
    color:black;

        &:hover{
            color:#504b4b; 
        }
    
}
}

button{
    padding:0.4rem ;
    font-size:0.85rem;
    margin:0.2rem;
    @media screen and (max-width: 900px) {
    padding: 0.2rem 0.2rem ;
    font-size:0.3rem;
    margin:0rem;
    }
}.red{
    background-color:red
}
}
}


}
 `

export default AdminOrderList;