import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearSearch } from '../../actions/index';
import NavBar from '../NavBar';
import DashboardLibraryBooks from './DashboardLibraryBooks';
import DashboardWishedBooks from './DashboardWishedBooks';
import Footer from '../Footer';
import { Header, Icon } from 'semantic-ui-react';


export class BooksDashboard extends Component {
  componentWillUnmount() {
    this.props.clearSearch();
  };

  libraryBooks = () => {
    if (this.props.searchField)  {
      const books = this.props.allLibraryBooks.filter(b =>
        b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase())
        || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase())
      );

      if (books.length !== 0)
         return books;
    }
  
    return this.props.allLibraryBooks;
  };

  wishedBooks = () => {
    if (this.props.searchField)  {
      const books = this.props.allWishedBooks.filter(b => 
        b[0].title.toLowerCase().indexOf(this.props.searchField.toLowerCase() !== -1)
        || b[0].author.toLowerCase().indexOf(this.props.searchField.toLowerCase() !== -1)
      );

      if (books.length !== 0)
        return books;
    }
    
    return this.props.allWishedBooks;  
  }

  render() {
    window.scrollTo(0, 0);
    return (
      <div className='App'>
        <NavBar />

        <br/><br/>

        <Header as='h2' icon style={{color: 'white'}} textAlign="center">
          <Icon name='book' circular />
          <Header.Content>
            All Library Books
          </Header.Content>
        </Header>

        {this.props.noMatch 
          ? <Header as='h4'>
              <Icon/>No Matches
            </Header>
          : null
        }

        <DashboardLibraryBooks
          books={this.libraryBooks()}
        />

        <br/><br/><br/>

        <Header as='h2' icon style={{color: 'white'}} textAlign="center">
          <Icon name='book' circular />
          <Header.Content>
            All WishList Books
          </Header.Content>
        </Header>

        <DashboardWishedBooks
          books={this.wishedBooks()}
        />
        
        <br/><br/><br/><br/><br/><br/>
  
        <Footer/>
      </div>
    )
  }
}

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
  { 
    clearSearch,
  },
)(BooksDashboard);