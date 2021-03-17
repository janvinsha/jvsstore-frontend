import React, { useEffect } from "react";
//components and pages
import Nav from "./components/Nav";

import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile"
import Order from "./pages/Order"
import Orders from "./pages/Orders"
import Cart from "./pages/Cart"
import Shipping from "./pages/Shipping"
import Payment from "./pages/Payment"
import PlaceOrder from "./pages/PlaceOrder"
import AdminUserList from "./pages/AdminUserList"
import UserEdit from "./pages/UserEdit"
import AdminProductList from "./pages/AdminProductList"
import AdminProductCreate from "./pages/AdminProductCreate"
import AdminProductEdit from "./pages/AdminProductEdit";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import AdminOrderList from "./pages/AdminOrderList";


import NotFound from "./pages/NotFound"
//Styles
import GlobalStyles from "./components/GlobalStyles";
//Routes
import { Route, Switch, useLocation } from "react-router-dom";
//Animation
import { AnimatePresence } from "framer-motion";




function App() {
  const location = useLocation();
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/product/:id" exact>
          <ProductDetails />
        </Route>
        <Route path="/cart/:id?" exact>
          <Cart/>
        </Route>
        <Route path="/login" exact>
          <Login/>
        </Route>
        <Route path="/register" exact>
          <Register/>
        </Route>
        <Route path="/profile" exact>
          <Profile/>
        </Route>
        <Route path="/orders" exact>
          <Orders/>
        </Route>
        <Route path="/shipping" exact>
          <Shipping/>
        </Route>
        <Route path="/payment" exact>
          <Payment/>
        </Route>
        <Route path="/placeorder" exact>
          <PlaceOrder/>
        </Route>
        <Route path="/order/:id" exact>
          <Order/>
        </Route>
        <Route path="/admin/userlist" exact>
          <AdminUserList/>
        </Route>
        <Route path="/admin/user/:id/edit" exact>
          <UserEdit/>
        </Route>
        <Route path="/admin/productlist" exact>
          <AdminProductList/>
        </Route>
        <Route path="/admin/productcreate" exact>
          <AdminProductCreate/>
        </Route>
        <Route path="/admin/product/:id/edit" exact>
          <AdminProductEdit/>
        </Route>
        <Route path="/forgotPassword" exact>
          <ForgotPassword/>
        </Route>
        <Route path="/resetPassword/:id" exact>
          <ResetPassword/>
        </Route>
        <Route path="/about" exact>
          <About/>
        </Route>
        <Route path="/privacy" exact>
          <PrivacyPolicy/>
        </Route>
        <Route path="/contact" exact>
          <Contact/>
        </Route>
        <Route path="/admin/orderlist" exact>
          <AdminOrderList/>
        </Route>
        <Route path="/search" exact>
          <Home />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
/////
        <Route >
          <NotFound/>
        </Route>
      </Switch>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
