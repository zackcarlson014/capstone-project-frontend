import React, { Component } from 'react';
import { connect } from 'react-redux';
import LibraryBookCard from './LibraryBookCard';
import {
  Grid,
  Header,
  Icon,
  Segment,
  Pagination,
} from 'semantic-ui-react';

export class LibraryBooks extends Component {
  state = { 
    activePage: 1,
  };

  //matching serach returns initial activePage state value
  componentDidMount() {
    this.setState({ 
      activePage: 1,
    });
  }

  //set state's activePage to integer of page clicked
  handlePaginationChange = (
    e, 
    { activePage }
  ) => {
    this.setState({ 
        activePage,
    });
  };

  //index of myLibraryBooks return array that slice should intiate for pagination view
  bookIndex = () => {
    if (this.state.activePage === 1) {
        return this.state.activePage - 1;
    };

    return (this.state.activePage - 1) * 8;
  };

  //remove page if deleted book last on page
  deleteBookIndex = () => {
    const updatedPage = this.state.activePage - 1;

    if (
      (this.myLibraryBooks().length / 8) < this.state.activePage
      && this.state.activePage > 1
    ) {
      this.setState({
        activePage: updatedPage,
      });
    };
  };

  //amount of page buttons that should appear on pagination component
  paginationCount = () => {
    return Math.ceil(
      this.myLibraryBooks().length / 8
    );
  };

  //all Library books that belong to current user
  myLibraryBooks = () => {
    let myBooks = this.props.allLibraryBooks.filter(book => 
      book[1].id === this.props.auth.id
    );

    if (this.props.searchField)  {
        const lowerCaseInput = this.props.searchField.toLowerCase();

        const searchBooks = myBooks.filter(b => 
          b[0].title.toLowerCase().includes(lowerCaseInput) 
          || b[0].author.toLowerCase().includes(lowerCaseInput)
        );

        if (searchBooks.length !== 0)
          return searchBooks
    }
    
    return myBooks; 
  };

  //all Wish List books that belong to users other than current user
  wishedBooks = () => {
    return this.props.allWishedBooks.filter(book => 
      book[1].id !== this.props.auth.id
    );
  };

  render() {
    return (
      <div>
        {this.myLibraryBooks().length !== 0
          ? <Grid>
              <Grid.Row>
                <Grid.Column width='1'/>
                
                <Grid.Column width='14'>
                  <div className='ui eight centered cards'>
                    {this.myLibraryBooks().slice(
                      this.bookIndex(),
                      this.bookIndex() + 8
                    ).map((libBook, i) => {
                      if (this.wishedBooks().find(b => 
                        b[0].id === libBook[0].id
                      )) {
                        return (
                          <LibraryBookCard 
                            key={i} 
                            book={libBook[0]} 
                            user={libBook[1]} 
                            userBookId={libBook[2]} 
                            originalUser={libBook[3]} 
                            deleteBookIndex={this.deleteBookIndex} 
                            match={true}
                          />
                        );
                      } else {
                        return (
                          <LibraryBookCard 
                            key={i} 
                            book={libBook[0]} 
                            user={libBook[1]} 
                            userBookId={libBook[2]} 
                            originalUser={libBook[3]} 
                            deleteBookIndex={this.deleteBookIndex}
                          />
                        );
                      };
                    })}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            
          : <Grid textAlign='centered'>
            <Grid.Row>
              <Segment compact={true}>
                <Header as='h3' style={{color: 'red'}}>
                  {this.props.searchField
                    ? "No Books Match Your Search"
                    : "Your Library Bookshelf is Current Empty"
                  }
                </Header>
              </Segment>
            </Grid.Row>

            {this.props.searchField
              ? null 
              : <Grid.Row>
                  <Header
                    as='h4'
                    style={{color: 'white'}}
                    textAlign="center"
                  >
                    <Icon name='heart'/>
                    Search for Books You'd Like to Donate
                  </Header>
                </Grid.Row>
            }
          </Grid>
        }
        <Grid textAlign='center'>
            <Grid.Row>
              <Segment color='blue' compact={true}>
                <Pagination 
                  color='blue' 
                  activePage={this.state.activePage} 
                  totalPages={this.paginationCount()}
                  onPageChange={this.handlePaginationChange} 
                />
              </Segment>
            </Grid.Row>

            <Grid.Row/>
            <Grid.Row/>
        </Grid>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    allLibraryBooks: state.allLibraryBooks,
    allWishedBooks: state.allWishedBooks,
    searchField: state.searchField,
  };
};

export default connect(
  mapStateToProps,
  null,
)(LibraryBooks);
