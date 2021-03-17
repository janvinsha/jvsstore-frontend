import React, { useEffect ,useState} from "react";
import { Link,useHistory,useLocation } from "react-router-dom";
//Redux
import { useDispatch, useSelector } from "react-redux";
//components

import Loader from "../components/Loader";
import Message from "../components/Message";

//actions
import {getUserDetails} from "../actions/userActions";
import { updateUser } from "../actions/userActions";

import {USER_UPDATE_RESET} from "../constants/userConstants"
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion} from "framer-motion";

import { pageAnimation } from "../animations";

import Meta from "../components/Meta";

const UserEdit = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const pathname=location.pathname
    const userId=pathname.split("/")[3]
    const history = useHistory()
    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin;
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [active, setActive] = useState(true)
    const [role, setRole] = useState('')
    const userDetails=useSelector((state)=>state.userDetails)
    const {loading,error,user}=userDetails

    const userUpdate=useSelector((state)=>state.userUpdate)
    const {loading:updateLoading,error:updateError,success:updateSuccess}=userUpdate
useEffect(()=>{
  if(!userInfo){
    history.push("/login")
  }else if(userInfo.role==="user"){
    history.push("/")
  }else if(updateSuccess){
dispatch({type:USER_UPDATE_RESET})
history.push("/admin/userlist")
  }
  else if(!user.name||user._id!=userId){
        dispatch(getUserDetails(userId))
    }else{
       setName(user.name)
       setEmail(user.email)
       setRole(user.role)
       setActive(user.active)
    }

},[dispatch,user,history,updateSuccess]);
const submitHandler=(e)=>{
e.preventDefault()
dispatch(updateUser({name,email,role,active},user._id))
}


    return (<StyledLogin variants={pageAnimation} initial="hidden" animate="show" exit="exit">
        <Meta title="Edit User"/>
{updateLoading&&<Loader/>}
{updateSuccess&&<Message variant="success">User edited successfully</Message>}
{updateError&&<Message variant="danger">{updateError}</Message>}
         <Link to="/admin/userlist"> <button className="btn">Go back</button></Link>
{loading?<Loader/>:error?<Message variant="danger">{error}</Message>:<>
       
        <div class="login">
        <form onSubmit={submitHandler} class="loginForm">
          <h3 class="text-center">Edit User</h3>
          <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control"
             placeholder="Enter name"
            type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
          </div>
          <div class="form-group">
            <label for="name">Email</label>
            <input class="form-control"
             placeholder="Enter email"
             type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                 {error&&error.includes("email")&&
           <small class="error" >Use another email</small>}
          </div>
          <div class="form-group">
            <label for="name">Role</label>
            <input class="form-control"
             placeholder="Enter email"
             type="text" value={role} onChange={(e) => setRole(e.target.value)} required/>
                 {error&&error.includes("email")&&
           <small class="error" >Use another email</small>}
          </div>

          <div class="form-group">
            <label for="name">Active</label>
            <input class="form-control"
             type="checkbox"
              checked={active} onChange={(e) => setActive(e.target.checked)} />
          </div>


          <div class="text">
       
            <button type="submit"
         
            >Update</button>
          </div>
        </form>
      </div>
      </>}
    </StyledLogin>
   
       );
}



 
const StyledLogin = styled(motion.div)`
min-height:81vh;
.btn {
    padding: 0.5rem 1rem;
    background-color: #1c2b2d;
    border: none;
    color: white;
    margin: 0.5rem;
    cursor: pointer;
    &:hover {
      background-color: #1c2324;
    }
    @media screen and (max-width: 900px) {
   display:none
    }
  }
.login {
  margin: auto;
  width: 25rem;
  margin-top:2rem;
  @media screen and (max-width: 900px) {
    margin-top:0rem;
 width:100%
    }
  .loginForm {
  background-color: #1f6f8b;
  padding: 20px 30px;
  border-radius: 10px;
  border: 2px solid grey;
  color: white;
  @media screen and (max-width: 900px) {
 border-radius:0px
    }
  .text{
      text-align:center;
      button{
          margin-top:0.4rem
      }
  }
  h3{
      text-align:center;
      font-weight:500;
      font-size:1.3rem
  }
  .form-group{
      display:flex;
      flex-flow:column wrap;
      padding:0.5rem 0rem;
      .error{
        color:#f01919;
        
      }
      label{
          padding:0.2rem 0rem;
          small{
            color:#e9cece;
            font-size:0.6rem
          }
      }
  }
  a {
  color: lightblue;
  &:hover{
    color: #b1d1db;
  }
}input{
    border-radius:5px;
    padding:0.5rem;
    border: 1px solid grey;

    
    &:focus{
outline:none;

    }
}
button{
  padding: 8px 20px;

}
}
}
.textBtn{
    text-align:center;
    margin-top:0.2rem;
    button{
  padding: 8px 20px;
  margin-top:0.2rem;

    }
}
`
export default UserEdit;