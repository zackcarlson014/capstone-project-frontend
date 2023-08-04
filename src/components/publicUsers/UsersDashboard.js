import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearSearch } from '../../actions/index';
import NavBar from '../NavBar';
import UserDash from './UserDash';
import Footer from '../Footer';
import {
  Grid,
  Loader,
  Header,
  Icon
} from 'semantic-ui-react';

export class UsersDashboard extends Component {
  state = {
    noMatch: false,
  };
  
  componentWillUnmount() {
    this.props.clearSearch();
  };

  fellowMyBrarians = () => {
    const users = this.props.users.filter(u =>
      u.id !== this.props.auth.id
    );
    
    const userRequestIds = this.props.friends
      .filter(f => 
        f.inviter_id !== this.props.auth.id
        && f.pending
      )
      .map(f => f.inviter_id);

    const friendIds = this.props.friends
      .filter(f => !f.pending)
      .map(f =>
        f.inviter_id === this.props.auth.id
          ? f.invitee_id
          : f.inviter_id
      );

    const allUserRequests = users.filter(u =>
      userRequestIds.includes(u.id));

    const allFriends = users.filter(u =>
        friendIds.includes(u.id));

    const allOtherUsers = users.filter(u => 
        !userRequestIds.includes(u.id) && !friendIds.includes(u.id)
    );

    const allSortedUsers = [...allUserRequests, ...allFriends, ...allOtherUsers];

    if (this.props.searchField)  {
      const lowerCaseInput = this.props.searchField.toLowerCase();

      const userRequests = users.filter(u => 
        u.username.toLowerCase().includes(lowerCaseInput)
        && userRequestIds.includes(u.id)
      );

      const otherUsers = users.filter(u => 
        u.username.toLowerCase().includes(lowerCaseInput)
        && !userRequestIds.includes(u.id)
      );

      const sortedUsers = [...userRequests, ...otherUsers];
      if (sortedUsers.length !== 0)
        return sortedUsers;
    }

    return allSortedUsers;
  };

  myBrarianLibraryBooks = (id) => {
    return this.props.allLibraryBooks.filter(b =>
      b[1].id === id
    );
  };

  render() {
    if (
      !this.props.users
      || !this.props.auth
    ) {
      return (
        <Grid style={{ height: '99vh' }}>
          <Loader active />
        </Grid>
      );
    } else {
      return (
        <div className='App'>
          <NavBar/><br/>
          <Grid textAlign='center'>
            <Grid.Row/>
            <Grid.Row/>

            <Grid.Row>
              <Header as='h1' icon style={{color: 'white'}} textAlign='center'>
                <Icon name='user' circular />
                <Header.Content>
                  MyBrarians
                </Header.Content>
              </Header>
            </Grid.Row>

            <Grid.Row/>

            {this.state.noMatch
              ? <Grid.Row>
                  <Header as='h3' color='red' textAlign='center'>
                    No MyBrarians match your search
                  </Header>
                </Grid.Row>
              
              : null
            }
          </Grid>

          {this.fellowMyBrarians().map(u =>
            <UserDash
              key={u.id} 
              user={u} 
              myBrarianLibraryBooks={this.myBrarianLibraryBooks}
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
    searchField: state.searchField
  };
};

export default connect(
  mapStateToProps,
  {
    clearSearch,
  },
)(UsersDashboard);
