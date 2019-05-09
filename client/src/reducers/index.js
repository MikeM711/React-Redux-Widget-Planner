import { combineReducers } from 'redux';
import widgetReducer from './widget';
import authReducer from './auth'
import profileReducer from './profile'

export default combineReducers({
  widgetRed: widgetReducer,
  authRed: authReducer,
  profileRed: profileReducer,
});