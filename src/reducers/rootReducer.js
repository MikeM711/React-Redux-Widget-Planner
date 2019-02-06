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
  combinedHistory: {
    _14GA_CR_120x60: 0,
    _16GA_CR_120x48: 0,
    _16GA_CR_120x60: 0,
    _18GA_CR_120x48: 0,
    _18GA_CR_120x60: 0,
    _20GA_CR_120x48: 0,
    _14GA_AL_120x60: 0,
  }
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

export default rootReducer