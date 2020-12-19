import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home'
import Shop from './components/Shop'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <Switch>
            <Route path="/">
              <Home/>
              <Shop/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App
