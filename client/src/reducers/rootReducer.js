const initState = {
  doors: [
    {
      id: 1,
      door: 'GP100 18x18',
      _14GA_CR_120x60: 10,
      _16GA_CR_120x48: 0,
      _16GA_CR_120x60: 0,
      _18GA_CR_120x48: 66,
      _18GA_CR_120x60: 0,
      _20GA_CR_120x48: 0,
      _14GA_AL_120x60: 0,
    },
    {
      id: 2,
      door: 'GP100 24x24',
      _14GA_CR_120x60: 8,
      _16GA_CR_120x48: 0,
      _16GA_CR_120x60: 0,
      _18GA_CR_120x48: 51,
      _18GA_CR_120x60: 0,
      _20GA_CR_120x48: 0,
      _14GA_AL_120x60: 0,
    },
  ],
  resultHistory: [
  ],
}

function rootReducer(state = initState, action) {

 const {resultHistory} = state
  
  // Add door to resultHistory
  if (action.type === 'ADD_DOOR') {
    return {
      ...state,
      resultHistory: [...resultHistory, action.doorInfo]
    }
  }

  // Delete door from resultHistory
  if (action.type === 'DELETE_DOOR') {
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
        _14GA_CR_120x60: 0,
        _16GA_CR_120x48: 0,
        _16GA_CR_120x60: 0,
        _18GA_CR_120x48: 0,
        _18GA_CR_120x60: 0,
        _20GA_CR_120x48: 0,
        _14GA_AL_120x60: 0,
      }

      // Find all the information about the current door the User has clicked
      let currentDoorInfo = state.doors.find(doorInfo => {
        return result.doorSelect === doorInfo.door
      })

      // Combine all information about current door with initialized properties
      const completeInfo = Object.assign(initProps, currentDoorInfo)

      // We want the id from the Form, not the database
      completeInfo.id = result.id

      // What to do with QTY Number
      if (result.doorSelect.includes('GP100')) {
        completeInfo._14GA_CR_120x60 = Math.ceil((result.qtySelect / completeInfo._14GA_CR_120x60) * 100) / 100

        completeInfo._18GA_CR_120x48 = Math.ceil((result.qtySelect / completeInfo._18GA_CR_120x48) * 100) / 100
      }

      return completeInfo
    })
  ) : ([])

  return completeHistory
}

export default rootReducer