import React, { Component } from 'react'
import { connect } from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { currentUser } from './actions/auth'
import Profile from './components/Profile.js'
import Login from './components/Login.js'
import './App.css';

export class App extends Component {

  componentDidMount() {
    const token = localStorage.getItem('my_app_token')
    if (!token) {
        this.props.history.push('/login')
    } else {
        const reqObj = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        fetch('http://localhost:3000/api/v1/current_user', reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.currentUser(data)
        })
    }
  }
  
  render() {
    return (
      <Router>
          <Switch>
              <Route path='/profile' component={Profile} />
              <Route path='/login' component={Login} />
          </Switch>
      </Router>

    )
  }
}

export default connect(null, { currentUser })(App)

