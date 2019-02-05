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
  doorHistory: [],
  qtyHistory: [],
}

function rootReducer(state = initState, action){
  console.log(state) // logs state before the action
  if(action.type === 'ADD_DOOR') {
    return {
      ...state,
      doorHistory: [...state.doorHistory, action.doorInfo.doorSelect],
      qtyHistory: [...state.qtyHistory, action.doorInfo.qtySelect],
    }
  }
  return state
}

export default rootReducer