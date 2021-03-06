import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  // Link,
  Route,
  Redirect
} from 'react-router-dom'

import {
  Home,
  Explore,
  Post,
  Profile,
  Register,
  DetailPost,
  User
} from "./pages"

// import Navbar from './components/navbar'
import { Provider, useSelector } from 'react-redux'
import store from './store';

function App() {
  const { isLogin } = useSelector(state => state.loginReducer);

  return (
    <Provider store={store}>
      <Router >
        {isLogin ? (
          <div style={{ backgroundColor: "#FAFAFA" }}>

            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/detailpost/:postId">
                <DetailPost/>
              </Route>
              <Route path="/explore">
                <Explore/>
              </Route>
              <Route path="/post">
                <Post/>
              </Route>
              <Route path="/profile">
                <Profile/>
              </Route>
              <Route path="/user/:id">
                <User/>
              </Route>
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </div>
        )
          : (
          <>
            <Redirect to={`/login?redirect=true`} />
            <Route exact path='/login'>
              <Register />
            </Route>
            <Route exact path='/register'>
              <Register />
            </Route>
          </>
        )}
      </Router>
    </Provider>
  )
}

export default App


