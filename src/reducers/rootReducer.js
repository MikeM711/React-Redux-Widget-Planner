const initState = {
  doors: [
    {
      id: 1,
      door: 'Widget A',
      alum: 1,
      crSteel: 1,
      galv: 1,
      glass: 1,
      sSteel: 1,
    },
    {
      id: 2,
      door: 'Widget B',
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

  // Add door to resultHistory
  if (action.type === 'ADD_WIDGET') {
    return {
      ...state,
      resultHistory: [...resultHistory, action.doorInfo]
    }
  }

  // Delete door from resultHistory
  if (action.type === 'DELETE_WIDGET') {
    const newHistory = resultHistory.filter(doorInfo => {
      return doorInfo.id !== action.id
    })
    return {
      ...state,
      resultHistory: newHistory
    }
  }

  // Return new state to Redux
  return state
}

export const selectCompleteHistory = (state) => {

  const completeHistory = state.resultHistory.length ? (
    state.resultHistory.map(result => {

      // Initialize object properties
      let initProps = {
        doorSelect: result.doorSelect,
        qtySelect: result.qtySelect,
        alum: 0,
        crSteel: 0,
        galv: 0,
        glass: 0,
        sSteel: 0,
      }

      // Find all the information about the current widget the User has clicked
      let stateWgtInfo = state.doors.find(wgtInfo => {
        return result.doorSelect === wgtInfo.door
      })

      // Combine all information about current widget with initialized properties
      const calcWgt = Object.assign(initProps, stateWgtInfo)

      // We want the id from the Form, not the database
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