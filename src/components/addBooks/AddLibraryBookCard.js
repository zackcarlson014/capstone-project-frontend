import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLibBook } from '../../actions/index';
import {
  Card,
  Image,
  Button,
} from 'semantic-ui-react';

export class AddLibraryBookCard extends Component {
  handleAddLibraryBook = (book) => {
    const newLibraryBook = {
      user_id: this.props.auth.id,
      book_id: book.id,
      original_user_id: this.props.auth.id,
    };

    const reqURL = 'http://localhost:3000/api/v1/user_lib_books';

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newLibraryBook),
    };

    fetch(reqURL, reqObj)
    .then(resp => resp.json())
    .then(data => {
      this.props.addLibBook(
        book, 
        this.props.auth, 
        data.id, 
        this.props.auth.id,
      );
    });
  };

  handleAddBook = (e) => {
    e.preventDefault();

    const newBook = {
      title: this.props.title,
      author: this.props.author[0],
      image: this.props.image,
      published_date: this.props.published,
      description: this.props.description,
      average_rating: this.props.averageRating,
      ratings_count: this.props.ratingsCount,
      preview_link: this.props.previewLink,
      google_id: this.props.googleID,
    };

    const reqURL = 'http://localhost:3000/api/v1/books';

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newBook),
    };

    if (this.props.allLibraryBooks.find(b => 
      b[0].title === this.props.title
      && b[0].author === this.props.author[0]
    )) {
      const matchedBook = this.props.allLibraryBooks.find(b => 
        b[0].title === this.props.title
        && b[0].author === this.props.author[0]
      );

      return this.handleAddLibraryBook(matchedBook[0])
    };

    fetch(reqURL, reqObj)
    .then(resp => resp.json())
    .then(newLibBook => {
      this.handleAddLibraryBook(newLibBook);
    });
  };

  bookMatch = () => {
    return this.props.allLibraryBooks.filter(b => 
      b[1].id === this.props.auth.id
    ).find(b => {
      return b[0].title === this.props.title
        && b[0].author === this.props.author[0]
    })
  }

  render() {
    return (
      <Card color='blue'>
        <Image 
          as='a' 
          src={this.props.image}
          alt=''
          wrapped ui={false} 
          width='300px' 
          height='300px'
          onClick={()=>
            window.open(this.props.link, "_blank")
          } 
        />

        <Card.Content>
            <Card.Header
              as='a'
              onClick={()=> 
                window.open(this.props.link, "_blank")
              }>
              {this.props.title}
            </Card.Header>
            
            <Card.Meta>
              <span className='date'>
                Published in {this.props.published
                  ? this.props.published.split("-")[0]
                  : '???'
                }
              </span>
            </Card.Meta>
            <Card.Description 
              as='a' 
              onClick={this.props.author 
                ? () => this.props.searchAuthor(this.props.author[0]) 
                : null
              }
            >
              By: {this.props.author ? this.props.author[0] : 'unknown'}
            </Card.Description>
        </Card.Content>

        {this.bookMatch()
          ? <Card.Content extra>
                <Button 
                    as={ Link } 
                    exact='true' 
                    to={`/books/${this.bookMatch()[0].id}`} 
                    fluid={true}
                    color='green'
                >
                    View Book
                </Button>
            </Card.Content>
            
          : <Card.Content extra>
                <Button 
                    onClick={this.handleAddBook} 
                    fluid={true}
                    color='blue' 
                >
                    +Library
                </Button>
            </Card.Content>
        }
      </Card>
    );
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    allLibraryBooks: state.allLibraryBooks,
  };
};


export default connect(
  mapStateToProps,
  { 
    addLibBook,
  },
)(AddLibraryBookCard);
