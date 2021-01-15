import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import UserCard from './UserCard'
import CurrentlyReadingCarousel from './CurrentlyReadingCarousel'
import LibraryBooks from './LibraryBooks'
import WishedBooks from './WishedBooks'
import Footer from './Footer'
import { Grid, Button, Header, Icon } from 'semantic-ui-react'


export class Profile extends Component {

    libraryBooks = () => {
        if (this.props.searchField)  {
            return this.props.allLibraryBooks.filter(b => b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()))
        } else {
            return this.props.allLibraryBooks
        }   
    }

    wishedBooks = () => {
        if (this.props.searchField)  {
            return this.props.allWishedBooks.filter(b => b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()))
        } else {
            return this.props.allWishedBooks
        }   
    }

    deliveredBooks = () => {
        const books = this.props.reservedBooks.filter(b => b.user_id === this.props.auth.id && b.delivered === true)
        const libBooks = books.map(b => {
            return this.props.allLibraryBooks.find(book => book[2] === b.user_lib_book_id )
        })
        return libBooks.map(b => b[0])
    }

    render() {
        window.scrollTo(0, 0)
        return (
            <div className='App'>
                <NavBar/>
                <br/><br/><Grid>
                <Grid.Row>
                    <Grid.Column width='1'></Grid.Column>
                    <Grid.Column width='10'><UserCard /><br/><br/></Grid.Column>
                    {this.deliveredBooks().length !== 0 ?
                        <div><br/><br/><br/><CurrentlyReadingCarousel books={this.deliveredBooks()}/></div>
                        :
                        null
                    }  
                    </Grid.Row>
                </Grid>
                <Header as='h3' icon style={{color: 'white'}} textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>Your Library Books</Header.Content>
                </Header><br/>
                <Grid>
                    <Grid.Column textAlign="center">
                        <Button as={ Link } to='/user_lib_books/new' color='blue'>Add Books To Library</Button><br/><br/>
                    </Grid.Column>
                </Grid>
                <LibraryBooks books={this.libraryBooks()}/><br/><br/><br/><br/>
                <Header as='h3' icon style={{color: 'white'}} textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>Your WishList Books</Header.Content>
                </Header><br/>
                <Grid>
                    <Grid.Column textAlign="center">
                        <Button  as={ Link } to='/user_wish_books/new' color='blue'>Add Books To Wish List</Button><br/><br/>
                    </Grid.Column>
                </Grid>
                <WishedBooks books={this.wishedBooks()}/><br/><br/><br/><br/>
                <Footer/>
            </div>
        )
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
