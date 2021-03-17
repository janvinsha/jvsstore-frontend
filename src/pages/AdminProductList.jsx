import React, { useEffect} from "react";
import { Link,useHistory,useLocation } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
//components


import Loader from "../components/Loader";
import Message from "../components/Message";
import CartMessage from "../components/CartMessage";
import Paginate from "../components/Paginate";
//actions
import {getUserDetails} from "../actions/userActions";
import { logout} from "../actions/userActions";
import { listProducts,deleteProduct } from "../actions/productActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profileAnimation} from "../animations";
import {faEdit, faTrash, faPlus} from "@fortawesome/free-solid-svg-icons";
import { PRODUCT_DELETE_RESET } from "../constants/productConstants";
import Meta from "../components/Meta";



const AdminProductList = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const pathname=location.pathname
    const history = useHistory()
    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin;
    const productList=useSelector((state)=>state.productList)
    const {success,error,loading,products,page,pages}=productList;
    
    const userDetails=useSelector((state)=>state.userDetails)
    const productDelete=useSelector((state)=>state.productDelete)
    const {success:successDelete,error:errorDelete,loading:loadingDelete}=productDelete;

    
    const search=location.search
    const pageNumber=search&&search.startsWith("?page")&&search.split("=")[1]
   const keyword=""
   const category=""
useEffect(()=>{
    if(!userInfo){
        history.push("/login")

    }else if(userInfo.role==="user"){
        history.push("/")
    }
    else if(successDelete){
        setTimeout(() => {
            dispatch({type:PRODUCT_DELETE_RESET})
            dispatch(listProducts(keyword,category,pageNumber))
          }, 2000)
    }
    else if(errorDelete){
        setTimeout(() => {
            dispatch({type:PRODUCT_DELETE_RESET})
          }, 2000)
}
    else{
        dispatch(getUserDetails("me"))
        dispatch(listProducts(keyword,category,pageNumber))
    }
},[dispatch,userInfo,history,successDelete,errorDelete,pageNumber]);

 const logoutHandler = () => {
    dispatch(logout())
  }
const deleteHandler=(id)=>{
    if(window.confirm("Are you sure")){
//Delete product
dispatch(deleteProduct(id))
    }
}
const createProductHandler=()=>{
history.push("/admin/productcreate")
}
    return ( <StyledProfile variants={profileAnimation} initial="hidden" animate="show" exit="exit">
          <Meta title="Product list"/>
    {error && <Message variant="danger">{error}</Message>}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {successDelete && <Message variant="success">Product deleted successfully</Message>}
            {loadingDelete && <Loader />}
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
            <span className="title"><h3>Products</h3> 
            <button onClick={createProductHandler}><FontAwesomeIcon icon={faPlus}/> Create Product</button>
            </span> 
            {products&&products.length===0?<CartMessage>No Products Available</CartMessage>:(
           <div className="flex">
  <table>
<thead>
    <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>PRICE</th>
        <th>CATEGORY</th>
        <th></th>
    </tr>
    </thead>
    <tbody>
        {
            products&&products.map((product)=>(
                <tr key={product._id}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>${product.price}</td>
          <td>{product.category}</td>
         <td><Link to={`/admin/product/${product._id}/edit`}>
             <button><FontAwesomeIcon icon={faEdit}/></button>
             
             </Link>
             <button className="red" onClick={()=>deleteHandler(product._id)}><FontAwesomeIcon icon={faTrash}/></button>
             </td>
                </tr>
            ))
        }
    </tbody>
    <Paginate page={page} pages={pages} currentPage="productList"/>
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
.title{
    display:flex;
    justify-content:space-between;
    h3{
    color:black;
    font-size:1.6rem;
    font-weight:500;
    margin-bottom:0.5rem;
    @media screen and (max-width: 900px) {
        font-size:1.2rem;
    }
}
button{
padding:0.2rem 0.6rem;
margin-bottom:0.5rem;
@media screen and (max-width: 900px) {
    padding:0rem 0.3rem;
    font-size:0.7rem;
    margin-bottom:0.5rem;
    margin-right:0.5rem
    }
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
    word-break: normal;
    font-size:0.52rem;
    }
    td, th {
        border: 1px solid #dddddd;
  text-align: left;
  padding: 0.6rem 0.4rem ;
  @media screen and (max-width: 900px) {
    padding: 0.3rem 0.2rem ;
    word-break: normal;
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
    padding: 0.3rem 0.2rem ;
    font-size:0.4rem;
    }
}.red{
    background-color:red
}
}
}


}
 `

export default AdminProductList;