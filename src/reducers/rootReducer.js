const initState = {
  doors: [
    {
      id: 1,
      door: 'GP100 18x18',
      _14GA_CR_120x60: 10,
      _18GA_CR_120x48: 66,
    },
    {
      id: 2,
      door: 'GP100 24x24',
      _14GA_CR_120x60: 8,
      _18GA_CR_120x48: 51,
    },
  ],
  resultHistory: [
  ]
}

function rootReducer(state = initState, action) {

  // Add door to resultHistory
  if (action.type === 'ADD_DOOR') {
    return {
      ...state,
      resultHistory: [...state.resultHistory, action.doorInfo]
    }
  }

  // Delete door from resultHistory
  if (action.type === 'DELETE_DOOR') {
    const newHistory = state.resultHistory.filter(doorInfo => {
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

export default rootReducer