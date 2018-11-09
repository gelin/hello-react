import {combineReducers} from 'redux';

import greetingsReducer from '../containers/greetings/reducer';


const appReducer = combineReducers({
  greetingsReducer,
});

export default (state = {}, action) => appReducer(state, action);
