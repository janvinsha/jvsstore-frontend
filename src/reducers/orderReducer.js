import {
ORDER_CREATE_FAIL,ORDER_CREATE_REQUEST,ORDER_CREATE_SUCCESS,
ORDER_DETAILS_FAIL,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,
ORDER_PAY_FAIL,ORDER_PAY_REQUEST,ORDER_PAY_SUCCESS,ORDER_PAY_RESET,
 ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
   ORDER_LIST_FAIL,
   
   ORDER_DELIVER_REQUEST,
   ORDER_DELIVER_SUCCESS,
   ORDER_DELIVER_FAIL,
   ORDER_DELIVER_RESET,
   ORDER_CREATE_RESET
  } from "../constants/orderConstants";
  import { 
     USER_LOGOUT,
    

  } from "../constants/userConstants"

  export const orderCreateReducer=(state={},action)=>{
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
          return { loading: true, ...state };
        case ORDER_CREATE_SUCCESS:
          return { loading: false,success:true, order: action.payload.data };
        case ORDER_CREATE_FAIL:
          return { loading: false, error: action.payload };
          case ORDER_CREATE_RESET:
            return {};
        default:
          return state;
      }
  }
  export const orderDetailsReducer=(state={order:{orderItems:[],shippingAddress:{},user:{}}},action)=>{
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
          return {  ...state,loading:true};
        case ORDER_DETAILS_SUCCESS:
          return { loading: false,success:true, order: action.payload.data };
        case ORDER_DETAILS_FAIL:
          return { loading: false, error: action.payload };
          case USER_LOGOUT: return {order:{orderItems:[],shippingAddress:{},user:{}}}
        default:
          return state;
      }
  }
  export const orderPayReducer=(state={},action)=>{
    switch (action.type) {
        case ORDER_PAY_REQUEST:
          return {loading:true};
        case ORDER_PAY_SUCCESS:
          return { loading: false,success:true,};
        case ORDER_PAY_FAIL:
          return { loading: false, error: action.payload };
          case ORDER_PAY_RESET:
            return {};
        default:
          return state;
      }
  }
  export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return { loading: true, ...state };
      case ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload.data.doc,
          pages:action.payload.data.pages,page:action.payload.data.page };
      case ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const orderDeliverReducer=(state={},action)=>{
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
          return {loading:true};
        case ORDER_DELIVER_SUCCESS:
          return { loading: false,success:true,};
        case ORDER_DELIVER_FAIL:
          return { loading: false, error: action.payload };
          case ORDER_DELIVER_RESET:
            return {};
        default:
          return state;
      }
  }