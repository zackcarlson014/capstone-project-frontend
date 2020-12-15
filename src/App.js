import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// import { Button } from '@material-ui/core';
// import NavBar from './components/NavBar.js'
import BooksContainer from './containers/BooksContainer.js'
import Login from './components/Login.js'
import './App.css';

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <div>
            {/* <NavBar/><br/><br/> */}
            {/* <BooksContainer /> */}
            <Login />
          </div>
        </Switch>
      </Router>

    )
  }
}

export default connect()(App)

