import React from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from 'react-router-dom'

import {
  Home,
  Explore,
  Post,
  Profile
} from "./pages"

import Navbar from './components/navbar'

function App() {
  return (

      <Router>
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

      </Router>
    
  )
}

export default App


