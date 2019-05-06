import axios from 'axios'
import {
  FETCH_WIDGETS_DB,
  ADD_WIDGET_DB,
  DELETE_WIDGET_DB,
  ADD_WIDGET_USER_HISTORY,
  DELETE_WIDGET_USER_HISTORY,
  CALCULATE_USER_HISTORY,
  } from './types';

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
      const res = await axios.delete(`/widget/widgetDELETE/${id}`)

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
      console.log('id', id)

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