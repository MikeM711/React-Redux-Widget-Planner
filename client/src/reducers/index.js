import { combineReducers } from 'redux';
import widgetReducer from './widget';
import authReducer from './auth'


export default combineReducers({
  widgetRed: widgetReducer,
  authRed: authReducer
});