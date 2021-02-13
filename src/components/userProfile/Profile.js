import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar'
import UserCard from './UserCard'
import CurrentlyReadingCarousel from '../carousels/CurrentlyReadingCarousel'
import LibraryBooks from './LibraryBooks'
import WishedBooks from './WishedBooks'
import Footer from '../Footer'
import { Grid, Button, Header, Icon, Loader } from 'semantic-ui-react'


export class Profile extends Component {

    //list of all Library Books, searchField conditional results
    libraryBooks = () => {
        if (this.props.searchField)  {
            return this.props.allLibraryBooks.filter(b => b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()))
        } else {
            return this.props.allLibraryBooks
        }   
    }

    //list of all WishList Books, searchField conditional results
    wishedBooks = () => {
        if (this.props.searchField)  {
            return this.props.allWishedBooks.filter(b => b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()))
        } else {
            return this.props.allWishedBooks
        }   
    }

    //number of my Library Books - prop for UserCard component
    bookCount = () => {
        let books = []
        books = this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id)
        return books.length
    }

    //my reserved books that have been delivered to me - prop for CurrentlyReadingCarousel component
    deliveredBooks = () => {
        const books = this.props.reservedBooks.filter(b => b.user_id === this.props.auth.id && b.delivered === true)
        const libBooks = books.map(b => {
            return this.props.allLibraryBooks.find(book => book[2] === b.user_lib_book_id )
        })
        return libBooks.map(b => b[0])
    }

    render() {
        window.scrollTo(0, 0)
        if (!this.props.auth) {
            return <Grid style={{ height: '99vh' }}><Loader active /></Grid>
         } else {
            return (
                <div className='App'>
                    <NavBar/><br/>
                    <Grid>
                    <Grid.Row></Grid.Row>
                    <Grid.Row>
                        <Grid.Column width='1'></Grid.Column>
                        <Grid.Column width='10'>
                            <UserCard user={this.props.auth} bookCount={this.bookCount()}/><br/><br/>
                        </Grid.Column>
                        {this.deliveredBooks().length !== 0 ?
                            <div>
                                <br/><br/><br/><CurrentlyReadingCarousel books={this.deliveredBooks()}/>
                            </div>
                            :
                            null
                        }  
                        </Grid.Row>
                        <Grid.Row></Grid.Row>
                    </Grid>
                    <Header as='h2' icon style={{color: 'white'}} textAlign="center">
                        <Icon name='book' circular />
                        <Header.Content>
                            Your Library Books
                        </Header.Content>
                    </Header><br/>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <Button as={ Link } exact='true' to={'/user_lib_books/new'} animated='fade' icon='book' color='blue'>
                                    <Button.Content visible>
                                        <Icon name='book'/> +Library
                                    </Button.Content>
                                    <Button.Content hidden>
                                        Search Books
                                    </Button.Content>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row></Grid.Row>
                    </Grid>
                    <LibraryBooks books={this.libraryBooks()}/><br/>
                    <Header as='h2' icon style={{color: 'white'}} textAlign="center">
                        <Icon name='book' circular />
                        <Header.Content>
                            Your WishList Books
                        </Header.Content>
                    </Header><br/>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign="center">
                                <Button as={ Link } exact='true' to={'/user_wish_books/new'} animated='fade' icon='book' color='blue'>
                                    <Button.Content visible>
                                        <Icon name='book'/> +WishList
                                    </Button.Content>
                                    <Button.Content hidden>
                                        Search Books
                                    </Button.Content>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row></Grid.Row>
                    </Grid>
                    <WishedBooks books={this.wishedBooks()}/><br/>
                    <Footer/>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        reservedBooks: state.reservedBooks,
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        searchField: state.searchField
    }
}

export default connect(mapStateToProps, null)(Profile)
