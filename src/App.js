import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom';
import { currentUser } from './actions/auth'
import { allLibraryBooks } from './actions/index'
import { allWishedBooks } from './actions/index'
import Profile from './components/Profile.js'
import Login from './components/Login.js'
import BooksDashboard from './components/BooksDashboard.js'
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

        fetch('http://localhost:3000/api/v1/user_lib_books')
        .then(resp => resp.json())
        .then(data => {
            this.props.allLibraryBooks(data)
        })

        fetch('http://localhost:3000/api/v1/user_wish_books')
        .then(resp => resp.json())
        .then(data => {
            this.props.allWishedBooks(data)
        })
    }
  }
  
  render() {
    return (
      <div>
          <Switch>
              <Route path='/login' component={Login} />
              <Route path='/profile' component={Profile} />
              <Route path='/dashboard' component={BooksDashboard} />
          </Switch>
      </div>

    )
  }
}

export default connect(null, { currentUser, allLibraryBooks, allWishedBooks })(withRouter(App))

