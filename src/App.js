import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home'
import Shop from './components/Shop'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      shopItems: []
    }
  }

  componentDidMount() {
    fetch('http://192.168.1.204:3030/api/item/')
      .then(res => res.json())
      .then(
        result => {
          this.setState ({
            isLoaded: true,
            shopItems: result.items
          })
        }
      )
      .catch((error) => {
        this.setState({error: error})
      })
  }

  render() {
    const { error, isLoaded, shopItems } = this.state;
    return (
      <div className="App">
        <Router>
          <Navbar/>
          <Switch>
            <Route path="/">
              <Home/>
              <Shop shopItems={this.state.shopItems}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App
