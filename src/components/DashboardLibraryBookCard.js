import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showBook, showReservedBook, addReservedBook, deleteWishBook, showUser } from '../actions/index.js'
import { Card, Image, Button, Icon, Header } from 'semantic-ui-react'

export class DashboardLibraryBookCard extends Component {

    handleAddReservedBook = () => {

        const newReservedBook = {
            user_id: this.props.auth.id,
            user_lib_book_id: this.props.userBookId,
            delivered: false,
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newReservedBook)
        }
        fetch('http://localhost:3000/api/v1/reserved_books', reqObj)
            .then(resp => resp.json())
            .then(newReservedBook => {
                this.props.addReservedBook(newReservedBook)
            })
        
        if (this.props.allWishedBooks.find(b => b[0].id === this.props.book.id && b[1].id === this.props.auth.id)) {
            const wishBook = this.props.allWishedBooks.find(b => b[0].id === this.props.book.id && b[1].id === this.props.auth.id)
            return fetch(`http://localhost:3000/api/v1/user_wish_books/${wishBook[2]}`, {method: 'DELETE'})
            .then(resp => resp.json)
            .then(book => {
                this.props.deleteWishBook(wishBook[2])
            })
        }
    }

    handleBookView = () => {
        this.props.showBook(this.props.book, this.props.user)
    }

    handleReservedBookView = () => {
        this.props.showReservedBook(this.props.book, this.props.user, this.props.userBookId)
    }

    handleUserView = () => {
        this.props.showUser(this.props.user)
    }

    handleReservedUserView = () => {
        this.props.showUser(this.reservedBookUser())
    }

    reservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.userBookId && b.user_id !== this.props.user.id)
    }

    reservedBookUser = () => {
        if (this.reservedBook()) {
            const book = this.props.allLibraryBooks.find(b => b[1].id === this.reservedBook().user_id) 
            return book[1]
        }
    }

    myReservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.userBookId && b.user_id === this.props.auth.id)
    }

    

    render() {
        return (
            <Card color='blue'>
                <Image as={ Link } exact to={`/books/${this.props.book.id}`} onClick={this.handleBookView} src={this.props.book.image ? this.props.book.image : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} wrapped ui={false} width='300px' height='300px'/>
                <Card.Content>
                    <Card.Header>{this.props.book.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Published in {this.props.book.published_date ? this.props.book.published_date : 2020}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.book.author}
                    </Card.Description>
                    {this.reservedBook() ?
                        <Card.Content textAlign="center"><br/> 
                            <Header as='h5' icon color={this.myReservedBook() ? 'green' : 'red'} textAlign="center">
                                <Icon name='registered' circular/>
                                <Header.Content>Reserved by {this.myReservedBook() ? 'Me' : this.reservedBookUser().username}</Header.Content>
                            </Header>
                        </Card.Content> 
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
                <Card.Content extra>
                    <Button.Group widths='2'>
                        {this.props.pub && !this.reservedBook() ? 
                            <Button animated='fade' icon='user' color='green' onClick={this.handleAddReservedBook}>
                                <Button.Content visible><Icon name='tag'/></Button.Content>
                                <Button.Content hidden>Reserve</Button.Content>
                            </Button>
                            :
                            null
                        }
                        {this.reservedBook() && !this.myReservedBook() ?
                            <Button as={ Link } exact to={this.props.pub ? `/users/${this.reservedBookUser().id}` : `/users/${this.props.user.id}`} animated='fade' icon='user' color='green' onClick={this.props.pub ? this.handleReservedUserView : this.handleUserView}>
                                <Button.Content visible><Icon name='user'/></Button.Content>
                                <Button.Content hidden>{this.props.pub ? this.reservedBookUser().username : this.props.user.username}</Button.Content>
                            </Button>
                            :
                            null
                        }
                        {!this.props.pub && !this.reservedBook() ?
                            <Button as={ Link } exact to={`/users/${this.props.user.id}`} animated='fade' icon='user' color='green' onClick={this.handleUserView}>
                                <Button.Content visible><Icon name='user'/></Button.Content>
                                <Button.Content hidden>{this.props.user.username}</Button.Content>
                            </Button>
                            :
                            null
                        }
                        {!this.props.pub && this.myReservedBook() ?
                            <Button as={ Link } exact to={`/users/${this.props.user.id}`} animated='fade' icon='user' color='green' onClick={this.handleUserView}>
                                <Button.Content visible><Icon name='user'/></Button.Content>
                                <Button.Content hidden>{this.props.user.username}</Button.Content>
                            </Button>
                            :
                            null
                        }
                        <Button as={ Link } exact to={this.myReservedBook() ? `/reserved_books/${this.myReservedBook().id}` : `/books/${this.props.book.id}`} animated='fade' icon='eye' color='blue' onClick={this.myReservedBook() ? this.handleReservedBookView : this.handleBookView}>
                            <Button.Content visible><Icon name='eye'/></Button.Content>
                            <Button.Content hidden>View</Button.Content>
                        </Button>
                    </Button.Group>
                </Card.Content>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        reservedBooks: state.reservedBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { showBook, showReservedBook, addReservedBook, deleteWishBook, showUser })(DashboardLibraryBookCard)
