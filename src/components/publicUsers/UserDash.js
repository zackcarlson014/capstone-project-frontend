import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFriendRequest, approveFriendRequest } from '../../actions/index';
import DashboardLibraryBooks from '../booksDashboard/DashboardLibraryBooks';
import {
  Grid,
  Header,
  Button,
  Icon,
  Popup,
  Image
} from 'semantic-ui-react';

export class UserDash extends Component {
  requestFriend = () => {
    const newFriendRequest = {
      inviter_id: this.props.auth.id,
      invitee_id: this.props.user.id,
      pending: true,
    };

    const reqURL = 'http://localhost:3000/api/v1/friends';

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newFriendRequest),
    };

    fetch(reqURL, reqObj)
    .then(resp => resp.json())
    .then(friendReq => {
      this.props.addFriendRequest(friendReq)
    });
  }

  approveFriend = (userId) => {
    const request = this.props.friends.find(f =>
      f.invitee_id === userId
      || f.inviter_id === userId
    );

    const approvedRequest = {
      pending: false,
    };

    const reqURL = `http://localhost:3000/api/v1/friends/${request.id}`;

    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(approvedRequest),
    };

    fetch(reqURL, reqObj)
    .then(resp => resp.json())
    .then(friendReq => {
      this.props.approveFriendRequest(friendReq.id)
    });
  }

  friendStatus = (id) => {
    const friend = this.props.friends.find(f =>
      (
        f.inviter_id === id
        || f.invitee_id === id
      )
      && !f.pending
    );

    if (friend) return 0;

    const request = this.props.friends.find(f =>
      (
        f.inviter_id === id
        || f.invitee_id === id
      )
      && f.pending
    );
  
    if (request) return 1;

    return 2
  };

  requestedByCurrentUser = (id) => {
    return this.props.friends.find(f =>
      f.invitee_id === id
    );
  };
  
  render() {
    return (
      <Grid textAlign='center'>   
        <Grid.Row> 
          <Grid.Column width='1'/>

          <Grid.Column width='4' verticalAlign='middle'>
              <Grid.Row
                as={ Link } 
                exact='true' 
                to={`/users/${this.props.user.id}`} 
              >
                <Popup
                  content={this.props.user.bio}
                  key={this.props.user.username}
                  header={this.props.user.username}
                  trigger={
                    <Image  
                      src={this.props.user.prof_pic_url} 
                      avatar 
                      size='large'
                    />
                  }
                />
              </Grid.Row>
              
              <br/><br/>

              <Grid.Row
                as={ Link } 
                exact='true' 
                to={`/users/${this.props.user.id}`} 
              >
                <Header 
                  as='h3' 
                  style={{color: 'white'}}
                >
                  {this.props.user.username}
                </Header>
              </Grid.Row>
              
              <br/>

              <Grid.Row>
                {this.friendStatus(this.props.user.id) !== 2
                  ? null
                  : <Button 
                      color='purple'
                      animated='fade'
                      fluid
                      onClick={() => this.requestFriend()}
                    >
                      <Button.Content visible>
                        <Icon name='heart'/>
                      </Button.Content>

                      <Button.Content hidden>
                        Send Request
                      </Button.Content>
                  </Button>
                }

                {this.friendStatus(this.props.user.id) !== 1
                  ? null
                  : <Button
                      color='purple'
                      fluid
                      onClick={this.requestedByCurrentUser(this.props.user.id)
                        ? null 
                        : () => this.approveFriend(this.props.user.id)
                      }
                    >
                      <Icon name='heart'/>
                      {this.requestedByCurrentUser(this.props.user.id)
                        ? "Pending"
                        : "Accept"
                      }
                    </Button>
                }

                {this.friendStatus(this.props.user.id) !== 0
                  ? null
                  : <span>
                      <Grid.Column width='4'/>

                      <Grid.Column width='8'>
                        <Button fluid disabled color='purple'>
                          <Icon name='heart' style={{color: 'white'}}/>
                          Friends
                        </Button>
                      </Grid.Column>

                      <Grid.Column width='4'/>
                    </span>
                }
            </Grid.Row>
          </Grid.Column>
    
          <Grid.Column width='2'/>

          {this.props.myBrarianLibraryBooks(this.props.user.id).length === 0
            ? <Grid.Column width='8' verticalAlign='middle'>
                <Header as='h1' icon style={{color: 'white'}} textAlign='center'>
                    <Icon name='book' circular />
                    <Header.Content>
                        {this.props.user.username}'s shelf is currently empty
                    </Header.Content>
                </Header>
              </Grid.Column>
            
            : <Grid.Column width='8'>
                <DashboardLibraryBooks
                  books={this.props.myBrarianLibraryBooks(this.props.user.id)}
                  userDash={true}
                />
              </Grid.Column>
          }

          <Grid.Column width='1'/>
        </Grid.Row>

        <Grid.Row/>
        <Grid.Row/>
      </Grid>
    );
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    friends: state.friends,
  };
};

export default connect(
  mapStateToProps,
  {
    addFriendRequest,
    approveFriendRequest,
  },
)(UserDash);
