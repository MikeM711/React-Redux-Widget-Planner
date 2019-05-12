import {
  FETCH_PROFILE,
  PROFILE_DELETE_CALCULATION,
  PROFILE_SIGN_OUT,
} from '../actions/types';

const initState = {
  name: '',
  calculationDB: [],
};

function profileReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_PROFILE:
      console.log('[ProfileReducer] got a FETCH_WIDGETS_DB action');
      return { ...state, name: action.payload.name, calculationDB: action.payload.userCalcs };
    case PROFILE_SIGN_OUT:
      console.log('[ProfileReducer] got a PROFILE_SIGN_OUT action');
      return { ...state, name: action.payload };
    case PROFILE_DELETE_CALCULATION:
      console.log('[ProfileReducer] got a PROFILE_DELETE_CALCULATION action');
      const filterCalcs = deleteCalcDB(action.payload, state);
      return { ...state, calculationDB: filterCalcs };
    default:
      return state;
  };
};

const deleteCalcDB = (id, state) => {
  const newCalcList = state.calculationDB.filter(calc => {
    return id !== calc.id;
  });
  return newCalcList;
};

export default profileReducer;