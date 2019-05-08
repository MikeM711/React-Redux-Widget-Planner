import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
} from '../actions/types'

const initState = {
  isAuthenticated: false,
  token: '',
  errorMessage: '',
}

function authReducer(state = initState, action) {
  switch (action.type) {
    case AUTH_SIGN_UP:
      console.log('[AuthReducer] got an AUTH_SIGN_UP action')
      return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' }
    case AUTH_ERROR:
      console.log('[AuthReducer] got an AUTH_ERROR action')
      return { ...state, errorMessage: action.payload }
    default:
      return state
  }
}

export default authReducer