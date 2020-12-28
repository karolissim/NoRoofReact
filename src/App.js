import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Navbar from './components/Navbar/Navbar'
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen'
import Shop from './components/Shop/Shop'
import FAQ from './components/FAQ/FAQ'
import Contact from './components/Contact/Contact'
import ItemContainer from './components/ItemContainer/ItemContainer'

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
    await fetch('http://192.168.0.133:3030/api/item/', {mode: 'cors', method: 'GET'})
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
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <WelcomeScreen />
              <Shop shopItems={this.state.shopItems}/>
            </Route>
            <Route path="/faq" component={FAQ}/>
            <Route path="/contact" component={Contact}/>
            <Route path="/shop/:itemId/:sizeId">
              <ItemContainer 
              allItems={this.state.shopItems}/>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }

}

export default App
