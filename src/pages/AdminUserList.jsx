import React, { useEffect } from "react";
import { Link,useHistory,useLocation } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
//components


import Loader from "../components/Loader";
import Message from "../components/Message";
import CartMessage from "../components/CartMessage";
import Paginate from "../components/Paginate";

//actions
import {getUserDetails,listUsers} from "../actions/userActions";
import { logout,deleteUser } from "../actions/userActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion,} from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { profileAnimation} from "../animations";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import { USER_DELETE_RESET } from "../constants/userConstants";
import Meta from "../components/Meta";

const AdminUserList = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const pathname=location.pathname
    const history = useHistory()
    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin;
    const userList=useSelector((state)=>state.userList)
    const {success,error,loading,users,page,pages}=userList;
    const userDetails=useSelector((state)=>state.userDetails)
    const userDelete=useSelector((state)=>state.userDelete)
    const {success:successDelete,error:errorDelete,loading:loadingDelete}=userDelete;

    const search=location.search
    const pageNumber=search&&search.startsWith("?page")&&search.split("=")[1]
   
useEffect(()=>{
    if(!userInfo){
        history.push("/login")

    }else if(userInfo.role==="user"){
        history.push("/")
    }
    else if(successDelete){
        setTimeout(() => {
            dispatch({type:USER_DELETE_RESET})
            dispatch(listUsers(pageNumber))
          }, 2000)
    }
    else if(errorDelete){
        setTimeout(() => {
            dispatch({type:USER_DELETE_RESET})
          }, 2000)
}
    else{
        dispatch(getUserDetails("me"))
        dispatch(listUsers(pageNumber))
    }

},[dispatch,userInfo,history,successDelete,errorDelete,pageNumber]);

 const logoutHandler = () => {
    dispatch(logout())
  }
const deleteHandler=(id)=>{
    if(window.confirm("Are you sure")){
        dispatch(deleteUser(id))
    }

}
    return ( <StyledProfile variants={profileAnimation} initial="hidden" animate="show" exit="exit">
          <Meta title="User list"/>
            {error && <Message variant="danger">{error}</Message>}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {successDelete && <Message variant="success">User deleted successfully</Message>}
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
            <h3>Users</h3>
            {users.length===0?<CartMessage>No Users Available</CartMessage>:(
           <div className="flex">
  <table>
<thead>
    <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>ADMIN</th>
        <th></th>
    </tr>
    </thead>
    <tbody>
        {
            users.map((user)=>(
                <tr key={user._id}>
          <td>{user._id}</td>
          <td>{user.name}</td>
          <td><a href={`mailto:${user.email}`} >{user.email}</a></td>
          <td>{user.role}</td>
         <td><Link to={`/admin/user/${user._id}/edit`}>
             <button><FontAwesomeIcon icon={faEdit}/></button>
             
             </Link>
             <button className="red" onClick={()=>deleteHandler(user._id)}><FontAwesomeIcon icon={faTrash}/></button>
             </td>
                </tr>
            ))
        }
    </tbody>
    <Paginate page={page} pages={pages} currentPage="userList"/>
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

export default AdminUserList;