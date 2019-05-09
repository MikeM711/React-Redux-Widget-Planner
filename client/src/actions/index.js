import axios from 'axios'
import {
  FETCH_WIDGETS_DB,
  ADD_WIDGET_DB,
  DELETE_WIDGET_DB,
  UPDATE_WIDGET_DB,
  ADD_WIDGET_USER_HISTORY,
  DELETE_WIDGET_USER_HISTORY,
  CALCULATE_USER_HISTORY,
  CLEAR_USER_HISTORY,
  AUTH_SIGN_UP,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  AUTH_ERROR,
  COMPONENT_MOUNT,
  FETCH_PROFILE,
  PROFILE_SIGN_OUT,
  } from './types';


// Google actionCreator
export const oauthGoogle = data => {
  return async dispatch => {
    console.log('we received', data)
    const res = await axios.post('/auth/oauth/google', {
      access_token: data
    });

    console.log('res', res)

    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token
    });

    localStorage.setItem('JWT_TOKEN', res.data.token);
    axios.defaults.headers.common['Authorization'] = res.data.token;
  };
}

// User Sign Up actionCreator
export const signUp = (data) => {
  return async dispatch => {
    try {
      console.log('[ActionCreator] signUp called')
      const res = await axios.post('/auth/signup', data)

      console.log('res', res);
      console.log('[ActionCreator] signUp dispatched an action')

      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data.token,
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    }
    catch(err) {
      console.log('[ActionCreator] signUp dispatched a failed action')

      console.log(err.response)

      if(err.response.data.details){
        var signUpErr = err.response.data.details[0].message
        console.log('signUpErr',signUpErr)
        // console.log('true or false', signInErr === '"email" is not allowed to be empty')
        switch(signUpErr) {
          case '"email" is not allowed to be empty':
            signUpErr = 'Please fill out the "email" field'
            break
          case '"password" is not allowed to be empty':
          default:
            signUpErr = 'Please fill out the "password" field'
            break
        }
      } else if(err.response.data.clientErr) {
        signUpErr = err.response.data.clientErr
      } else if(err.response.data.error) {
        signUpErr = err.response.data.error
      } else if (err.response.data.message) {
        signUpErr = err.response.data.message
      } else {
        // If I missed any errors to handle:
        signUpErr = "Unauthorized - Please Handle"
      }
      
      dispatch ({
        type: AUTH_ERROR,
        payload: signUpErr
      });
    }
  }
}

// User Sign In actionCreator
export const signIn = (data) => {
  return async dispatch => {
    try {
      console.log('[ActionCreator] signIn called')
      const res = await axios.post('/auth/signin', data)

      console.log('res', res);
      console.log('[ActionCreator] signIn dispatched an action')

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data.token,
      });

      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    }
    catch(err) {
      console.log('[ActionCreator] signIn dispatched a failed action')

      console.log(err.response)
      console.log(err.response.data.message)

      if(err.response.data.details){
        var signInErr = err.response.data.details[0].message
        console.log('signInErr',signInErr)
        // console.log('true or false', signInErr === '"email" is not allowed to be empty')
        switch(signInErr) {
          case '"email" is not allowed to be empty':
            signInErr = 'Please fill out the "email" field'
            break
          case '"password" is not allowed to be empty':
          default:
            signInErr = 'Please fill out the "password" field'
            break
        }
      } else if(err.response.data.clientErr) {
        signInErr = err.response.data.clientErr
      } else if(err.response.data.error) {
        signInErr = err.response.data.error
      } else if(err.response.data.message) {
        signInErr = err.response.data.message
      } else {
        // If I missed any errors to handle:
        signInErr = "Unauthorized - Please Handle"
      }
      
      dispatch ({
        type: AUTH_ERROR,
        payload: signInErr
      });
    }
  }
}

export const signOut = () => {
  return async dispatch => {
    try {
      localStorage.removeItem('JWT_TOKEN');
      axios.defaults.headers.common['Authorization'] = '';
  
      await dispatch({
        type: AUTH_SIGN_OUT,
        payload: '',
      })
  
      await dispatch({
        type: PROFILE_SIGN_OUT,
        payload: '',
      })

      await dispatch ({
        type: CLEAR_USER_HISTORY,
        payload: '',
      })
      
    }
    catch(err) {
      console.log('signOut err', err)
    }

  };
}


export const componentMount = () => {
  return async dispatch => {

    dispatch({
      type: COMPONENT_MOUNT,
      payload: '',
    })
  };
}

// fetchWidgets actionCreator
export const fetchWidgetsDB = data => {
  return async dispatch => {
    try {
      console.log('before fetching widgets')
      const res = await axios.get('/widget/widgets');
      console.log(res.data.allWidgets);

      const widgetArr = res.data.allWidgets;

      for (let i = 0; i < widgetArr.length; i++) {
        // console.log(widgetArr[i])

        const { id, name, aluminum, cold_rolled_steel, galvanneal, glass, stainless_steel } = widgetArr[i]

        const widgetData = {
          id: id,
          widget: name,
          alum: aluminum,
          crSteel: cold_rolled_steel,
          galv: galvanneal,
          glass: glass,
          sSteel: stainless_steel
        }
        dispatch({
          type: FETCH_WIDGETS_DB,
          payload: widgetData,
        })
      }
    }
    catch(err) {
      console.log('fetchWidgets ERR:', err)
    }
  
  }
}

export const addWidgetDB = data => {
  return async dispatch => {
    try {
      console.log(data)
      const res = await axios.post('/widget/widgetPOST', {newWidget: data})

      const resWidget = res.data.data
      console.log(resWidget)

      const { id, name, aluminum, cold_rolled_steel, galvanneal, glass, stainless_steel } = resWidget

      const newWidget = {
        id: id,
        widget: name,
        alum: aluminum,
        crSteel: cold_rolled_steel,
        galv: galvanneal,
        glass: glass,
        sSteel: stainless_steel
      }

      dispatch({
        type: ADD_WIDGET_DB,
        payload: newWidget
      })

    }
    catch(err) {
      console.log(err)
    }
  
  }
}

export const deleteWidgetDB = id => {
  return async dispatch => {
    try {
      await axios.delete(`/widget/widgetDELETE/${id}`)

      dispatch({
        type: DELETE_WIDGET_DB,
        payload: id
      })

    }
    catch(err) {
      console.log(err)

    }
  }
}

export const updateWidgetDB = data => {
  return async dispatch => {
    try {

      const updatedWidget = await axios.put('widget/widgetUPDATE', {updatedWidget: data})

      const { id, name, aluminum, cold_rolled_steel, galvanneal, glass, stainless_steel } = updatedWidget.data.data

      const newWidget = {
        id: id,
        widget: name,
        alum: aluminum,
        crSteel: cold_rolled_steel,
        galv: galvanneal,
        glass: glass,
        sSteel: stainless_steel
      }

      dispatch({
        type: UPDATE_WIDGET_DB,
        payload: newWidget
      })

    }
    catch(err) {
      console.log(err)
    }
  }
}


export const addWidgetHist = data => {
  return async dispatch => {
    try {

      dispatch({
        type: ADD_WIDGET_USER_HISTORY,
        payload: data,
      })

      // after "add widget" is dispatched, and redux state is updated, calculate the total history
      dispatch({
        type: CALCULATE_USER_HISTORY,
        payload: '',
      })

    }
    catch(err) {
      console.log('err', err)
    }
  }
}

export const deleteWidgetHist = id => {
  return async dispatch => {
    try {

      dispatch({
        type: DELETE_WIDGET_USER_HISTORY,
        payload: id
      })
      
      // after "delete widget" is dispatched, and redux state is updated, calculate the total history
      dispatch({
        type: CALCULATE_USER_HISTORY,
        payload: '',
      })

    }
    catch(err) {
      console.log('err', err) 
    }
  }
}

export const fetchProfile = () => {
  return async dispatch => {
    try {

      // const jwtToken = localStorage.getItem('JWT_TOKEN');
      const res = await axios.get('/auth/profile')
      
      dispatch({
        type: FETCH_PROFILE,
        payload: res.data.profile
      })
      
    }
    catch(err) {
      console.log('err', err)
    }
  }
}

export const submitProfileResults = (userHistory, userHistTotal) => {
  return async dispatch => {
    try {
      console.log('submitProfileResults actionCreator')
      console.log('userHistory', userHistory)
      console.log('userHistTotal', userHistTotal)

      // Make an axios request to submit these results

    }
    catch(err) {
      console.log('err', err)
    }

  }
}