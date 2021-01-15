import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showUser, showBook, removeShowBook, addReservedBook, deleteWishBook, bookComments } from '../actions/index.js'
import NavBar from './NavBar.js'
import Comments from './Comments.js'
import UserCarousel from './UserCarousel.js'
import { Grid, Segment, Header, Image, Button, Icon, Loader } from 'semantic-ui-react'


export class BookShowPage extends Component {

    state = {
        book: null
    }

    componentWillMount() {
        const id = this.props.location.pathname.slice(7)

        fetch(`http://localhost:3000/api/v1/books/${id}`)
        .then(resp => resp.json())
        .then(book => {
            const comments = book.comments.filter(c => c[0].book_id === parseInt(id))
            this.props.showBook(book.book, comments)
        }) 
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentWillUnmount() {
        this.props.removeShowBook()
    }

    handleAddReservedBook = (book, libBookId) => {

        const newReservedBook = {
            user_id: this.props.auth.id,
            user_lib_book_id: libBookId,
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
        
        if (this.props.allWishedBooks.find(b => b[0].id === book.id && b[1].id === this.props.auth.id)) {
            const wishBook = this.props.allWishedBooks.find(b => b[0].id === book.id && b[1].id === this.props.auth.id)
            return fetch(`http://localhost:3000/api/v1/user_wish_books/${wishBook[2]}`, {method: 'DELETE'})
            .then(resp => resp.json)
            .then(book => {
                this.props.deleteWishBook(wishBook[2])
            })
        }

        this.props.history.push('/reserved_books')
    }

    libraryUsers = () => {
        return this.props.allLibraryBooks.filter(b => b[0].id === this.props.book.id && b[1].id !== this.props.auth.id)
    }

    myBook = () => {
        return this.props.allLibraryBooks.find(b => b[0].id === this.props.book.id && b[1].id === this.props.auth.id)
    }

    myReservedBook = () => {
       return this.props.reservedBooks.find(book => (this.libraryUsers().map(b => b[2])).find(i => i === book.user_lib_book_id) && book.user_id === this.props.auth.id)
    }

    render() {
        if (!this.props.book) {
            return <Grid style={{ height: '99vh' }}><Loader active /></Grid>
        } else {
            return (
                <div className='App'>
                    <NavBar/>
                    <br/><Grid>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='8'><br/><Header as='h1' style={{color: 'white'}}>{this.props.book.title}</Header></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='5'><Header as='h3' style={{color: 'white'}}><strong>{this.props.book.author}</strong></Header></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='6'><Segment compact><Image src={this.props.book.image} alt='' width='245px' height='350px'/></Segment><br/></Grid.Column>
                            {this.libraryUsers().length !== 0 ?
                                <UserCarousel users={this.libraryUsers()}/>
                                :
                                null
                            }  
                        </Grid.Row>
                        {this.myBook() ?
                            null
                            :
                            <Grid.Row>
                                <Grid.Column width='2'></Grid.Column>
                                {this.libraryUsers().length !== 0 ?
                                    this.libraryUsers().map(l => {
                                        if (this.props.reservedBooks.find(b => b.user_lib_book_id === l[2]) || this.myReservedBook()) {
                                            return null
                                        } else {
                                            return (
                                                <Grid.Column width='2'>
                                                    <Button as={ Link } exact to={'/reserved_books'} fluid onClick={() => {this.handleAddReservedBook(l[0], l[2])}} animated='fade' icon='user' color='green' >
                                                        <Button.Content visible><Icon name='tag'/></Button.Content>
                                                        <Button.Content hidden>Reserve from {l[1].username}</Button.Content>
                                                    </Button>
                                                </Grid.Column>
                                            )
                                        }
                                    })
                                    :
                                    null
                                } 
                            </Grid.Row>
                        }
                        <Grid.Row>
                        <Grid.Column width='2'></Grid.Column>
                            {this.props.book.description ? 
                                <Grid.Column width='12'>
                                    <Segment compact>
                                            <p>{this.props.book.description}</p>
                                    </Segment>
                                </Grid.Column>
                                :
                                null
                            }               
                        </Grid.Row>
                        {this.props.allComments ?
                            <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                                <Grid.Column width='12'>
                                    <Segment>
                                        <Comments book={this.props.book} comments={this.props.allComments}/>
                                    </Segment><br/>
                                </Grid.Column>
                            </Grid.Row>
                            :
                            null
                        }
                    </Grid>
                    <div className="ui inverted vertical footer segment form-page">
                        <div className="ui container">
                            MyBrary
                        </div>
                    </div>
                </div>
            )
        }
    }
}


const mapStateToProps = state => {
    return {
        book: state.showBook,
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        reservedBooks: state.reservedBooks,
        allComments: state.allComments,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { showUser, showBook, removeShowBook, addReservedBook, deleteWishBook, bookComments })(BookShowPage)