const initState = {
  widgets: [
    {
      id: 1,
      widget: 'Widget A',
      alum: 1,
      crSteel: 1,
      galv: 1,
      glass: 1,
      sSteel: 1,
    },
    {
      id: 2,
      widget: 'Widget B',
      alum: 5,
      crSteel: 5,
      galv: 5,
      glass: 5,
      sSteel: 0,
    },
  ],
  resultHistory: [
  ],
}

function rootReducer(state = initState, action) {

  const { resultHistory } = state

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