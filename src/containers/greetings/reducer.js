import {types} from './actions';


export const initialGreetingsState = {
  greetings: '',
};

export default function(state = initialGreetingsState, action) {
  switch (action.type) {
    case types.GET_GREETINGS_BY_NAME: {
      const {greetings} = action;
      return {
        ...state,
        greetings,
      };
    }
    case types.RESET_EXISTING_GREETINGS: {
      return {
        ...state,
        ...initialGreetingsState,
      };
    }
    default:
      return state;
  }
}
