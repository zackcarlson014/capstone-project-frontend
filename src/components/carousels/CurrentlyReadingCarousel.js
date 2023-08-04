import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { showBook, addWishBook, completeReservedBook } from '../../actions/index';
import Carousel from 'semantic-ui-carousel-react';
import { Grid, Header, Image, Button, Icon } from  'semantic-ui-react';

export class CurrentlyReadingCarousel extends Component {
  handleAddWishedBook = (book) => {
    const newWishedBook = {
      user_id: this.props.auth.id,
      book_id: book.id,
    };

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newWishedBook),
    };

    fetch('http://localhost:3000/api/v1/user_wish_books', reqObj)
    .then(resp => resp.json())
    .then(newWishBook => {
      this.props.addWishBook(
        book,
        this.props.auth,
        newWishBook.id
      );
    });
  };

  handleCompleted = (resBookId) => {
    const reservedBookId = resBookId;

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

  isWishedBook = (b) => {
    return this.props.allWishedBooks.find(book =>
      book[0].id === b.id
      && book[1].id === this.props.auth.id
    );
  };
  
  reservedBookId = (b) => {
    const libBook = this.props.allLibraryBooks.find(book => 
      book[0].id === b.id
    );

    if (libBook) {
      const resBook = this.props.reservedBooks.find(book => 
        book.user_id === this.props.auth.id 
        && book.user_lib_book_id === libBook[2]
      );

      return resBook.id;
    };
  };

  findElements = () => {
    return this.props.books.map(b => {
      return {render: () => {
        return (
          <Grid.Column width='2'>
            <Header 
              textAlign='center' 
              color='blue'
            >
              <Icon name='book'/>
              Currently Reading
            </Header>

            <Image 
              as={ Link } 
              exact='true' 
              to={`/books/${b.id}`} 
              src={b.image} 
              alt='' 
              fluid
            />
            
            <br/>

            <Button.Group widths='2'>
              <Button 
                as={ Link } 
                exact='true' 
                to={`/books/${b.id}`} 
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

              {this.props.pub 
                ? null
                : <Button 
                    fluid 
                    animated='fade' 
                    icon={true} 
                    color='green' 
                    onClick={() =>
                      this.handleCompleted(this.reservedBookId(b))
                    }
                  >
                    <Button.Content visible>
                      <Icon name='book'/>
                    </Button.Content>

                    <Button.Content hidden>
                      +Library
                    </Button.Content>
                  </Button>
              }

              {this.props.pub && !this.isWishedBook(b)
                ? <Button 
                    fluid 
                    animated='fade' 
                    icon={true} 
                    color='green' 
                    onClick={() => this.handleAddWishedBook(b)}
                  >
                    <Button.Content visible>
                      <Icon name='book'/>
                    </Button.Content>

                    <Button.Content hidden>
                      +WishList
                    </Button.Content>
                  </Button>
                
                : null
              }

            </Button.Group>

            {this.props.books.length !== 1
              ? <br/> 
              : null
            }
          </Grid.Column>
        );
      }};
    });
  };

  render() {
    // if (this.reservedBookId)
    return (
      <div style={{textAlign: 'center'}}>
        <Carousel
          elements={this.findElements()}
          duration ={this.props.books.length !== 1
            ? 10000 
            : undefined
          }
          animation='slide left'
          showNextPrev={false}
          showIndicators={this.props.books.length !== 1
            ? true 
            : undefined
          }
        />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    allLibraryBooks: state.allLibraryBooks,
    allWishedBooks: state.allWishedBooks,
    reservedBooks: state.reservedBooks,
  };
};

export default connect(
  mapStateToProps,
  {
    showBook,
    addWishBook,
    completeReservedBook,
  },
)(CurrentlyReadingCarousel);