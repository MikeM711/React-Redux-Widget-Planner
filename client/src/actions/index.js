import axios from 'axios'
import {
  FETCH_WIDGETS_DB,
  ADD_WIDGET_DB,
  DELETE_WIDGET_DB,
  UPDATE_WIDGET_DB,
  ADD_WIDGET_USER_HISTORY,
  DELETE_WIDGET_USER_HISTORY,
  CALCULATE_USER_HISTORY,
  AUTH_SIGN_UP,
  AUTH_ERROR
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
      } else if(err.response.data.clientErr) {
        signUpErr = err.response.data.clientErr
      } else if(err.response.data.error) {
        signUpErr = err.response.data.error
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