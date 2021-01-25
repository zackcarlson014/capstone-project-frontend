import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { currentUser } from './actions/auth'
import { allLibraryBooks, allWishedBooks } from './actions/index'
import Login from './components/Login.js'
import Profile from './components/Profile.js'
import PublicProfile from './components/PublicProfile.js'
import NewUserForm from './components/NewUserForm.js'
import EditUserForm from './components/EditUserForm.js'
import UsersDashboard from './components/UsersDashboard.js'
import BooksDashboard from './components/BooksDashboard.js'
import BookShowPage from './components/BookShowPage.js'
import AddLibraryBookContainer from './components/AddLibraryBookContainer.js'
import AddWishedBookContainer from './components/AddWishedBookContainer.js'
import ReservedBooks from './components/ReservedBooks.js'
import ReservedBookShowPage from './components/ReservedBookShowPage.js'
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
      <div>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path='/login' component={Login} />
          <Route path='/profile' component={Profile} />
          <Route exact path='/users/new' component={NewUserForm} />
          <Route exact path='/users/:id/edit' component={EditUserForm} />
          <Route exact path='/users/:id' component={PublicProfile} />
          <Route exact path='/users' component={UsersDashboard}/>
          <Route path='/books/:id' component={BookShowPage} />
          <Route exact path='/books' component={BooksDashboard} />
          <Route exact path='/user_lib_books/new' component={AddLibraryBookContainer}/>
          <Route exact path='/user_wish_books/new' component={AddWishedBookContainer}/>
          <Route exact path='/reserved_books/:id' component={ReservedBookShowPage}/>
          <Route exact path='/reserved_books' component={ReservedBooks}/>
        </Switch>
      </div>

    )
  }
}

export default connect(null, { currentUser, allLibraryBooks, allWishedBooks })(withRouter(App))

