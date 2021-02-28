import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFriendRequest, approveFriendRequest } from '../../actions/index';
import DashboardLibraryBooks from '../booksDashboard/DashboardLibraryBooks';
import { Grid, Header, Segment, Button, Icon, Popup, Image } from 'semantic-ui-react';

export class UserDash extends Component {

    requestFriend = () => {
        const newFriendRequest = {
            inviter_id: this.props.auth.id,
            invitee_id: this.props.user.id,
            pending: true
        };
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newFriendRequest)
        };
        fetch('http://localhost:3000/api/v1/friends', reqObj)
        .then(resp => resp.json())
        .then(friendReq => {
            this.props.addFriendRequest(friendReq)
        });
    }

    approveFriend = (userId) => {
        const request = this.props.friends.find(f => f.invitee_id === userId || f.inviter_id === userId)
        const approvedRequest = {
            pending: false
        };
        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(approvedRequest)
        };
        fetch(`http://localhost:3000/api/v1/friends/${request.id}`, reqObj)
        .then(resp => resp.json())
        .then(friendReq => {
            console.log(friendReq)
            this.props.approveFriendRequest(friendReq.id)
        });
    }

    friendStatus = (id) => {
        const friend = this.props.friends.filter(f => 
            f.pending === false
        ).find(f => 
            f.inviter_id === id || f.invitee_id === id
        );
        const request = this.props.friends.filter(f => 
            f.pending === true
        ).find(f => 
            f.inviter_id === id || f.invitee_id === id
        );
        if (friend) {
            return 0
        } else if (request) {
            return 1
        } else {
            return 2
        }
    }

    requestedByCurrentUser = (id) => {
        return this.props.friends.find(f => f.invitee_id === id);
    }
    
    render() {
        return (
            <Grid textAlign='center'>   
                <Grid.Row> 
                    <Grid.Column width='1'></Grid.Column>
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
                        </Grid.Row><br/><br/>
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
                        </Grid.Row><br/>
                        <Grid.Row>
                            {this.friendStatus(this.props.user.id) === 2 ? 
                                <Button 
                                    onClick={() => this.requestFriend()}
                                    color='purple'
                                    animated='fade'
                                    fluid
                                >
                                    <Button.Content visible>
                                        <Icon name='heart'/>
                                    </Button.Content>
                                    <Button.Content hidden>
                                        Send Request
                                    </Button.Content>
                                </Button>
                                :
                                null
                            }
                            {this.friendStatus(this.props.user.id) === 1 ? 
                                <Button 
                                    onClick={this.requestedByCurrentUser(this.props.user.id) ? 
                                        null 
                                        : 
                                        () => this.approveFriend(this.props.user.id
                                    )}
                                    color='purple'
                                    fluid
                                >
                                    <Icon name='heart'/>
                                    {this.requestedByCurrentUser(this.props.user.id) ? "Pending" : "Accept"}
                                </Button>
                                :
                                null
                            }
                            {this.friendStatus(this.props.user.id) === 0 ?
                                <span>
                                    <Grid.Column width='4'></Grid.Column>
                                    <Grid.Column width='8'>
                                        <Button fluid disabled color='purple'>
                                            <Icon name='heart' style={{color: 'white'}}/>
                                            Friends
                                        </Button>
                                    </Grid.Column>
                                    <Grid.Column width='4'></Grid.Column>
                                </span>
                                :
                                null
                            }
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width='2'></Grid.Column>
                        {this.props.myBrarianLibraryBooks(this.props.user.id).length === 0 ?
                            <Grid.Column width='8' verticalAlign='middle'>
                                <Header as='h1' icon style={{color: 'white'}} textAlign='center'>
                                    <Icon name='book' circular />
                                    <Header.Content>
                                        {this.props.user.username}'s shelf is currently empty
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            :
                            <Grid.Column width='8'>
                                <DashboardLibraryBooks books={this.props.myBrarianLibraryBooks(this.props.user.id)} userDash={true}/>
                            </Grid.Column>
                        }
                    <Grid.Column width='1'></Grid.Column>
                </Grid.Row>
                <Grid.Row></Grid.Row>
                <Grid.Row></Grid.Row>
            </Grid>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        friends: state.friends
    }
}

export default connect(mapStateToProps, { addFriendRequest, approveFriendRequest })(UserDash);
