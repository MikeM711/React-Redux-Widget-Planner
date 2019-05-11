import axios from 'axios'

import {
  FETCH_WIDGETS_DB,
  ADD_WIDGET_DB,
  DELETE_WIDGET_DB,
  UPDATE_WIDGET_DB,
  } from './types';

export const fetchWidgetsDB = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/widget/widgets');
      const widgetArr = res.data.allWidgets;
      for (let i = 0; i < widgetArr.length; i++) {
        const { id, name, aluminum, cold_rolled_steel, galvanneal, glass, 
          stainless_steel, createdAt, updatedAt } = widgetArr[i];
        const widgetData = {
          id: id,
          widget: name,
          alum: aluminum,
          crSteel: cold_rolled_steel,
          galv: galvanneal,
          glass: glass,
          sSteel: stainless_steel,
          createdAt,
          updatedAt
        };
        dispatch({
          type: FETCH_WIDGETS_DB,
          payload: widgetData,
        });
      };
    }
    catch (err) {
      console.log('err', err);
    };
  };
};

export const addWidgetDB = data => {
  return async dispatch => {
    try {
      const res = await axios.post('/widget/widgetPOST', { newWidget: data });
      const resWidget = res.data.data;
      const { id, name, aluminum, cold_rolled_steel, galvanneal, glass, 
        stainless_steel, createdAt, updatedAt } = resWidget;
      const newWidget = {
        id: id,
        widget: name,
        alum: aluminum,
        crSteel: cold_rolled_steel,
        galv: galvanneal,
        glass: glass,
        sSteel: stainless_steel,
        createdAt,
        updatedAt
      };
      dispatch({
        type: ADD_WIDGET_DB,
        payload: newWidget
      });
    }
    catch (err) {
      console.log('err', err);
    };
  };
};

export const deleteWidgetDB = id => {
  return async dispatch => {
    try {
      await axios.delete(`/widget/widgetDELETE/${id}`);
      dispatch({
        type: DELETE_WIDGET_DB,
        payload: id
      });
    }
    catch (err) {
      console.log('err', err);;
    };
  };
};

export const updateWidgetDB = data => {
  return async dispatch => {
    try {
      const updatedWidget = await axios.put('widget/widgetUPDATE', { updatedWidget: data });
      const { id, name, aluminum, cold_rolled_steel, galvanneal, glass, 
        stainless_steel, createdAt, updatedAt  } = updatedWidget.data.data;
      const newWidget = {
        id: id,
        widget: name,
        alum: aluminum,
        crSteel: cold_rolled_steel,
        galv: galvanneal,
        glass: glass,
        sSteel: stainless_steel,
        createdAt,
        updatedAt
      };
      dispatch({
        type: UPDATE_WIDGET_DB,
        payload: newWidget
      });
    }
    catch (err) {
      console.log('err', err);
    };
  };
};