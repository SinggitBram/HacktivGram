import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginAndRegister';
import userLoginDetail from './reducers/userLoginDetail'

const reducers = combineReducers({
  loginReducer, userLoginDetail
});

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

export default store;