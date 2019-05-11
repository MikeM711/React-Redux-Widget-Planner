import {
  ADD_WIDGET_USER_HISTORY,
  DELETE_WIDGET_USER_HISTORY,
  CALCULATE_USER_HISTORY,
  } from './types';

export const addWidgetHist = data => {
  return async dispatch => {
    try {
      dispatch({
        type: ADD_WIDGET_USER_HISTORY,
        payload: data,
      });
      // after "add widget" is dispatched and redux state is updated, calculate the total history
      dispatch({
        type: CALCULATE_USER_HISTORY,
        payload: '',
      });
    }
    catch (err) {
      console.log('err', err);
    };
  };
};

export const deleteWidgetHist = id => {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_WIDGET_USER_HISTORY,
        payload: id
      });
      // after "delete widget" is dispatched and redux state is updated, calculate the total history
      dispatch({
        type: CALCULATE_USER_HISTORY,
        payload: '',
      });
    }
    catch (err) {
      console.log('err', err);
    };
  };
};