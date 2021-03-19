import React, { useState, useEffect } from "react";
//Redux
import { useDispatch, useSelector } from "react-redux";
//components
//actions
import { logout,getLoggedUserStatus } from "../actions/userActions";
//Styling and Animationimport styled from "styled-components";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fas,
  faBars,
  faSearch,
  faEllipsisH,
  faShoppingBasket,
  faUser,
  faCaretDown,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useLocation } from "react-router-dom";

import { lineAnim } from "../animations";

const Nav = () => {
  const dispatch = useDispatch()
  const history=useHistory()
  const location=useLocation()
  const [searchToggle, setSearchToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [category,setCategory]= useState("all");
  const [keyword,setKeyword]= useState("")
  const cart=useSelector((state)=>state.cart.cartItems)
  const { pathname } = useLocation();
  

  const search=location.search

  useEffect(() => {
    if (pathname === "/login" || "/register") {
      setMenuToggle(false);
      setSearchToggle(false);
    }
    dispatch(getLoggedUserStatus())
  }, [pathname,dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin
  const logoutHandler = () => {
    setMenuToggle(!menuToggle)
    dispatch(logout())
  }
  const submitHandler=(e)=>{
  e.preventDefault()
  if(keyword.trim()){
    history.push(`/search/?category=${category}&keyword=${keyword}`)
  }else if(category!=="all"){
    history.push(`/search/?category=${category}&keyword=${keyword}`)
  }
  else{
    history.push("/")
  }
  }
  const exitHandler = (e) => {
    const element = e.target;
    if (element.classList.contains("window")) {
    setMenuToggle(false)
    }
  };

  return (
    <StyledNav>
      <div className="navbar">
        <span className="icon">
          <Link to="/"><h2>Janvinsha stores</h2></Link>
        </span>
        <div className="form" id={searchToggle ? "showSearch" : ""}>
          <form onSubmit={submitHandler}>
            <select name="searchCat" value={category} onChange={(e)=>setCategory(e.target.value)}>
              <option value="all">All categories</option>
              <option value="bags">Bags</option>
              <option value="watches">Watches</option>
              <option value="shoes">Shoes</option>
              <option value="headsets">Headset</option>
              <option value="wigs">Wigs</option>
            </select>
            <input type="search" placeholder="Search Janvinsha Stores" 
            value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <motion.div variants={lineAnim} className="line hide"></motion.div>
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
        <div className="nav-right" id={menuToggle ? "showMenu" : ""}>
      

          {userInfo&&userInfo.photo ? (
            <div className="dropdown profile ">
              <span className="nav-link more">
                <img src={userInfo.photo.url}  />
                {userInfo.name.split(" ")[0]} <FontAwesomeIcon icon={faCaretDown} className="fIcon"/> 
              </span>
              <div className="hover-down">
                <Link to="/profile"> Profile </Link>
                <Link to="/orders"> Orders </Link>
                <div className="line"></div>
                <Link onClick={logoutHandler} className="logout">Logout</Link>
              </div>
            </div>
          ) :

            <div className="dropdown login ">
              <span className="nav-link more">
                <FontAwesomeIcon icon={faUser} className="fIcon"/> Login
          </span>

              <div className="hover-down">
                <Link className="nav-link" to="/login">
                  Login
        </Link>
                <div className="line"></div>
                <Link className="nav-link" to="/register">
                  Register
        </Link>
              </div>
            </div>
          }

          {
            userInfo&&userInfo.role==="admin"|| userInfo&&userInfo.role==="moderator"?(
              <div className="dropdown login ">
              <span className="nav-link more">
               Admin <FontAwesomeIcon icon={faCaretDown} className="fIcon"/> 
          </span>

              <div className="hover-down">
                <Link className="nav-link" to="/admin/userlist">
                  Users
        </Link>
        <Link className="nav-link" to="/admin/productlist">
                  Products
        </Link>
        <Link className="nav-link" to="/admin/orderlist">
                  Orders
        </Link>
              </div>
            </div>

            ):""
          }
          <Link className="nav-link" to="/cart">
            <FontAwesomeIcon icon={faShoppingBasket} className="fIcon"/> Cart
          </Link>

          <div className="dropdown ">
            <span className="nav-link more">
              <FontAwesomeIcon icon={faEllipsisH} />
            </span>

            <div className="hover-down">
              <Link to="/about"> About </Link>
              <Link to="/contact">Contact</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>


      {/* ///////////////////MOBILE */}
      <StyledMobNav >
        <StyledMenu id={menuToggle ? "showMenu" : ""}>
          <div className="menu">
          <div className="left">
            <div className="icon">
            <Link to="/" onClick={()=> setMenuToggle(!menuToggle)}>     
           <FontAwesomeIcon
          icon={faHome}
          id="toggle"
          onClick={() => setMenuToggle(!menuToggle)}
        /> <h2>Janvinsha Stores</h2> </Link>
            </div>
       
          <h2>My Account</h2>
          {userInfo?(
           <>
                <Link to="/profile" onClick={()=> setMenuToggle(!menuToggle)}> Profile </Link>
                <Link to="/orders" onClick={()=> setMenuToggle(!menuToggle)}> Orders </Link>
             </>
          ) :
  <>
      
                <Link className="nav-link" to="/login" onClick={()=> setMenuToggle(!menuToggle)}>
           Login
        </Link>
             
                <Link className="nav-link" to="/register" onClick={()=> setMenuToggle(!menuToggle)}>
                  Register
        </Link>
              </>
           }
           {userInfo&&userInfo.role!=="user"&&
           <>
             <h2>Admin</h2>
             <Link onClick={()=> setMenuToggle(!menuToggle)}
             className="nav-link" to="/admin/userlist">
                       Users
             </Link>
             <Link onClick={()=> setMenuToggle(!menuToggle)}
              className="nav-link" to="/admin/productlist">
                       Products
             </Link>
             <Link onClick={()=> setMenuToggle(!menuToggle)}
             className="nav-link" to="/admin/orderlist">
                       Orders
             </Link>
             </>
           }
                 <div className="line"></div>
             <Link to="/about" onClick={()=> setMenuToggle(!menuToggle)}> About </Link>
              <Link to="/contact" onClick={()=> setMenuToggle(!menuToggle)}>Contact</Link>
              <Link to="/privacy" onClick={()=> setMenuToggle(!menuToggle)}>Privacy Policy</Link>
            
            {userInfo&&  <>
             <div className="line"></div> <Link  onClick={logoutHandler}  className="logout"
             >Logout</Link>
             </>
             }
          </div>
    
<div className="right window" onClick={exitHandler}>

</div>
</div>
        </StyledMenu>
        <div className="row top">
          <div className="left">
             <FontAwesomeIcon
          icon={faBars}
          id="toggle"
          className="fIcon"
          onClick={() => setMenuToggle(!menuToggle)}
        />  <span className="icon">
        <Link to="/"><h2>Janvinsha stores</h2></Link>
      </span></div>
       
      <div className="right" >    
      {userInfo&&userInfo.photo ? ( <Link to="/profile"> <div className="prof">
       
      <img src={userInfo.photo.url}  />
      
                </div></Link>   ) :
<Link to="/login"> <FontAwesomeIcon icon={faUser} className="fIcon" color="white"/></Link>

 }
         
          <Link className="nav-link" to="/cart">
            <FontAwesomeIcon icon={faShoppingBasket} className="fIcon"/>
          </Link>
          </div>
          </div>
   <div className="row">
   <form onSubmit={submitHandler}>
            <input type="search" placeholder="Search Janvinsha Stores" 
            value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <motion.div variants={lineAnim} className="line hide"></motion.div>
            <button type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
   </div>
   <div className="nav2 row">
   <Link to="/" className={pathname==="/"?"active":""}
   onClick={(e)=>setCategory("all")}
   >All products</Link>
              <Link to={`/search/?category=bags&keyword=${keyword}`} className={search.startsWith("?category=bags")?"active":""}
              onClick={(e)=>setCategory("bags")}
              >Bags</Link>
              <Link to={`/search/?category=watches&keyword=${keyword}`}className={search.startsWith("?category=watches")?"active":""}
              onClick={(e)=>setCategory("watches")}
              >Watches</Link>
              <Link to={`/search/?category=shoes&keyword=${keyword}`} className={search.startsWith("?category=shoes")?"active":""}
              onClick={(e)=>setCategory("shoes")}
              >Shoes</Link>
              <Link to={`/search/?category=headsets&keyword=${keyword}`} className={search.startsWith("?category=headset")?"active":""}
              onClick={(e)=>setCategory("headsets")}
              >Headset</Link>
              <Link to={`/search/?category=wigs&keyword=${keyword}`} className={search.startsWith("?category=wigs")?"active":""}
              onClick={(e)=>setCategory("wigs")}
              >Wigs</Link>
             
   </div>
    
      </StyledMobNav>
    </StyledNav>
  );
};

const StyledNav = styled.div`
  .navbar {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    background-color: #1c2b2d;
    width:100%;
   
    @media screen and (max-width: 900px) {display:none}
    #toggle {
      display: none;
    }
    .hide {
      display: none;
    }

    .icon {
      font-size: 1.5rem;
      padding-left: 1rem;
      width: 30%;
      h2{
        font-weight:400;
        font-size:1.5rem
      }
      a {
        display: flex;
        align-items: center;
      }
      img {
        width: 2rem;
        height: 2rem;
        padding-left: 0.4rem;
      }
    }
    .form {
      width: 40%;
      display: flex;
      .suggestions {
        display: none;
      }

      form {
        width: 85%;
        margin-right: auto;
        margin-left: auto;
        display: flex;
      }
      input {
        padding: 0rem 0.4rem;
        border: 0px;
        border-right: none;
        border-radius: 0px;
        width: 76%;
        font-size: 0.9rem;
        &:focus {
          outline: none;

          background-color: whitesmoke;
        }
        &::placeholder {
          padding-left: 0.3rem;
          font-size: 0.9rem;
        }
      }
      select {
        border: 0px;
        background-color: #99a8b2;
        border-radius: 5px 0px 0px 5px;
        width: 12%;
        font-size: 0.9rem;
        color: white;
      }
      button {
        padding: 0.7rem 1rem;
        border: 0px;
        background-color: #99a8b2;
        border-radius: 0px 5px 5px 0px;
        width: 12%;
        font-size: 0.9rem;
        color: white;
      }
    }
    .nav-right {
      width: 30%;
      display: flex;
      font-size: 0.95rem;
      font-weight: 500;
      justify-content: flex-end;
      .dropdown {
        position: relative;
        display: flex;
        border: none;
        &:hover {
          cursor: pointer;
          color: white;
          .hover-down {
            display: flex;
          }
        }
        .hover-down {
          padding: 0.5rem;
          display: flex;
          flex-flow: column wrap;
          position: absolute;
          top: 100%;
          right: 0;
          background-color: white;
          z-index: 1;
          margin: 0rem;
          transition: 1s ease-in-out;
          display: none;
          cursor: pointer;
          a {
            display: inline;
            color: black;
            padding: 0.6rem 0rem 0.6rem 0.6rem;
            font-size: 0.9rem;
            width: 10rem;
            &:hover {
              color: #3f3434;
            }
          }
        }
      }
      .profile{
        span{
          display:flex
        }
        img{
          width:1.5rem;
          border-radius:50%;
          margin-right:0.2rem;
        }
        .hover-down {
       .logout{
        
        color:#c92020;
      &:hover{
        color:#a13333;
        }
       }
          a {
            display: inline;
            color: black;
            padding: 0.6rem 0rem 0.6rem 0.6rem;
            font-size: 0.9rem;
            width: 8rem;
        }
        .line{
          height:2px;
          width:100%;
          background-color: #99a8b2
        }
        }
      }
      .login{
        
        .hover-down {
      
          a {
            display: inline;
            color: black;
            padding: 0.6rem 0rem 0.6rem 0.6rem;
            font-size: 0.9rem;
            width: 8rem;
        } .line{
          height:2px;
          width:100%;
          background-color: #99a8b2
        }
        }
      }
      .nav-link {
        padding: 1.3rem 0.7rem;
        color: white;
        display:flex;
        align-items: center;
        cursor: pointer;
    
        &:hover {
          color: #cecccc;
        }
        .fIcon{margin:0px 4px}
      }
    }
  }

`;

const StyledMobNav=styled(motion.div)`
display:none;
width:100%;

@media screen and (max-width: 900px) {
  background-color: #1c2b2d;
  display:flex;
      min-height: 8vh;
      flex-flow:column wrap;
      width:100%;
    
      .fIcon{
        margin:0rem 0.4rem
      }
      .row{
        display:flex;
flex-flow:row;
width:100%;
form{
  width:100%;
  display:flex;
  align-items: center;
  padding:0.2rem 1rem;
  input{
    width:85%;
    padding:0.7rem 0.8rem;
    border-radius:5px 0px 0px 5px;
    font-size: 0.8rem;
    border:none;
    &:focus {
          outline: none;

          background-color: whitesmoke;
        }
        &::placeholder {
          padding-left: 0.1rem;
          font-size: 1rem;
        }
  }
  button{
    width:15%;
    padding:0.7rem 0.8rem;
    border-radius:0px 5px 5px 0px;
    font-size: 0.8rem
  }
}
      }
.left{ 
  margin-right:auto;
  display:flex;
  align-items: center;
  padding:0.8rem 0.6rem;
  font-size:1.2rem;
  color:white;
  .fIcon{
    margin-right:1rem
  }
  .icon{
    h2{
      font-size:1.3rem
    }
  }
}
.right{
  margin-left:auto;
  display:flex;
  align-items: center;
  padding:0.8rem 0.6rem;
  font-size:1.2rem;
  .fIcon{
margin-left:1rem
  }
  .prof{
    display:flex;
    align-items: center;
    color:white;
    img{
      width:1.4rem;
      border-radius:50%
    }
  }
}
    }
    .nav2{
      display: flex;
      flex-direction: row;
white-space: nowrap;
overflow:auto;
  white-space: nowrap;
  padding:0rem 0.6rem;
  width:100%;
  .active{
border-bottom:2px solid white;

  }
      a{
        padding:0.6rem 0.2rem
      }
    }
  #showMenu{
  .menu{
    transform: translateX(0%);
  }
  background: rgba(0, 0, 0, 0.5);
  z-index: 3;
  }
`
const StyledMenu=styled(motion.div)`
  background: rgba(0, 0, 0, 0);
  display:flex;
color:white;
width:100%;
position:fixed;
top:0;
left:0;
height:100vh;
z-index: -1;
transition: all 0.5s ease-in-out ;
.menu{
  display:flex;
color:white;
width:100%;
position:fixed;
top:0;
left:0;
height:100vh;
z-index: 20;
transition: all 0.5s ease-in-out ;
transform: translateX(-100%);
}
.left{
  .icon{
    a{  display:flex;
    align-items: center;
    font-size:1.5rem;
    h2{
      font-weight:500;
      font-size:1.5rem;
    }}
  
  }
  .logout{
  text-align:center;
  color:red;
 
}
   .line{
          height:2px;
          width:100%;
          background-color: #99a8b2;
          margin:0.2rem 0rem
        }
  flex:80%;
  background-color:white;
display:flex;
flex-flow:column wrap;
justify-content:flex-start;
align-items: flex-start;
padding:1rem;
h2{
  color:black;
  font-size:1.35rem;
  text-align:center;
  padding:0.2rem 0rem;
  font-weight:500
}
a{
  color:black;
  padding:0.6rem 0rem;
  font-size:1.1rem
}
}
.right{
  flex:20%;
}
`
export default Nav;
