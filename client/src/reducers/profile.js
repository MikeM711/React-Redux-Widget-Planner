import {
  FETCH_PROFILE,
} from '../actions/types'

const initState = {
  email: '',
  // userId: '',
  // widgetCalculations: [],
}

function profileReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      console.log('[ProfileReducer] got a FETCH_WIDGETS_DB action')
      return { ...state, email: action.payload }
    default:
      return state
  }
}

export default profileReducer