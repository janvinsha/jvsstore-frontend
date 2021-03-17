import { USER_LOGIN_REQUEST, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_FAIL,
   USER_LOGOUT,
  
  USER_REGISTER_REQUEST,
   USER_REGISTER_SUCCESS ,
   USER_REGISTER_FAIL,  
 
  USER_DETAILS_REQUEST, 
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,  

    USER_UPDATE_PROFILE_REQUEST, 
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,  
  USER_UPDATE_PROFILE_RESET,

  USER_LIST_REQUEST, 
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,  

  USER_DELETE_REQUEST, 
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,  

  USER_UPDATE_REQUEST, 
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,  
  USER_UPDATE_RESET,


  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_RESET,

  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_RESET_PASSWORD_RESET,

  USER_CONFIRM_EMAIL_REQUEST,
  USER_CONFIRM_EMAIL_SUCCESS,
  USER_CONFIRM_EMAIL_FAIL,
  USER_CONFIRM_EMAIL_RESET,
  
  USER_RESEND_CONFIRM_EMAIL_REQUEST,
  USER_RESEND_CONFIRM_EMAIL_SUCCESS,
  USER_RESEND_CONFIRM_EMAIL_FAIL,
  USER_RESEND_CONFIRM_EMAIL_RESET,


} from "../constants/userConstants"


export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload.data };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT: return {}
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload.data };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT: return {}

    default:
      return state;
  }
};
export const userDetailsReducer = (state = {user:{photo:{},orders:[]}}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload.data };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload ,...state};
    case USER_LOGOUT: return {user:{photo:{},orders:[]}}
    default:
      return state;
  }
};
export const userUpdateProfileReducer = (state = {user:{photo:{},orders:[]}}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false,success:true, userInfo: action.payload.data };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
      case USER_UPDATE_PROFILE_RESET:
        return {user:{photo:{},orders:[]}};
default:
      return state;
  }
};

export const userListReducer = (state = {users:[]}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {loading: true,...state };
    case USER_LIST_SUCCESS:
      return { loading: false,success:true, users: action.payload.data.doc,
        pages:action.payload.data.pages,page:action.payload.data.page };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
      case USER_LOGOUT: return {users:[]}
default:
      return state;
  }
};
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {loading: true,};
    case USER_DELETE_SUCCESS:
      return { loading: false,success:true};
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
      case USER_DELETE_RESET:
        return {};
default:
      return state;
  }
};

export const userUpdateReducer = (state = {user:{}} ,action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false,success:true, user: action.payload.data };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
      case USER_UPDATE_RESET:
        return {user:{}};
default:
      return state;
  }
};
export const userForgotPasswordReducer = (state = {} ,action) => {
  switch (action.type) {
    case USER_FORGOT_PASSWORD_REQUEST:
      return {loading: true };
    case USER_FORGOT_PASSWORD_SUCCESS:
      return { loading: false,success:true,  };
    case USER_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
      case USER_FORGOT_PASSWORD_RESET:
        return {};
default:
      return state;
  }
};
export const userResetPasswordReducer = (state = {} ,action) => {
  switch (action.type) {
    case USER_RESET_PASSWORD_REQUEST:
      return {loading: true };
    case USER_RESET_PASSWORD_SUCCESS:
      return { loading: false,success:true,  };
    case USER_RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
      case USER_RESET_PASSWORD_RESET:
        return {};
default:
      return state;
  }
};

export const userConfirmEmailReducer = (state = {} ,action) => {
  switch (action.type) {
    case USER_CONFIRM_EMAIL_REQUEST:
      return {loading: true };
    case USER_CONFIRM_EMAIL_SUCCESS:
      return { loading: false,success:true,  };
    case USER_CONFIRM_EMAIL_FAIL:
      return { loading: false, error: action.payload };
      case USER_CONFIRM_EMAIL_RESET:
        return {};
default:
      return state;
  }
};
export const userResendConfirmEmailReducer = (state = {} ,action) => {
  switch (action.type) {
    case USER_RESEND_CONFIRM_EMAIL_REQUEST:
      return {loading: true };
    case USER_RESEND_CONFIRM_EMAIL_SUCCESS:
      return { loading: false,success:true,  };
    case USER_RESEND_CONFIRM_EMAIL_FAIL:
      return { loading: false, error: action.payload };
      case USER_RESEND_CONFIRM_EMAIL_RESET:
        return {};
default:
      return state;
  }
};