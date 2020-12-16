import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// import { Button } from '@material-ui/core';
// import NavBar from './components/NavBar.js'
import BooksContainer from './components/BooksContainer.js'
import Login from './components/Login.js'
import './App.css';

export class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
              {/* <NavBar/><br/><br/> */}
              <Route path='/profile' component={BooksContainer} />
              <Route path='/login' component={Login} />
          </Switch>
      </Router>

    )
  }
}

export default connect()(App)

