import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showUser, removeShowUser, approveFriendRequest } from '../../actions/index';
import NavBar from '../NavBar';
import CurrentlyReadingCarousel from '../carousels/CurrentlyReadingCarousel';
import DashboardLibraryBooks from '../booksDashboard/DashboardLibraryBooks';
import DashboardWishedBooks from '../booksDashboard/DashboardWishedBooks';
import Footer from '../Footer';
import {
  Grid,
  Header,
  Icon,
  Segment,
  Button,
  Image,
  Loader
} from 'semantic-ui-react';

export class PublicProfile extends Component {
  //set showUser store state
  componentWillMount() {
    const id = this.props.location.pathname.slice(7);
    const reqURL = `http://localhost:3000/api/v1/users/${id}`;

    fetch(reqURL)
    .then(resp => resp.json())
    .then(user => this.props.showUser(user))
  };

  //remove showUser store state
  componentWillUnmount() {
    this.props.removeShowUser();
  };

  approveFriend = () => {
    const requestId = this.currentUserFriend().id;

    const approvedRequest = {
      pending: false,
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
  
  //list of all Library Books, searchField conditional results
  libraryBooks = () => {
    if (this.props.searchField)  {
      const lowerCaseInput = this.props.searchField.toLowerCase();

      const books = this.props.allLibraryBooks.filter(b => 
        b[0].title.toLowerCase().includes(lowerCaseInput) 
        || b[0].author.toLowerCase().includes(lowerCaseInput)
      );

      if (books.length !== 0)
        return books;
    }
    
    return this.props.allLibraryBooks;
  };

  //list of all Wish List Books, searchField conditional results
  wishedBooks = () => {
    if (this.props.searchField) {
      const lowerCaseInput = this.props.searchField.toLowerCase();

      const books = this.props.allWishedBooks.filter(b => 
        b[0].title.toLowerCase().includes(lowerCaseInput) 
        || b[0].author.toLowerCase().includes(lowerCaseInput)
      );

      if (books.length !== 0)
        return books;
    }

    return this.props.allWishedBooks;
  };
  
  //Library books that belong to Profile User
  userLibraryBooks = () => {
    const currentlyReadingIds = this.currentlyReading()
      .map(b => b.id);

    return this.libraryBooks().filter(book => 
      book[1].id === this.props.user.id
      && !currentlyReadingIds.includes(book[0].id)
    );
  };

  //Wish List books that belong to Profile User
  userWishedBooks = () => {
    return this.wishedBooks().filter(book =>
      book[1].id === this.props.user.id
    );
  };

  //Library books that belong to Current User
  myLibraryBooks = () => {
    return this.props.allLibraryBooks.filter(book =>
      book[1].id === this.props.auth.id
    );
  };

  //Wish List books that belong to Current User
  myWishedBooks = () => {
    return this.props.allWishedBooks.filter(book =>
      book[1].id === this.props.auth.id
    );
  };

  //Library books on Profile User's Currently Reading list
  currentlyReading = () => {
    const books = this.props.reservedBooks.filter(b => 
      b.user_id === this.props.user.id 
      && b.delivered
      && !b.completed
    );

    const libBooks = books.map(b => {
      return this.props.allLibraryBooks.find(book =>
        book[2] === b.user_lib_book_id
      );
    });
  
    return libBooks.map(b => b[0]);
  };

  //determine if pending friend request exists between currentUser and this user
  currentUserFriendRequest = () => {
    const userId = this.props.user.id;

    return this.props.friends.find(f => 
      f.inviter_id === userId
      && f.pending === true
    );
  };

  //determine if user and currentUser are friends
  currentUserFriend = () => {
    const userId = this.props.user.id;

    return this.props.friends.find(f =>
        (
          f.inviter_id === userId
          || f.invitee_id === userId
        )
        && f.pending === false
    );
  }

  friendRequested = () => {
    const userId = this.props.user.id;

    return this.props.friends.find(f => 
      f.invitee_id === userId
      && f.pending === true
    );
  }

  render() {
    window.scrollTo(0, 0);

    if (!this.props.user) {
      return (
        <Grid style={{ height: '99vh' }}>
          <Loader active />
        </Grid>
      );
    } else {
      return (
        <div className='App'>
          <NavBar/>

          <br/>

          <Grid>
            <Grid.Row/>
            <Grid.Row/>

            <Grid.Row>
              <Grid.Column width='1'/>

              <Grid.Column width='5'>
                <Grid textAlign='center'>
                  
                  <Grid.Row>
                    <Header as='h1' style={{color: 'white'}}>
                      {this.props.user.username}
                    </Header>
                  </Grid.Row>

                  <Grid.Row>
                    <Image
                      avatar
                      src={this.props.user.prof_pic_url}
                      alt=''
                      size='large'
                    />
                  </Grid.Row>

                  {!this.currentUserFriendRequest()
                    ? null
                    : <Grid.Row>
                        <Grid.Column width='4'/>

                        <Grid.Column width='8'>
                          <Button fluid color='purple' animated='fade'>
                            <Button.Content visible>
                                <Icon name='heart'/>
                                Accept
                            </Button.Content>

                            <Button.Content hidden>
                                Pending Request
                            </Button.Content>
                          </Button>
                        </Grid.Column>

                        <Grid.Column width='4'/>
                      </Grid.Row>
                  }

                  {!this.currentUserFriend()
                    ? null
                    : <Grid.Row textAlign='center'>
                        <Grid.Column width='4'></Grid.Column>
                        <Grid.Column width='8'>
                            <Button fluid disabled color='purple'>
                                <Icon name='heart' style={{color: 'white'}}/>
                                Friends
                            </Button>
                        </Grid.Column>
                        <Grid.Column width='4'></Grid.Column>
                      </Grid.Row>
                  }

                  {!this.friendRequested()
                    ? null
                    : <Grid.Row textAlign='center'>
                        <Grid.Column width='4'/>

                        <Grid.Column width='8'>
                          <Button fluid disabled color='purple'>
                            <Icon name='heart' style={{color: 'white'}}/>
                            Friends
                          </Button>
                        </Grid.Column>

                        <Grid.Column width='4'/>
                      </Grid.Row>
                  }

                  {!this.currentUserFriendRequest()
                  && !this.currentUserFriend()
                  && !this.friendRequested()
                    ? <Grid.Row>
                        <Grid.Column width='4'/>

                        <Grid.Column width='8'>
                          <Button fluid color='purple' animated='fade'>
                            <Button.Content visible>
                                <Icon name='heart'/>
                                Friend
                            </Button.Content>

                            <Button.Content hidden>
                                Send Request
                            </Button.Content>
                          </Button>
                        </Grid.Column>

                        <Grid.Column width='4'/>
                      </Grid.Row>

                    : null
                  }
                  <Grid.Row>
                    <Segment color='blue' textAlign="center" compact>
                      {this.props.user.bio}
                    </Segment>
                  </Grid.Row>
                </Grid>
              </Grid.Column>

              <Grid.Column width='5'/>

              {this.currentlyReading().length === 0
                ? null
                : <Grid>
                    <Grid.Row/>

                    <Grid.Row>
                      <CurrentlyReadingCarousel
                        books={this.currentlyReading()}
                        pub={true}
                      />
                    </Grid.Row>
                  </Grid>
              }
            </Grid.Row>
            <Grid.Row/>
            <Grid.Row/>
          </Grid>
          
          <br/>

          <Header
            as='h2'
            icon
            style={{color: 'white'}}
            textAlign="center"
          >
            <Icon name='book' circular />
            <Header.Content>
              {this.props.user.username}'s
              Library Books
              ({this.userLibraryBooks().length})
            </Header.Content>
          </Header>
          
          <br/>

          <DashboardLibraryBooks books={this.userLibraryBooks()} pub={true}/>
          
          <br/>

          <Grid>
            <Grid.Row/>
            <Grid.Row/>
            <Grid.Row/>
          </Grid>

          <Header
            as='h2'
            icon
            style={{color: 'white'}}
            textAlign="center"
          >
            <Icon name='book' circular/>
            <Header.Content>
              {this.props.user.username}'s
              WishList Books
              ({this.userWishedBooks().length})
            </Header.Content>
          </Header>
          
          <br/><br/>

          <DashboardWishedBooks
            books={this.userWishedBooks()}
            pub={true}
          />

          <Footer/>
        </div>
      );
    };
  };
};

const mapStateToProps = state => {
  return {
    user: state.showUser,
    auth: state.auth,
    reservedBooks: state.reservedBooks,
    allLibraryBooks: state.allLibraryBooks,
    allWishedBooks: state.allWishedBooks,
    friends: state.friends,
    searchField: state.searchField,
  };
};

export default connect(
  mapStateToProps,
  {
    showUser,
    removeShowUser,
    approveFriendRequest,
  },
)(PublicProfile);