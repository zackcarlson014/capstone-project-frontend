import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showBook, addWishBook, deleteReservedBook } from '../actions/index'
import  Carousel  from  'semantic-ui-carousel-react';
import { Grid, Header, Image, Button, Icon } from  'semantic-ui-react'

export class CurrentlyReadingCarousel extends Component {

    handleAddWishedBook = (book) => {
        const newWishedBook = {
            user_id: this.props.auth.id,
            book_id: book.id
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newWishedBook)
        }

        fetch('http://localhost:3000/api/v1/user_wish_books', reqObj)
        .then(resp => resp.json())
        .then(newWishBook => {
            this.props.addWishBook(book, this.props.auth, newWishBook.id)
        })
    }

    handleAddToLibrary = (id) => {
        fetch(`http://localhost:3000/api/v1/reserved_books/${id}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(reservedBook => {
                this.props.deleteReservedBook(reservedBook.id)
            })
    }

    isWishedBook = (b) => {
        return this.props.allWishedBooks.find(book => book[0].id === b.id && book[1].id === this.props.auth.id)
    }
    
    reservedBookId = (b) => {
        const libBook = this.props.allLibraryBooks.find(book => book[1].id === this.props.auth.id && book[0].id === b.id)
        if (libBook) {
            const resBook = this.props.reservedBooks.find(book => book.user_id === this.props.auth.id && book.user_lib_book_id === libBook[2])
            return resBook.id
        }
    }

    findElements = () => {
        return this.props.books.map(b => {
            return {render: () => {
                return (
                    <Grid.Column width='2'>
                        <Header textAlign='center' color='blue'><Icon name='book'/>Currently Reading</Header>
                        <Image as={ Link } exact='true' to={`/books/${b.id}`} src={b.image} alt='' fluid/><br/>
                        <Button.Group widths='2'>
                        <Button as={ Link } exact='true' to={`/books/${b.id}`} fluid animated='fade' icon='eye' color='blue'>
                                <Button.Content visible><Icon name='eye'/></Button.Content>
                                <Button.Content hidden>View</Button.Content>
                        </Button>
                        {!this.props.pub ? 
                            <Button fluid animated='fade' icon='book' color='green' onClick={() => this.handleAddToLibrary(this.reservedBookId(b))}>
                                <Button.Content visible><Icon name='book'/></Button.Content>
                                <Button.Content hidden>+Library</Button.Content>
                            </Button>
                            :
                            null
                        }
                        {this.props.pub && !this.isWishedBook(b) ?
                        <Button fluid animated='fade' icon='book' color='green' onClick={() => this.handleAddWishedBook(b)}>
                                <Button.Content visible><Icon name='book'/></Button.Content>
                                <Button.Content hidden>+WishList</Button.Content>
                        </Button>
                        : 
                        null
                        }
                        </Button.Group>
                        {this.props.books.length !== 1 ? <br/> : null}
                    </Grid.Column>
                );
            }
            }
        })
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Carousel
                    elements  =  {  this.findElements()  }
                    duration  ={this.props.books.length !== 1 ? 10000 : null}
                    animation  ='slide left'
                    showNextPrev  =  {false}
                    showIndicators  = {this.props.books.length !== 1 ? true : false}
                />
            </div>
        )
    
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        reservedBooks: state.reservedBooks
    }
}

export default connect(mapStateToProps, { showBook, addWishBook, deleteReservedBook })(CurrentlyReadingCarousel);