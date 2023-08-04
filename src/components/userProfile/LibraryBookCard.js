import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteLibBook, completeReservedBook } from '../../actions/index';
import {
  Card,
  Image,
  Button,
  Icon,
  Header,
  Modal
} from 'semantic-ui-react';

export class LibraryBookCard extends Component {
  state = {
    open: false,
  };

  //toggle state open value to control view of 'delete library book' modal
  setOpen = (bool) => {
    this.setState({
      open: bool,
    });
  };
  
  //delete Library book from back-end and front-end
  handleDeleteLibraryBook = (e) => {
    e.preventDefault();

    const reqURL = `http://localhost:3000/api/v1/user_lib_books/${this.props.userBookId}`;
    
    //make delete reqest to back end with Library book ID passed from WishedBooks props
    fetch(reqURL, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(libraryBook => {
      this.props.deleteLibBook(libraryBook.id);
      this.props.deleteBookIndex();
    });

    this.setOpen(false);
  };

  handleCompleted = () => {
    const reservedBookId = this.currentlyReadingBook().id;

    const completedBook = {
        completed: true
    };

    const reqURL = `http://localhost:3000/api/v1/reserved_books/${reservedBookId}`;

    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(completedBook),
    };

    fetch(reqURL, reqObj)
    .then(resp => resp.json())
    .then(resBook => {
      this.props.completeReservedBook(resBook);
    });
  };

  //determine if Library book is reserved by another User and return Reserved book instance if true
  reservedBook = () => {
    return this.props.reservedBooks.find(b => 
      b.user_lib_book_id === this.props.userBookId 
      && b.user_id !== this.props.auth.id
      && !b.completed
    );
  };

  
  reservedBookUser = () => {
    const book = this.props.allLibraryBooks.find(b => 
      b[1].id === this.reservedBook().user_id
    );

    return book[1];
  };

  //determine if Library book is on Currently Reading list and return Reserved book instance if true
  currentlyReadingBook = () => {
    return this.props.reservedBooks.find(b => 
      b.user_lib_book_id === this.props.userBookId 
      && b.user_id === this.props.auth.id
      && !b.completed
    );
  };

  render() {
    return (
      <Card color='blue'>
        <Image 
          as={ Link } 
          exact='true' 
          to={`/books/${this.props.book.id}`} 
          src={this.props.book.image
            ? this.props.book.image
            : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'
          } 
          wrapped 
          ui={false} 
          width='300px' 
          height='300px'
        />
        <Card.Content>
          <Card.Header
            as={ Link } 
            exact='true' 
            to={`/books/${this.props.book.id}`} 
          >
            {this.props.book.title}
          </Card.Header>

          <Card.Meta>
            <span className='date'>
                Published in
                {this.props.book.published_date
                  ? this.props.book.published_date
                  : 2020
                }
            </span>
          </Card.Meta>
          
          <Card.Description>
            {this.props.book.author}
          </Card.Description>
        </Card.Content>

        {!this.reservedBook()
          ? null
          : <Card.Content extra textAlign="center">
              <Header 
                as='h5' 
                icon={true} 
                style={{color: 'red'}} 
                textAlign="center"
              >
                <Icon name='registered' circular/>
                <Header.Content>
                  Reserved by {this.reservedBookUser().username}
                </Header.Content>
              </Header>
            </Card.Content> 
        }

        {this.props.match
        && !this.currentlyReadingBook()
        && !this.reservedBook()
          ? <Card.Content extra textAlign="center">
              <Header 
                as='h5' 
                icon={true} 
                color='green' 
                textAlign="center"
              >
                <Icon name='check' circular/>
                <Header.Content>
                  Match
                </Header.Content>
              </Header>
            </Card.Content> 
            
          : null
        }

        {!this.currentlyReadingBook()
          ? null
          : <Card.Content extra textAlign="center">
              <Header 
                as='h5' 
                icon={true} 
                color='blue' 
                textAlign="center"
              >
                <Icon name='book' circular/>
                <Header.Content>
                  Currently Reading
                </Header.Content>
              </Header>
            </Card.Content> 
        }

        {this.reservedBook()
          ? <Card.Content extra>
              <Button 
                as={ Link } 
                exact='true' 
                to={`/reserved_books/${this.reservedBook().id}`} 
                fluid 
                animated='fade' 
                icon={true} 
                color='blue'
              >
                <Button.Content visible>
                  <Icon name='eye'/>
                </Button.Content>

                <Button.Content hidden>
                  View
                </Button.Content>
              </Button>
            </Card.Content>
            
          : <Card.Content extra>
              { this.currentlyReadingBook()
                ? <Button.Group widths='2' fluid>
                    <Button 
                      as={ Link } 
                      exact='true' 
                      to={`/books/${this.props.book.id}`} 
                      animated='fade' 
                      icon={true} 
                      color='blue'
                    >
                      <Button.Content visible>
                        <Icon name='eye'/>
                      </Button.Content>

                      <Button.Content hidden>
                        View
                      </Button.Content>
                    </Button>

                    <Button 
                      animated='fade' 
                      icon={true} 
                      color='green' 
                      onClick={this.handleCompleted}
                    >
                      <Button.Content visible>
                        <Icon name='book'/>
                      </Button.Content>

                      <Button.Content hidden>
                        +Library
                      </Button.Content>
                    </Button>
                  </Button.Group>
                
                : <Button.Group widths='2' fluid>
                    <Button 
                      as={ Link } 
                      exact='true' 
                      to={`/books/${this.props.book.id}`} 
                      animated='fade' 
                      icon={true} 
                      color='blue'
                    >
                      <Button.Content visible>
                        <Icon name='eye'/>
                      </Button.Content>
                      <Button.Content hidden>
                        View
                      </Button.Content>
                    </Button>

                    {this.props.originalUser !== this.props.auth.id
                      ? null
                      : <Modal
                          onClose={() => this.setOpen(false)}
                          onOpen={() => this.setOpen(true)}
                          open={this.state.open}
                          trigger={
                            <Button 
                              animated='fade' 
                              icon={true} 
                              color='red'
                            >
                              <Button.Content visible>
                                <Icon name='trash alternate outline'/>
                              </Button.Content>
                              
                              <Button.Content hidden>
                                Delete
                              </Button.Content>
                            </Button>
                          }
                        >
                          <Modal.Header>
                            {this.props.book.title} - {this.props.book.author}
                          </Modal.Header>

                          <Modal.Content image>
                              <Image
                                size='medium'
                                src={this.props.book.image}
                                wrapped
                              />

                              <Modal.Description>
                                  <br/><br/>
                                  <p>
                                      Are you sure you want to remove
                                      {this.props.book.title}
                                      from your Libraray?
                                  </p>

                                  <p>
                                    This book will no longer appear on your profile!
                                  </p>
                              </Modal.Description>
                          </Modal.Content>

                          <Modal.Actions>
                            <Button
                              color='black'
                              onClick={() => this.setOpen(false)}>
                                Not yet
                            </Button>

                            <Button
                              content="Remove"
                              labelPosition='right'
                              icon='checkmark'
                              positive
                              onClick={this.handleDeleteLibraryBook}
                            />
                          </Modal.Actions>
                        </Modal>
                    }
                </Button.Group>
              }
          </Card.Content>    
        }
      </Card>
    );
  };
};

const mapStateToProps = state => {
  return {
    reservedBooks: state.reservedBooks,
    allLibraryBooks: state.allLibraryBooks,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  {
    deleteLibBook,
    completeReservedBook,
  },
)(LibraryBookCard);
