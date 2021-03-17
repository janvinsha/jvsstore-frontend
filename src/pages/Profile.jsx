import React, { useEffect ,useState} from "react";
import { Link,useHistory,useLocation } from "react-router-dom";
import {useDropzone} from 'react-dropzone'
//Redux
import { useDispatch, useSelector } from "react-redux";
//components


import Loader from "../components/Loader";
import Message from "../components/Message";
//actions
import {getUserDetails,} from "../actions/userActions";

import { logout,updateUserProfile,updateUserPassword ,resendConfirmEmail} from "../actions/userActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
faEdit,faTimes
} from "@fortawesome/free-solid-svg-icons";

import { profileAnimation} from "../animations";
import { USER_RESEND_CONFIRM_EMAIL_RESET, USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Meta from "../components/Meta";


const Profile = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const pathname=location.pathname
  
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCurrent, setPasswordCurrent] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [uploadImage,setUploadImage]= useState(false)
    const userDetails=useSelector((state)=>state.userDetails)
    const {loading,user,error}=userDetails

    const userResendConfirmEmail=useSelector((state)=>state.userResendConfirmEmail)
    const {loading:resendLoading,success:resendSuccess,error:resendError}=userResendConfirmEmail

    const userLogin=useSelector((state)=>state.userLogin)
    const {userInfo}=userLogin

    const userUpdateProfile=useSelector((state)=>state.userUpdateProfile)
    const {success,error:updateError,loading:updateLoading}=userUpdateProfile

useEffect(()=>{
    if(!userInfo){
        history.push("/login")
    }
    else{
        if(!user.name){
            dispatch(getUserDetails("me"))
         }else if(success){
setTimeout(() => {
  dispatch({type:USER_UPDATE_PROFILE_RESET})
  dispatch(getUserDetails("me"))
}, 2000)
  }else if(updateError){        
setTimeout(() => {
  dispatch({type:USER_UPDATE_PROFILE_RESET})
}, 2000)}
else if(resendSuccess){
  setTimeout(() => {
    dispatch({type:USER_RESEND_CONFIRM_EMAIL_RESET})
  }, 2000)}
else if(resendError){        
  setTimeout(() => {
    dispatch({type:USER_RESEND_CONFIRM_EMAIL_RESET})
  }, 2000)
}
         else{
setName(user.name)
setEmail(user.email)
}
    }
},[dispatch,history,userInfo,user,success,updateError,resendError,resendSuccess])

const submitHandler = (e) => {
    e.preventDefault()
    //Update Profile

  }
  const logoutHandler = () => {
    dispatch(logout())
  }
  const exitUploadImageHandler=(e)=>{
    const element = e.target;
    if (element.classList.contains("shadow")) {
      setUploadImage(false)
    }
  }


  const profileUpdateHandler=()=>{
    dispatch(updateUserProfile({name,email}))
  }

  const passwordUpdateHandler=()=>{
dispatch(updateUserPassword({passwordCurrent,password,passwordConfirm}))
  }

  const [files,setFiles]= useState([])
    const photoUpdateHandler=()=>{
      setUploadImage(false)
      dispatch(updateUserProfile({photo:files[0]}))
        }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
      accept: 'image/jpeg, image/png',
      maxFiles:1,
      onDrop : (acceptedFiles => {
        // Do something with the files
 // POST to a test endpoint for demo purposes
setFiles(acceptedFiles.map((file)=>Object.assign(file,{
preview:URL.createObjectURL(file)
})))
}),
      })

    const resendConfirmEmailHandler=()=>{
      dispatch(resendConfirmEmail())
    }
    return ( <StyledProfile variants={profileAnimation} initial="hidden" animate="show" exit="exit">
      <Meta title={userInfo&&userInfo.name}/>
            {error && <Message variant="danger">{error}</Message>}
            {userUpdateProfile.error && <Message variant="danger">{userUpdateProfile.error}</Message>}
            {success && <Message variant="success">Profile updated successfully</Message>}
            {resendError && <Message variant="danger">{resendError}</Message>}
            {resendSuccess && <Message variant="success">Token sent to email successfully</Message>}
            {resendLoading && <Loader />}
    {loading && <Loader />}
    {updateLoading && <Loader />}
    {!userDetails.user.emailConfirmStatus&&<div className="confirmEmail">
        Please confirm your email address <Link onClick={resendConfirmEmailHandler}>Resend confirmation email</Link></div>}
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
            <h3>Account Overview</h3>
            <div className="dp" onClick={()=>setUploadImage(!uploadImage)}>
            <img src={user&&user.photo.url} alt=""/>
         <span className="icon"><FontAwesomeIcon icon={faEdit} color="white"/>change</span>
            </div>
            {uploadImage&&
            <div className="uploadImage shadow"  onClick={exitUploadImageHandler}>

<div className="middle">  
  <div className="title">
    Upload profile picture  
    <FontAwesomeIcon className="icon" icon={faTimes} color="black" onClick={()=>setUploadImage(false)}/>
    </div>
  
    <div className="upload" {...getRootProps()}>
      <input {...getInputProps()} />
      { files&&files.map((file)=>(<img src={file.preview}/>))}
      
      {files.length>0?"":
        isDragActive ?
          <p>Drop the image here ...</p> :
          <p>Drag 'n' drop the image here, or click to select image</p>
      }
   
    </div>
     
  
    

    <div className="confirm">
      <button className="cancel" onClick={()=>setUploadImage(false)}>Cancel</button>
        <button onClick={photoUpdateHandler} >Confirm</button>
    </div>
</div>
</div>}
            <div className="flex">
        <form >
        <h4>Account details</h4>
    <div class="form-group">
          <label for="name">Name</label>
          <input class="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <form onSubmit={profileUpdateHandler} class="form-group">
          <label for="name">Email</label>
          <input class="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="button"  onClick={profileUpdateHandler}  >Update</button>
        </form> 
    </form>
    
    <form >
    <h4>Change password</h4>
    <div class="form-group">
          <label for="name">Password  </label>
          <input class="form-control"
           placeholder="Enter your password"
           type="password" value={passwordCurrent} onChange={(e) => setPasswordCurrent(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="name">New Password {password.length===0?"":password.length>8?"":<small>Must be more than 8 characters</small>}</label>
          <input class="form-control" 
           placeholder="Enter new password"
          type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="name">Confirm Password {passwordConfirm.length===0?
          "":passwordConfirm.length>8?"":<small>Must be more than 8 characters</small>}</label>
          <input class="form-control" 
           placeholder="Enter new password"
          type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          <button type="button" onClick={passwordUpdateHandler}  
           disabled={password.length <=8||passwordConfirm.length<=8||password!==passwordConfirm}>Update</button>
        </div>
    </form>
    </div>
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
 
 .confirmEmail{
   background:#f78f8f;
   padding:1rem;
 margin-bottom:0.3rem;
   margin-right:0.8rem;
   border-radius:5px;
   text-align:center;
   @media screen and (max-width: 900px) {
    padding:0.2rem;
    border-radius:0px;
    margin-bottom:0rem;
    width:100%
    }
   a{
     color:#2e74b6;
     font-size:1rem;
     &:hover{
      color:#315c85;
     }
   }
 }
 `
 const StyledMain=styled(motion.div)`
  display:flex;
 `

 const StyledLeftNav=styled(motion.div)`
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
@media screen and (max-width: 900px) {
     display:none;
    }
`
 const StyledRight=styled(motion.div)`
 flex:75%;
 padding:0rem 0.8rem;
 @media screen and (max-width: 900px) {
        width:100%;
        padding:0rem;
    }
.row{
border-radius:5px;
padding:1rem 2rem;
border-radius:5px;
background-color:white;
display:flex;
flex-flow:column wrap;
@media screen and (max-width: 900px) {
  padding:0.3rem 0.6rem;
    }
.uploadImage{
  height:100vh;
  width:100%;
  background: rgba(0, 0, 0, 0.7);
 
position: fixed;
top:0;
left:0;

display:flex;
align-items:center;
justify-content:center;
img{
  width:15rem;
  height:15rem;
  object-fit:cover
  }
.middle{
  @media screen and (max-width: 900px) {
    width:90%;
    height:60vh;
    padding:0.6rem 0rem;
    }
  width:50%;
  height:82vh;
  background-color:white;
  display:flex;
  flex-flow:column wrap;
  padding:1.5rem 0rem;
z-index:20;
  .title{
    height:15% ;
    font-size:1.4rem;
    font-weight:500;
 display:flex;
 padding:0rem 2rem;
 @media screen and (max-width: 900px) {
  font-size:1.3rem;
  padding:0rem 1rem;
  align-items:center;
 }
    .icon{
    cursor: pointer;
    margin-left:auto;
  }
  }
  .upload{
display:flex;
flex-flow:column wrap;
align-items:center;
justify-content:center;
background:#f3f1f1;
height:62% ;
margin:0rem 2rem;

cursor: pointer;
@media screen and (max-width: 900px) {
  margin:0rem 1rem;
  padding:1rem
}
p{
  color:black;
  font-size:1rem;
}
&:focus{
  outline:none;

}
button{
padding:0.7rem 1.4rem;
margin-top:0.3rem;
@media screen and (max-width: 900px) {
  padding:0.6rem 1.2rem;
}

}
}
.confirm{
  height:15% ;
  display:flex;
flex-flow:row wrap;
  justify-content:space-around;
  padding:2rem 2rem;
  @media screen and (max-width: 900px) {
    padding:2rem 1rem;

}
  button{
    padding:0.6rem 1.2rem;
    margin-left:0.8rem;
  }
  .cancel{
    background-color:#f3f1f1;
    color:black;
    &:hover{
      background-color:#ece9e9;
    }
  }
}
}
 
}
.dp{

  position: relative;
  width:6rem;
  height:6rem;
  margin:1rem auto;
  border-radius:50%;
  background-color:grey;
  cursor: pointer;
  overflow:hidden;
  &:hover{
    .icon{
    display:block;
    color:white;
    font-weight:500
  }img{
    opacity:0.4
  }
  }
  img{
    width:100%;
 position:absolute
  }.icon{
    position:absolute;
    top:40%;
    left:10%;
    display:none;
  }
  .input{
    margin-left:auto;
  margin-right:auto;
  border:none;
  input{
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  }
  }
  
}
h3{
    text-align:center;
    color:black;
    font-size:1.6rem;
    font-weight:500
}
.flex{
display:flex;
@media screen and (max-width: 900px) {
 flex-flow:column wrap
    }
form{
    flex:50%;
  padding:1rem 2rem;
border-radius:5px;
background-color:white;
    margin-bottom:2rem;
    @media screen and (max-width: 900px) {
 flex-flow:column wrap;
 margin-bottom:0rem;
 border-radius:0px;
    }
    h4{
        color:black;
    font-size:1.4rem;
    font-weight:500
    }
  .form-group{
      display:flex;
      flex-flow:column wrap;
      padding:0.5rem 0rem;
      label{
          padding:0.2rem 0rem;
          small{
            color:#cf6f6f;
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
  padding: 10px 20px;
  width:8rem;
  margin: 1rem 0rem
}
}}

}
 `

export default Profile;