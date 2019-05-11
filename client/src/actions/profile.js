import axios from 'axios'

import {
  CLEAR_USER_HISTORY,
  FETCH_PROFILE,
  PROFILE_DELETE_CALCULATION,
  } from './types';

export const fetchProfile = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/auth/profile');
      dispatch({
        type: FETCH_PROFILE,
        payload: res.data.profile
      });
    }
    catch (err) {
      console.log('err', err);
    };
  };
};

export const addResultToProfile = (userHistory, userHistTotal) => {
  return async dispatch => {
    try {
      const data = {
        userHistory,
        userHistTotal
      };
      await axios.post('/auth/userwidgetcalculation', data);
      dispatch({
        type: CLEAR_USER_HISTORY,
        payload: ''
      });
    }
    catch (err) {
      console.log('err', err);
    };
  };
};

export const deleteProfileResult = (id) => {
  return async dispatch => {
    try{
      await axios.delete(`/auth/deletewidgetcalculation/${id}`);
      dispatch({
        type: PROFILE_DELETE_CALCULATION,
        payload: id
      });
    }
    catch (err) {
      console.log('err',err);
    };
  };
};