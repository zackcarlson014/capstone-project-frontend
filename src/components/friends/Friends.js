import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearSearch } from '../../actions/index';
import NavBar from '../NavBar';
import FriendRequests from './FriendRequests';
import UserDash from '../publicUsers/UserDash';
import Footer from '../Footer';
import {
  Grid,
  Header,
  Loader,
  Icon,
} from 'semantic-ui-react';

export class Friends extends Component {
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
    this.props.clearSearch();
  };

  searchableUsers = () => {
    const matchedUsers = this.state.users.filter(u =>
      u.id !== this.props.auth.id
    );

    if (this.props.searchField) {
      const lowerCaseInput = this.props.searchField.toLowerCase();
      const users = matchedUsers.filter(u => 
        u.username.toLowerCase()
        .includes(lowerCaseInput)
      );

      if (users.length !== 0)
        return users;
    }

    return matchedUsers;
  };

  currentUserFriends = () => {
    const friendIds = this.props.friends
      .filter(f => f.pending === false)
      .map(f => {
        return f.inviter_id === this.props.auth.id
          ? f.invitee_id
          : f.inviter_id;
    });

    const friends = this.searchableUsers().filter(u => 
      friendIds.includes(u.id)
    );
    
    return friends;
  };

  friendLibraryBooks = (id) => {
    return this.props.allLibraryBooks.filter(b =>
      b[1].id === id
    );
  };

  pendingFriendRequestObjects = () => {
    return this.props.friends.filter(f => 
      f.pending === true 
      && f.invitee_id === this.props.auth.id
    ).map(f => {
      return {
        request: f,
        user: this.state.users.find(u =>
          u.id === f.inviter_id
        )
      };
    });
  };

  requestUsers = () => {
    const userIds = this.props.friends.filter(f => 
      f.invitee_id === this.props.auth.id
      && f.pending === true  
    ).map(f => 
      f.inviter_id
    );

    return this.state.users.filter(u =>
      userIds.includes(u.id)
    )
  }

  render() {
    window.scrollTo(0, 0);

    if (!this.props.auth) {
      return (
        <Grid style={{ height: '80vh' }}>
          <Loader active />
        </Grid>
      );
    } else {
      return (
        <div className='App'>
          <NavBar/><br/>
          <Grid textAlign='center' style={this.pendingFriendRequestObjects().length !== 0 || this.currentUserFriends().length === 0 ? { minHeight: '99vh' } : null}>
            <Grid.Row/>

            <Grid.Row/>

            {this.pendingFriendRequestObjects().length === 0
              ? null
              : <Grid.Row>
                  <Grid.Column width='10'>
                      <Grid.Row></Grid.Row>
                      <Grid.Row>
                          <Header as='h1' icon style={{color: 'white'}} textAlign='center'>
                              <Icon name='user' circular />
                              <Header.Content>
                                  Pending Requests
                              </Header.Content>
                          </Header><br/>
                      </Grid.Row>
                      <Grid.Row></Grid.Row>
                      <Grid.Row>
                          <FriendRequests requestObjects={this.pendingFriendRequestObjects()}/><br/>
                      </Grid.Row>  
                      <Grid.Row></Grid.Row>
                  </Grid.Column>
                </Grid.Row>
            }

            <Grid.Row>
              <Header
                as='h1'
                icon
                style={{color: 'white'}}
                textAlign='center'
              >
                <Icon name='user' circular />
                <Header.Content>
                  Your Friends
                </Header.Content>
              </Header>
            </Grid.Row>

            <Grid.Row/>
          </Grid>
          
          <br/>

          {this.currentUserFriends().map((u, i) =>
            <UserDash
              key={i}
              user={u}
              myBrarianLibraryBooks={this.friendLibraryBooks}
            />   
          )}

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
    searchField: state.searchField,
  };
};

export default connect(
  mapStateToProps,
  {
    clearSearch,
  },
)(Friends);
