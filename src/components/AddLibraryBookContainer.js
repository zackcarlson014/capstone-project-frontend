import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import BookSearch from './BookSearch'
import AddLibraryBookList from './AddLibraryBookList'
import LibraryBooks from './LibraryBooks'
import Footer from './Footer'
import request from 'superagent';
import { Grid, Button, Header, Icon } from 'semantic-ui-react'

export class AddLibraryBookContainer extends Component {

    constructor() {
        super();
        this.state = {
            books: [],
            searchField: ''
        }
    }

    searchBook = (e) => {
        e.preventDefault();
        request
            .get(`https://www.googleapis.com/books/v1/volumes`)
            .query({ q: this.state.searchField})
            .query({ maxResults: '16' })
            .then(data => {
                console.log(data)
                this.setState({ books: [...data.body.items]})
            })
    }

    handleSearch = (e) => {
        this.setState({
            searchField: e.target.value
        })
    }

    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id)
    }

    render() {
        window.scrollTo(0, 0)
        return (
            <div className='App'>
                <NavBar/>
                <br/><br/><br/><Button as={ Link } to='/profile' color='blue'>Back to Profile</Button><br/><br/>
                <Header as='h3' icon style={{color: 'white'}} textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>Search Library Books</Header.Content>
                </Header>
                <Grid>
                    <Grid.Column textAlign="center">
                        <BookSearch searchBook={this.searchBook} handleSearch={this.handleSearch}/>
                    </Grid.Column>
                </Grid>
                <AddLibraryBookList books={this.state.books} />
                <br/><br/><Header as='h3' icon style={{color: 'white'}} textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>Your Library Books</Header.Content>
                </Header><br/><br/>
                <LibraryBooks books={this.libraryBooks()}/><br/>
                <br/><br/><br/><Button as={ Link } to='/profile' color='blue'>Back to Profile</Button><br/><br/><br/>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allLibraryBooks: state.allLibraryBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(AddLibraryBookContainer)
