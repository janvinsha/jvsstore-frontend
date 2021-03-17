import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,

  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,

  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,

  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,

  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,

  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  
  PRODUCT_DELETE_REVIEW_REQUEST,
  PRODUCT_DELETE_REVIEW_SUCCESS,
  PRODUCT_DELETE_REVIEW_FAIL,
  PRODUCT_DELETE_REVIEW_RESET,
  
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_REQUEST
} from "../constants/productConstants";
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload.data.doc,
        pages:action.payload.data.pages,page:action.payload.data.page};
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer=(state={product:{reviews:[],image:{},images:[]}},action)=>{
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload.data };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
} 
export const productDeleteReducer=(state={},action)=>{
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
      case PRODUCT_DELETE_RESET:
        return {};
    default:
      return state;
  }
} 

export const productCreateReducer=(state={product:{}},action)=>{
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false,success:true,product:action.payload.data };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
      case PRODUCT_CREATE_RESET:
        return { product:{} };
    default:
      return state;
  }
} 
export const productUpdateReducer=(state={product:{}},action)=>{
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false,success:true,product:action.payload.data };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
      case PRODUCT_UPDATE_RESET:
        return { product:{} };
    default:
      return state;
  }
} 

export const productCreateReviewReducer=(state={review:{}},action)=>{
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false,success:true,review:action.payload.data };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
      case PRODUCT_CREATE_REVIEW_RESET:
        return { review:{} };
    default:
      return state;
  }
} 

export const productDeleteReviewReducer=(state={review:{}},action)=>{
  switch (action.type) {
    case PRODUCT_DELETE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_REVIEW_SUCCESS:
      return { loading: false,success:true,review:action.payload.data };
    case PRODUCT_DELETE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
      case PRODUCT_DELETE_REVIEW_RESET:
        return { review:{} };
    default:
      return state;
  }
} 

export const productTopRatedReducer=(state={products:[]},action)=>{
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true ,...state};
    case PRODUCT_TOP_SUCCESS:
      return { loading: false,products: action.payload.data.doc,
        pages:action.payload.data.pages,page:action.payload.data.page };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
} 