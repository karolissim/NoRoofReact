import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './components/Home'
import Shop from './components/Shop'
import FAQ from './components/FAQ'
import Contact from './components/Contact'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      shopItems: []
    }
  }

  async componentDidMount() {
    await fetch('http://192.168.1.204:3030/api/item/', {mode: 'cors', method: 'GET'})
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
            <Route exact path="/">
              <Home/>
              <Shop shopItems={this.state.shopItems}/>
            </Route>
            <Route path="/faq">
               <FAQ/>
            </Route>
            <Route path="/contact">
              <Contact/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App
