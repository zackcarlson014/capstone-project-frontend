import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteLibBook, deleteReservedBook } from '../actions/index'
import { Card, Image, Button, Icon, Header } from 'semantic-ui-react'


export class LibraryBookCard extends Component {

    
    handleRemoveBook = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/v1/user_lib_books/${this.props.userBookId}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(data => {
                this.props.deleteLibBook(data.id)
            })
    }

    handleAddToLibrary = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/v1/reserved_books/${this.myReservedBook().id}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(data => {
                this.props.deleteReservedBook(data.id)
            })
    }

    reservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.userBookId && b.user_id !== this.props.auth.id)
    }

    myReservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.userBookId && b.user_id === this.props.auth.id)
    }

    reservedBookUser = () => {
        if (this.reservedBook()) {
            const book = this.props.allLibraryBooks.find(b => b[1].id === this.reservedBook().user_id) 
            return book[1]
        }
    }

    render() {
        return (
            <Card color='blue'>
                <Image as={ Link } exact='true' to={`/books/${this.props.book.id}`} src={this.props.book.image ? this.props.book.image : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} wrapped ui={false} width='300px' height='300px'/>
                <Card.Content>
                    <Card.Header>{this.props.book.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Published in {this.props.book.published_date ? this.props.book.published_date : 2020}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.book.author}
                    </Card.Description>
                </Card.Content>
                {this.reservedBook() ?
                    <Card.Content extra textAlign="center">
                        <Header as='h5' icon style={{color: 'red'}} textAlign="center">
                            <Icon name='registered' circular />
                            <Header.Content>Reserved by {this.reservedBookUser().username}</Header.Content>
                        </Header>
                    </Card.Content> 
                    :
                    null
                }
                {this.props.match && !this.myReservedBook() && !this.reservedBook() ? 
                    <Card.Content extra textAlign="center">
                        <Header as='h5' icon color='green' textAlign="center">
                            <Icon name='check' circular/>
                            <Header.Content>Match</Header.Content>
                        </Header>
                    </Card.Content> 
                    : 
                    null
                }
                {this.myReservedBook() ?
                    <Card.Content extra textAlign="center">
                        <Header as='h5' icon color='blue' textAlign="center">
                            <Icon name='book' circular/>
                            <Header.Content>Currently Reading</Header.Content>
                        </Header>
                    </Card.Content> 
                    : 
                    null
                }
                {this.reservedBook() ? 
                    <Card.Content extra>
                        <Button fluid as={ Link } exact='true' to={`/reserved_books/${this.reservedBook().id}`} animated='fade' icon='eye' color='blue'>
                            <Button.Content visible><Icon name='eye'/></Button.Content>
                            <Button.Content hidden>View</Button.Content>
                        </Button>
                    </Card.Content>
                    :
                    <Card.Content extra>
                        { this.myReservedBook() ?
                            <Button.Group widths='2'>
                                <Button as={ Link } exact='true' to={`/books/${this.props.book.id}`} animated='fade' icon='eye' color='blue'>
                                    <Button.Content visible><Icon name='eye'/></Button.Content>
                                    <Button.Content hidden>View</Button.Content>
                                </Button>
                                <Button animated='fade' icon='trash alternate outline' color='green' onClick={this.handleAddToLibrary}>
                                    <Button.Content visible><Icon name='book'/></Button.Content>
                                    <Button.Content hidden>+Library</Button.Content>
                                </Button>
                            </Button.Group>
                            :
                            <Button.Group widths='2'>
                                <Button as={ Link } exact='true' to={`/books/${this.props.book.id}`} animated='fade' icon='eye' color='blue'>
                                    <Button.Content visible><Icon name='eye'/></Button.Content>
                                    <Button.Content hidden>View</Button.Content>
                                </Button>
                                <Button animated='fade' icon='trash alternate outline' color='red' onClick={this.handleRemoveBook}>
                                    <Button.Content visible><Icon name='trash alternate outline'/></Button.Content>
                                    <Button.Content hidden>Delete</Button.Content>
                                </Button>
                            </Button.Group>
                         }
                    </Card.Content>    
                }
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        reservedBooks: state.reservedBooks,
        allLibraryBooks: state.allLibraryBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { deleteLibBook, deleteReservedBook })(LibraryBookCard)
