import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import BookSearch from './BookSearch';
import AddLibraryBookList from './AddLibraryBookList';
import LibraryBooks from '../userProfile/LibraryBooks';
import Footer from '../Footer';
import request from 'superagent';
import {
  Grid,
  Button,
  Header,
  Icon,
  Loader,
} from 'semantic-ui-react';

export class AddLibraryBookContainer extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
      searchField: '',
    };

    this.bookSearch2 = React.createRef();
  };

    //request books from Google Books API based on searchField parameters
  searchBook = (e) => {
    e.preventDefault();

    request
      .get(`https://www.googleapis.com/books/v1/volumes`)
      .query({ q: this.state.searchField})
      .query({ maxResults: '24' })
      .then(data => {
        this.setState({ 
          books: [...data.body.items],
        });
      });
  };

  //update state based on user input
  handleSearch = (e) => {
    this.setState({
      searchField: e.target.value,
    });
  };

  searchAuthor = (author) => {
    this.setState({
      searchField: author,
    });
    // this.bookSearch.current.getWrappedInstance().submit();
  };

  //list of Current User's Library books ({book, user, id})
  myLibraryBooks = () => {
    return this.props.allLibraryBooks.filter(book =>
      book[1].id === this.props.auth.id
    );
  };

  render() {
    window.scrollTo(0, 0);

    if (!this.props.auth) {
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

          <Grid textAlign="center" style={{ minHeight: '99vh' }}>
            <Grid.Row/>
            <Grid.Row/>

            <Grid.Row>
              <Grid.Column width='1'/>

              <Grid.Column width='2'>
                <Button
                  as={ Link }
                  to='/profile'
                  color='blue'
                >
                  Back to Profile
                </Button>
              </Grid.Column>

              <Grid.Column width='13'/>
            </Grid.Row>

            <Grid.Row/>

            <Grid.Row>
              <Header
                as='h3'
                icon
                style={{color: 'white'}}
                textAlign="center"
              >
                <Icon name='book' circular />
                <Header.Content>
                  Search Library Books
                </Header.Content>
              </Header>
            </Grid.Row>

            <Grid.Row>
              <BookSearch 
                key={1}
                ref={this.bookSearch2} 
                searchField={this.state.searchField} 
                searchBook={this.searchBook} 
                handleSearch={this.handleSearch}
              />
            </Grid.Row>

            <Grid.Row>
              <AddLibraryBookList 
                key={2}
                books={this.state.books} 
                searchAuthor={this.searchAuthor}
              />
            </Grid.Row>

            <Grid.Row>
              <Header
                as='h3'
                icon
                style={{color: 'white'}}
                textAlign="center"
              >
                <Icon name='book' circular />
                <Header.Content>
                  Your Library Books
                </Header.Content>
              </Header>
            </Grid.Row>
          </Grid>

          <LibraryBooks
            key={3} 
            books={this.myLibraryBooks()}
          />
          
          <br/> 

          <Footer/>
        </div>
      );
    };
  };
};

const mapStateToProps = state => {
  return {
    allLibraryBooks: state.allLibraryBooks,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  null,
)(AddLibraryBookContainer);
