import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearSearch } from '../../actions/index';
import NavBar from '../NavBar';
import UserDash from './UserDash';
import Footer from '../Footer';
import { Grid, Loader, Header, Icon } from 'semantic-ui-react';

export class UsersDashboard extends Component {

    state = {
        users: [],
        noMatch: false
    };

    componentWillMount() {
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(users => {
            this.setState({
                users
            });
        });
    };
    
    componentWillUnmount() {
        this.props.clearSearch()
    }

    fellowMyBrarians = () => {
        let matchedUsers = [];
        let allSortedUsers = [];
        let userRequestIds = [];
        let friendIds = [];
        let allUserRequests = [];
        let allFriends = [];
        let allOtherUsers = [];
        const users = this.state.users.filter(u => u.id !== this.props.auth.id)
        userRequestIds = this.props.friends.filter(f => 
            f.inviter_id !== this.props.auth.id && f.pending === true
        ).map(f => 
            f.inviter_id
        );
        friendIds = this.props.friends.filter(f => 
           f.pending === false 
        ).map(f => {
            return f.inviter_id === this.props.auth.id ? f.invitee_id : f.inviter_id;
        });
        allUserRequests = users.filter(u => {
            return userRequestIds.includes(u.id)
        });
        allFriends = users.filter(u => {
            return friendIds.includes(u.id)
        });
        allOtherUsers = users.filter(u => 
            !userRequestIds.includes(u.id) && !friendIds.includes(u.id)
        );
        allSortedUsers.push(...allUserRequests, ...allFriends, ...allOtherUsers)
        if (this.props.searchField)  {
            let sortedUsers = []
            const userRequests = users.filter(u => 
                u.username.toLowerCase().includes(this.props.searchField.toLowerCase())
                &&
                userRequestIds.includes(u.id)
            );
            const otherUsers = users.filter(u => 
                u.username.toLowerCase().includes(this.props.searchField.toLowerCase())
                &&
                !userRequestIds.includes(u.id)
            );
            sortedUsers.push(...userRequests, ...otherUsers)
            if (sortedUsers.length !== 0) {
                matchedUsers = sortedUsers;
            } else {
                matchedUsers = allSortedUsers;
            }; 
        } else {
            matchedUsers = allSortedUsers;
        };
        return matchedUsers;
    };

    myBrarianLibraryBooks = (id) => {
        return this.props.allLibraryBooks.filter(b => b[1].id === id);
    };

    render() {
        if (!this.props.auth && !this.state.users) {
            return <Grid style={{ height: '99vh' }}><Loader active /></Grid>;
        } else {
            return (
                <div className='App'>
                    <NavBar/><br/>
                    <Grid textAlign='center'>
                        <Grid.Row></Grid.Row>
                        <Grid.Row></Grid.Row>
                        <Grid.Row>
                            <Header as='h1' icon style={{color: 'white'}} textAlign='center'>
                                <Icon name='user' circular />
                                <Header.Content>
                                    MyBrarians
                                </Header.Content>
                            </Header>
                        </Grid.Row>
                        <Grid.Row></Grid.Row>
                        {this.state.noMatch ?
                            <Grid.Row>
                                <Header as='h3' color='red' textAlign='center'>
                                    No MyBrarians match your search
                                </Header>
                            </Grid.Row>
                            :
                            null
                        }
                    </Grid>
                    {this.fellowMyBrarians().map(u =>
                        <UserDash user={u} myBrarianLibraryBooks={this.myBrarianLibraryBooks}/>   
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
        searchField: state.searchField
    };
};

export default connect(mapStateToProps, { clearSearch })(UsersDashboard);
