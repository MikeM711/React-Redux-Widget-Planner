import axios from 'axios'

import {
  CLEAR_USER_HISTORY,
  COMPONENT_MOUNT,
  AUTH_SIGN_UP,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  AUTH_ERROR,
  PROFILE_SIGN_OUT,
  } from './types';

export const oauthGoogle = data => {
  return async dispatch => {
    try {
      console.log('[ActionCreator] oauthGoogle called');
      const res = await axios.post('/auth/oauth/google', { access_token: data });
      console.log('[ActionCreator] oauthGoogle dispatched an action');
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token
      });
      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    }
    catch (err) {
      console.log('err', err);
    };
  };
};

export const signUp = (data) => {
  return async dispatch => {
    try {
      console.log('[ActionCreator] signUp called');
      const res = await axios.post('/auth/signup', data);
      console.log('[ActionCreator] signUp dispatched an action');
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });
      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    }
    catch (err) {
      console.log('[ActionCreator] signUp dispatched a failed action', err.response);
      if (err.response.data.details) {
        var signUpErr = err.response.data.details[0].message;
        // console.log('signUpErr', signUpErr);

        switch (signUpErr) {
          case '"email" is not allowed to be empty':
            signUpErr = 'Please fill out the "email" field';
            break;
          case '"password" is not allowed to be empty':
            signUpErr = 'Please fill out the "password" field';
            break;
          default:
            // If I missed any errors to handle:
            signUpErr = 'Something is wrong - please handle';
            break;
        }

      } else if (err.response.data.clientErr) {
        signUpErr = err.response.data.clientErr;
      } else if (err.response.data.error) {
        signUpErr = err.response.data.error;
      } else if (err.response.data.message) {
        signUpErr = err.response.data.message;
      } else {
        // If I missed any errors to handle:
        signUpErr = "Unauthorized - Please Handle";
      };
      dispatch({
        type: AUTH_ERROR,
        payload: signUpErr
      });
    };
  };
};

export const signIn = (data) => {
  return async dispatch => {
    try {
      console.log('[ActionCreator] signIn called');
      const res = await axios.post('/auth/signin', data);
      console.log('[ActionCreator] signIn dispatched an action');
      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
      });
      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    }
    catch (err) {
      console.log('[ActionCreator] signIn dispatched a failed action');
      if (err.response.data.details) {
        var signInErr = err.response.data.details[0].message;
        switch (signInErr) {
          case '"email" is not allowed to be empty':
            signInErr = 'Please fill out the "email" field';
            break;
          case '"password" is not allowed to be empty':
            signInErr = 'Please fill out the "password" field';
            break;
          default:
            // If I missed any errors to handle:
            signInErr = 'Something is wrong - please handle';
            break;
        };
      } else if (err.response.data.clientErr) {
        signInErr = err.response.data.clientErr;
      } else if (err.response.data.error) {
        signInErr = err.response.data.error;
      } else if (err.response.data.message) {
        signInErr = err.response.data.message;
      } else {
        // If I missed any errors to handle:
        signInErr = "Unauthorized - Please Handle";
      };
      dispatch({
        type: AUTH_ERROR,
        payload: signInErr
      });
    };
  };
};

export const signOut = () => {
  return async dispatch => {
    try {
      localStorage.removeItem('JWT_TOKEN');
      axios.defaults.headers.common['Authorization'] = '';
      await dispatch({
        type: AUTH_SIGN_OUT,
        payload: '',
      });
      await dispatch({
        type: PROFILE_SIGN_OUT,
        payload: '',
      });
      await dispatch({
        type: CLEAR_USER_HISTORY,
        payload: '',
      });
    }
    catch (err) {
      console.log('err', err);
    };
  };
};

export const componentMount = () => {
  return async dispatch => {
    try {
      dispatch({
        type: COMPONENT_MOUNT,
        payload: '',
      });
    }
    catch(err) {
      console.log('err', err)
    };
  };
};