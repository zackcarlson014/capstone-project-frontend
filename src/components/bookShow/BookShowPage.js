import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showUser, showBook, removeShowBook, addReservedBook, deleteWishBook, bookComments } from '../../actions/index';
import NavBar from '../NavBar';
import UserCarousel from '../carousels/UserCarousel';
import Comments from './Comments';
import Footer from '../Footer';
import { Grid, Segment, Header, Image, Button, Icon, Loader } from 'semantic-ui-react';


export class BookShowPage extends Component {
  state = {
    book: null,
  };

  componentWillMount() {
      const id = this.props.location.pathname.slice(7);
      fetch(`http://localhost:3000/api/v1/books/${id}`)
      .then(resp => resp.json())
      .then(book => {
          const comments = book.comments.filter(c => c[0].book_id === parseInt(id));
          this.props.showBook(book.book, comments);
      }) ;
  };

  componentDidMount() {
      window.scrollTo(0, 0);
  };

  componentWillUnmount() {
      this.props.removeShowBook();
  };

  handleAddReservedBook = (book, libBookId) => {
      const newReservedBook = {
          user_id: this.props.auth.id,
          user_lib_book_id: libBookId,
          delivered: false,
          completed: false
      };
      const reqObj = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify(newReservedBook)
      };
      fetch('http://localhost:3000/api/v1/reserved_books', reqObj)
      .then(resp => resp.json())
      .then(newReservedBook => {
          this.props.addReservedBook(newReservedBook)
      });

      if (this.props.allWishedBooks.find(b => b[0].id === book.id && b[1].id === this.props.auth.id)) {
          const wishBook = this.props.allWishedBooks.find(b => b[0].id === book.id && b[1].id === this.props.auth.id);
          return fetch(`http://localhost:3000/api/v1/user_wish_books/${wishBook[2]}`, {method: 'DELETE'})
          .then(resp => resp.json)
          .then(book => {
              this.props.deleteWishBook(wishBook[2]);
          });
      };
      this.props.history.push('/reserved_books');
  };

  libraryUsers = () => {
      return this.props.allLibraryBooks.filter(b => b[0].id === this.props.book.id && b[1].id !== this.props.auth.id);
  };

  myBook = () => {
      return this.props.allLibraryBooks.find(b => b[0].id === this.props.book.id && b[1].id === this.props.auth.id);
  };

  myReservedBook = () => {
      return this.props.reservedBooks.find(book => (this.libraryUsers().map(b => b[2])).find(i => i === book.user_lib_book_id) && book.user_id === this.props.auth.id);
  };

  render() {
    if (!this.props.book) {
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
            <Grid.Row>
              <Grid.Column width='2' />

              <Grid.Column width='8'>
                <br/>

                <Header as='h1' style={{color: 'white'}}>
                  {this.props.book.title}
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width='2' />
              
              <Grid.Column width='5'>
                <Header as='h3' style={{color: 'white'}}>
                  <strong>
                    {this.props.book.author}
                  </strong>
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width='2'/>
              
              <Grid.Column width='8'>
                <Segment 
                  compact
                  as='a' 
                  onClick={()=> 
                    window.open(this.props.book.previewLink, "_blank")
                  }
                >
                  <Image 
                    src={this.props.book.image} 
                    alt='' 
                    size='medium'
                  />
                </Segment>

                <br/>
              </Grid.Column>

              {this.libraryUsers().length !== 0 
                ? <UserCarousel users={this.libraryUsers()}/>
                : null
              }  
            </Grid.Row>

            {this.myBook()
              ? null
              : <Grid.Row>
                  <Grid.Column width='2' />

                  {this.libraryUsers().length === 0
                    ? null
                    : this.libraryUsers().map((l, i) => {
                      if (this.props.reservedBooks.find(b =>
                        b.user_lib_book_id === l[2])
                        || this.myReservedBook()
                      ) {
                        return null
                      } else {
                        return (
                          <Grid.Column key={i} width='2'>
                            <Button
                              as={ Link }
                              exact='true'
                              to={'/reserved_books'}
                              fluid
                              animated='fade'
                              icon='user'
                              color='green'
                              onClick={() => {this.handleAddReservedBook(l[0], l[2])}}>
                              <Button.Content visible>
                                <Icon name='tag'/>
                              </Button.Content>

                              <Button.Content hidden>
                                Reserve from {l[1].username}
                              </Button.Content>
                            </Button>
                          </Grid.Column>
                        )
                      }
                    })
                  } 
                </Grid.Row>
            }
            <Grid.Row>
              <Grid.Column width='2'/>

              {!this.props.book.description
                ? null
                : <Grid.Column width='12'>
                    <Segment compact>
                      <p>
                        {this.props.book.description}
                      </p>
                    </Segment>
                  </Grid.Column>
              }               
            </Grid.Row>
  
            {!this.props.allComments
              ? null
              : <Grid.Row>
                <Grid.Column width='2'></Grid.Column>
                  <Grid.Column width='12'>
                    <Segment>
                      <Comments
                        book={this.props.book}
                        comments={this.props.allComments}
                      />
                    </Segment>

                    <br/>
                  </Grid.Column>
                </Grid.Row>
            }
          </Grid>

          <Footer/>
        </div>
      );
    };
  };
};


const mapStateToProps = state => {
  return {
    book: state.showBook,
    allLibraryBooks: state.allLibraryBooks,
    allWishedBooks: state.allWishedBooks,
    reservedBooks: state.reservedBooks,
    allComments: state.allComments,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  {
    showUser,
    showBook,
    removeShowBook,
    addReservedBook,
    deleteWishBook,
    bookComments,
  },
)(BookShowPage);