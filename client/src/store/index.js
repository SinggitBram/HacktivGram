import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginAndRegister';

const reducers = combineReducers({
  loginReducer,
});

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;