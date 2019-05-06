import { combineReducers } from 'redux';
import widgetReducer from './widget';


export default combineReducers({
  widgetRed: widgetReducer,
});