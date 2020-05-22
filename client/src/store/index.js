import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginAndRegister';

const reducers = combineReducers({
  loginReducer,
  // favGameReducer,
  // gameDetailReducer
});

// const persistedData = localStorage.getItem('token') ? true : false;
const store = createStore(
  reducers,
  // persistedData,
  applyMiddleware(thunk)
);

export default store;