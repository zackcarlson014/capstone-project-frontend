import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddWishedBookCard from './AddWishedBookCard';
import { Grid, Header, Icon } from 'semantic-ui-react';

export class AddWishedBookList extends Component {
  render() {
    if (this.props.books.length !== 0) {
      return (
        <div>
          {this.props.books.length === 0 
            ? null
            : <div>
                <br/>
                <Header as='h3' style={{color: 'white'}} textAlign="center">
                  <Icon name='book'/>
                  Add WishList Books Below...
                </Header>
              </div>
          }
        
          <br/>

          <Grid>
            <Grid.Column width='1'></Grid.Column>
            <Grid.Column width='14'>
              <div className='ui eight cards'>
                {this.props.books.map((b, i) => {
                  if (this.props.allWishedBooks.find(book => 
                    book[0].title === b.volumeInfo.title 
                    && book[1].id === this.props.auth.id
                  )) {
                    return <AddWishedBookCard 
                      key={i} 
                      searchAuthor={this.props.searchAuthor} 
                      image={b.volumeInfo.imageLinks
                        ? b.volumeInfo.imageLinks.thumbnail 
                        : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'
                      } 
                      title={b.volumeInfo.title} 
                      author={b.volumeInfo.authors} 
                      published={b.volumeInfo.publishedDate} 
                      description={b.volumeInfo.description} 
                      averageRating={b.volumeInfo.averageRating} 
                      ratingsCount={b.volumeInfo.ratingsCount} 
                      previewLink={b.volumeInfo.previewLink} 
                      googleID={b.id} 
                      match={this.props.allWishedBooks.find(book => 
                        book[0].title === b.volumeInfo.title 
                        && book[1].id === this.props.auth.id
                      )}
                    />
                  } else {
                    return <AddWishedBookCard 
                      key={i} 
                      searchAuthor={this.props.searchAuthor} 
                      image={b.volumeInfo.imageLinks
                        ? b.volumeInfo.imageLinks.thumbnail 
                        : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'
                      } 
                      title={b.volumeInfo.title} 
                      author={b.volumeInfo.authors} 
                      published={b.volumeInfo.publishedDate} 
                      description={b.volumeInfo.description} 
                      averageRating={b.volumeInfo.averageRating} 
                      ratingsCount={b.volumeInfo.ratingsCount} 
                      previewLink={b.volumeInfo.previewLink} 
                      googleID={b.id}
                    />
                  }     
                })}
              </div>
            </Grid.Column>
          </Grid>

          <br/>
        </div>
      );
    } else {
      return null;
    }
  };
};

const mapStateToProps = state => {
  return {
    allWishedBooks: state.allWishedBooks,
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  null,
)(AddWishedBookList);