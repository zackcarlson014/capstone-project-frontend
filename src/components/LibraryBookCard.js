import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteLibBook, showBook } from '../actions/index.js'
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

    handleCardClick = () => {
        this.props.showBook(this.props.book, this.props.user)
    }

    reservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.userBookId)
    }

    myReservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.userBookId && b.user_id === this.props.auth.id) ? true : false
    }

    render() {
        return (
            <Card color='blue'>
                <Image as={ Link } exact to={`/books/${this.props.book.id}`} onClick={this.handleCardClick} src={this.props.book.image ? this.props.book.image : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} wrapped ui={false} width='300px' height='300px'/>
                <Card.Content>
                    <Card.Header>{this.props.book.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Published in {this.props.book.published_date ? this.props.book.published_date : 2020}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.book.author}
                    </Card.Description>
                    {this.reservedBook() ? 
                    <Header as='h5' icon style={{color: 'red'}} textAlign="center">
                        <Icon name='registered' circular />
                        <Header.Content>Reserved</Header.Content>
                    </Header>
                    :
                    null
                    }
                    {this.props.match && !this.reservedBook() ? 
                        <Card.Content textAlign="center"><br/>
                            <Header as='h5' icon color='green' textAlign="center">
                                <Icon name='check' circular/>
                                <Header.Content>Match</Header.Content>
                            </Header>
                        </Card.Content> 
                        : 
                        null
                    }
                </Card.Content>
                {this.reservedBook() ? 
                    <Card.Content extra>
                        <Button fluid as={ Link } exact to={this.myReservedBook() ? `/reserved_books/${this.reservedBook().id}` : `/books/${this.props.book.id}`} animated='fade' icon='eye' color='blue' onClick={this.handleCardClick}>
                            <Button.Content visible><Icon name='eye'/></Button.Content>
                            <Button.Content hidden>View</Button.Content>
                        </Button>
                    </Card.Content>
                    :
                    <Card.Content extra>
                        <Button.Group widths='2'>
                            <Button as={ Link } exact to={`/books/${this.props.book.id}`} animated='fade' icon='eye' color='blue' onClick={this.handleCardClick}>
                                <Button.Content visible><Icon name='eye'/></Button.Content>
                                <Button.Content hidden>View</Button.Content>
                            </Button>
                            <Button animated='fade' icon='trash alternate outline' color='red' onClick={this.handleRemoveBook}>
                                <Button.Content visible><Icon name='trash alternate outline'/></Button.Content>
                                <Button.Content hidden>Delete</Button.Content>
                            </Button>
                        </Button.Group>
                    </Card.Content>    
                }
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        reservedBooks: state.reservedBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { deleteLibBook, showBook })(LibraryBookCard)
