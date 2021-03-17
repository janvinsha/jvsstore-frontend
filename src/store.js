
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
const cartItemsFromStorage=localStorage.getItem("cartItems")?
JSON.parse(localStorage.getItem("cartItems")):[]

const userInfoFromStorage=localStorage.getItem("userInfo")?
JSON.parse(localStorage.getItem("userInfo")):null


const shippingAddressFromStorage=localStorage.getItem("shippingAddress")?
JSON.parse(localStorage.getItem("shippingAddress")):{}

const paymentMethodFromStorage=localStorage.getItem("paymentMethod")?
JSON.parse(localStorage.getItem("paymentMethod")):""


const initialState={
    cart:{cartItems:cartItemsFromStorage,shippingAddress:shippingAddressFromStorage,
        paymentMethod:paymentMethodFromStorage},
 userLogin:{userInfo:userInfoFromStorage},
}
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,initialState, composeEnhancer(applyMiddleware(thunk)));
export default store