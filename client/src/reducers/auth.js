import {
  AUTH_SIGN_UP,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  AUTH_ERROR,
  COMPONENT_MOUNT,
} from '../actions/types';

const initState = {
  isAuthenticated: false,
  token: '',
  errorMessage: '',
};

function authReducer(state = initState, action) {
  switch (action.type) {
    case COMPONENT_MOUNT:
      console.log('[AuthReducer] got a COMPONENT_MOUNT action');
      return { ...state, errorMessage: '' };
    case AUTH_SIGN_UP:
      console.log('[AuthReducer] got an AUTH_SIGN_UP action');
      return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' };
    case AUTH_SIGN_IN:
      console.log('[AuthReducer] got an AUTH_SIGN_IN action');
      return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' };
    case AUTH_SIGN_OUT:
      console.log('[AuthReducer] got an AUTH_SIGN_OUT action');
      return { ...state, token: action.payload, isAuthenticated: false, errorMessage: '' };
    case AUTH_ERROR:
      console.log('[AuthReducer] got an AUTH_ERROR action');
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  };
};

export default authReducer;