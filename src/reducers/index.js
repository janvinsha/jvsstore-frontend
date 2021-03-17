import { combineReducers } from "redux";
import { productListReducer,productDetailsReducer,productDeleteReducer,
    productCreateReducer,productUpdateReducer,productCreateReviewReducer ,productDeleteReviewReducer,productTopRatedReducer} from "./productReducers";
import {cartReducer} from "./cartReducers"
import {userLoginReducer,userRegisterReducer,userDetailsReducer,
    userUpdateProfileReducer,userListReducer,
    userDeleteReducer,userUpdateReducer,
    userForgotPasswordReducer,userResetPasswordReducer,
    userConfirmEmailReducer,
    userResendConfirmEmailReducer
} from "./userReducers"
import {orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListReducer,orderDeliverReducer} from "./orderReducer"
const rootReducer = combineReducers({ 
productList: productListReducer 
,productDetails:productDetailsReducer,
productDelete:productDeleteReducer,
productCreate:productCreateReducer,
productUpdate:productUpdateReducer,
productCreateReview:productCreateReviewReducer,
productDeleteReview:productDeleteReviewReducer,
productTopRated:productTopRatedReducer,

 cart:cartReducer,userLogin:userLoginReducer,

userRegister:userRegisterReducer,
userDetails:userDetailsReducer,
userUpdateProfile:userUpdateProfileReducer,
userList:userListReducer,
userDelete:userDeleteReducer,
userUpdate:userUpdateReducer,
userForgotPassword:userForgotPasswordReducer,
userResetPassword:userResetPasswordReducer,
userConfirmEmail:userConfirmEmailReducer,
userResendConfirmEmail:userResendConfirmEmailReducer,

orderCreate:orderCreateReducer,
orderDetails:orderDetailsReducer,
orderPay:orderPayReducer,
orderList:orderListReducer,
orderDeliver:orderDeliverReducer

});
export default rootReducer;
