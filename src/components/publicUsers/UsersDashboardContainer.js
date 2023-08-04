import React, { Component } from 'react'
import { connect } from 'react-redux';
import { clearSearch } from '../../actions/index';
import NavBar from '../NavBar';
import UsersDashboard from './UsersDashboard'
import Footer from '../Footer';
import { Grid, Loader } from 'semantic-ui-react';

export class UsersDashboardContainer extends Component {
  state = {
    users: [],
  };

  componentWillMount() {
    fetch('http://localhost:3000/api/v1/users')
    .then(resp => resp.json())
    .then(users => {
      this.setState({
        users,
      });
    });
  };

  componentWillUnmount() {
    window.scrollTo(0, 0);
  };

  render() {
    if (this.state.users.length === 0 || !this.props.auth) {
      return (
        <Grid style={{ height: '99vh' }}>
          <Loader active />
        </Grid>
      );
    } else {
      return (
        <div>
          <NavBar/>

          <UsersDashboard 
            key={1}
            users={this.state.users}
            allLibraryBooks={this.props.allLibraryBooks}
            friends={this.props.friends}
          />

          <Footer/>
        </div>
      );
    };
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    allLibraryBooks: state.allLibraryBooks,
    friends: state.friends,
  };
};

export default connect(
  mapStateToProps,
  {
    clearSearch,
  },
)(UsersDashboardContainer);
