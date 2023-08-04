import React, { Component } from 'react';
import { deleteWishBook } from '../../actions/index';
import { Card, Image, Button, Icon, Header, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class WishedBookCard extends Component {
  state = {
    open: false,
  };

  //toggle state open value to control view of 'delete wish list book' modal
  setOpen = (bool) => {
    this.setState({
      open: bool,
    });
  };

  //delete Wish List book from back-end and front-end
  handleDeleteWishedBook = (e) => {
    e.preventDefault();
    const reqURL =
      `http://localhost:3000/api/v1/user_wish_books/${this.props.userBookId}`;

    //make delete reqest to back end with Wish List book ID passed from WishedBooks props
    fetch(reqURL, {method: 'DELETE'})
      .then(resp => resp.json())
      .then(wishBook => {
        this.props.deleteWishBook(wishBook.id);
        this.props.deleteBookIndex();
      });
  
    this.setOpen(false);
  };

  
  reservedBook = () => {
    return this.props.reservedBooks.find(b => 
      b.user_lib_book_id === this.props.match[0][2]
    );
  };

  reservedBookPlaceholderSrc = () => {
    return 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png';
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
            : this.reservedBookPlaceholderSrc()
          } 
          wrapped={true} 
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
              Published in {this.props.book.published_date
                ? this.props.book.published_date 
                : 2020
              }
            </span>
          </Card.Meta>

          <Card.Description>
            {this.props.book.author}
          </Card.Description>
        </Card.Content>

        {this.props.match && !this.reservedBook() 
          ? <Card.Content extra textAlign="center">
              <Header 
                as='h5' 
                icon={true}
                color='green' 
                textAlign='center'
              >
                <Icon name='check' circular/>
                <Header.Content>
                  Match
                </Header.Content>
              </Header>
            </Card.Content> 
    
          : null
        }

        <Card.Content extra>
          <Button.Group widths='2'>
            <Button 
              as={ Link } 
              exact='true' 
              to={`/books/${this.props.book.id}`} 
              animated='fade' 
              color='blue'
            >
              <Button.Content visible>
                <Icon name='eye'/>
              </Button.Content>

              <Button.Content hidden>
                View
              </Button.Content>
            </Button>

            <Modal
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
                  src={this.props.book.image}
                  size='medium'
                  wrapped
                />

                <Modal.Description>
                  <br/><br/>
                  <p>
                    Are you sure you want to remove
                    {this.props.book.title}
                    from your WishList?
                  </p>

                  <p>
                    This book will no longer appear on your profile!
                  </p>
                </Modal.Description>
              </Modal.Content>

              <Modal.Actions>
                  <Button
                    color='black'
                    onClick={() => this.setOpen(false)}
                  >
                    Not yet
                  </Button>

                  <Button
                    content="Remove"
                    labelPosition='right'
                    icon='checkmark'
                    positive
                    onClick={this.handleDeleteWishedBook}
                  />
              </Modal.Actions>
            </Modal>
          </Button.Group>
        </Card.Content>
      </Card>
    );
  };
};

const mapStateToProps = state => {
  return {
    reservedBooks: state.reservedBooks,
  };
};

export default connect(
  mapStateToProps,
  {
    deleteWishBook,
  },
)(WishedBookCard);
