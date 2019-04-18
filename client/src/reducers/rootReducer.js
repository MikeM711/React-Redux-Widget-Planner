const initState = {
  widgets: [],
  resultHistory: [],
}

function rootReducer(state = initState, action) {

  const { resultHistory } = state
  const { widgets } = state

  // Add widget to resultHistory
  if (action.type === 'ADD_WIDGET') {
    return {
      ...state,
      resultHistory: [...resultHistory, action.widgetInfo]
    }
  }

  // Delete widget from resultHistory
  if (action.type === 'DELETE_WIDGET') {
    const newHistory = resultHistory.filter(widgetInfo => {
      return widgetInfo.id !== action.id
    })
    return {
      ...state,
      resultHistory: newHistory
    }
  }

  // Fetch all widgets from the database, put them into "widgets" state array
  if (action.type === 'FETCH_WIDGETS') {
    // console.log('reducer', action.widget)

    const { id, name, aluminum, cold_rolled_steel, galvanneal, glass, stainless_steel } = action.widget

    const widgetData = {
      id: id,
      widget: name,
      alum: aluminum,
      crSteel: cold_rolled_steel,
      galv: galvanneal,
      glass: glass,
      sSteel: stainless_steel
    }

    return {
      ...state,
      widgets: [...widgets, widgetData]
    }
  }

  if (action.type === 'ADD_WIDGET_TO_DB') {

    const { id, name, aluminum, cold_rolled_steel, galvanneal, glass, stainless_steel } = action.newWidget

    const newWidget = {
      id: id,
      widget: name,
      alum: aluminum,
      crSteel: cold_rolled_steel,
      galv: galvanneal,
      glass: glass,
      sSteel: stainless_steel
    }

    return {
      ...state,
      widgets: [...widgets, newWidget]
    }

  }

  if (action.type === 'DELETE_WIDGET_FROM_DB') {

    const deleteWidgetId = action.deleteWidget
    console.log('delete widget', deleteWidgetId)

    // Only return widgets with id's that do not match the incoming id from action
    const newWidgetList = state.widgets.filter(widget => {
      return deleteWidgetId !== widget.id
    })

    return {
      ...state,
      widgets: newWidgetList
    }
  }

  // Return new state to Redux
  return state
}

export const completeUserHistory = (state) => {

  const completeHistory = state.resultHistory.length ? (
    state.resultHistory.map(result => {

      // Initialize object properties
      let initProps = {
        widgetSelect: result.widgetSelect,
        qtySelect: result.qtySelect,
        alum: 0,
        crSteel: 0,
        galv: 0,
        glass: 0,
        sSteel: 0,
      }

      // Find all the information about the current widget the User has clicked
      let stateWgtInfo = state.widgets.find(wgtInfo => {
        return result.widgetSelect === wgtInfo.widget
      })

      // Combine all information about current widget with initialized properties
      const calcWgt = Object.assign(initProps, stateWgtInfo)

      // We want the id from the Form (random integer), not the id from the widgets list
      calcWgt.id = result.id

      console.log('complete info', calcWgt)

      calcWgt.alum = calcWgt.alum * result.qtySelect
      calcWgt.crSteel = calcWgt.crSteel * result.qtySelect
      calcWgt.galv = calcWgt.galv * result.qtySelect
      calcWgt.glass = calcWgt.glass * result.qtySelect
      calcWgt.sSteel = calcWgt.sSteel * result.qtySelect

      return calcWgt
    })
  ) : ([])

  return completeHistory
}

export default rootReducer