import React, { useEffect, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
  Redirect
} from 'react-router-dom'

import {
  Home,
  Explore,
  Post,
  Profile,
  Register
} from "./pages"

import Navbar from './components/navbar'
import { Provider, useSelector } from 'react-redux'
import store from './store';

function App() {
  const { isLogin } = useSelector(state => state.loginReducer);

  return (
    <Provider store={store}>
      <Router >
        {isLogin ? (
          <>
            <nav>
              <Navbar/>
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>
                <Link to="/explore">Explore</Link>
              </div>
              <div>
                <Link to="/post">Post</Link>
              </div>
              <div>
                <Link to="/profile">Profile</Link>
              </div>
            </nav>

            <Switch>
              <Route exact path="/">
                <Home/>
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
            </Switch>
          </>
        )
          : (
          <>
            <Redirect to={`/login?redirect=true`} />
            <Route exact path='/login'>
              <Register />
            </Route>
          </>
        )}
      </Router>
    </Provider>
  )
}

export default App


