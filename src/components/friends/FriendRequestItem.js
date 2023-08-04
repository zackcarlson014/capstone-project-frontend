import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { approveFriendRequest } from '../../actions/index';
import {
  Grid,
  Header,
  Message,
  Image,
  Button,
  Icon,
  Loader,
} from 'semantic-ui-react';

export class FriendRequestItem extends Component {
  approveFriend = () => {
    const requestId = this.props.request.id;

    const approvedRequest = {
        pending: false
    };

    const reqURL = `http://localhost:3000/api/v1/friends/${requestId}`;

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
      this.props.approveFriendRequest(friendReq.id);
    });
  };

  render() {
    if (!this.props.requestObjects && !this.props.user) {
      return (
        <Grid style={{ height: '99vh' }}>
          <Loader active />
        </Grid>
      );
    } else {
      return (
        <div>
          <Message>
            <Grid verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width='5'>
                  <Grid.Row>
                    <Image 
                      as={ Link }
                      exact={true}
                      to={`users/${this.props.user.id}`}
                      src={this.props.user.prof_pic_url} 
                      size='small'
                    />
                  </Grid.Row>
                </Grid.Column>

                <Grid.Column width='1'/>

                <Grid.Column width='6' textAlign='left'>
                  <Grid.Row>
                    <Header
                      as={ Link }
                      exact={true}
                      to={`users/${this.props.user.id}`}
                      color='blue'
                    >
                      {this.props.user.username}
                    </Header>
                  </Grid.Row>
                  
                  <br/>

                  <Grid.Row>
                    <Header as='h5'>
                      {this.props.user.bio}
                    </Header>
                  </Grid.Row>
                </Grid.Column>

                <Grid.Column width='3'>
                  <Button 
                    fluid 
                    color='purple' 
                    icon
                    onClick={() => this.approveFriend()}
                  >
                    <Icon name='heart'/>
                    Accept
                  </Button>
                </Grid.Column>
                
                <Grid.Column width='1'/>
              </Grid.Row>
            </Grid>
          </Message>
        </div>
      );
    }
  };
};

export default connect(
  null,
  {
    approveFriendRequest,
  },
)(FriendRequestItem);
