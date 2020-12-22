import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { currentUser } from '../actions/auth'
// import { Redirect } from 'react-router'
import BookSearch from './BookSearch.js'
import AddLibraryBookList from './AddLibraryBookList.js'
import AddWishedBookList from './AddWishedBookList.js'
import LibraryBooks from './LibraryBooks.js'
import WishedBooks from './WishedBooks.js'
import NavBar from './NavBar.js'
import UserCard from './UserCard.js'
import { Button, Header } from 'semantic-ui-react'
import request from 'superagent';

export class Profile extends Component {

    constructor() {
        super();
        this.state = {
            books: [],
            searchField: '',
            profView: 'default'
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

    handleAddLibraryView = () => {
        this.setState({
            profView: 'addLibrary'
        })
    }

    handleAddWishedView = () => {
        this.setState({
            profView: 'addWished'
        })
    }

    handleDefaultProfView = () => {
        this.setState({
            books: [],
            searchField: '',
            profView: 'default'
        })
    }

    render() {

        if (this.state.profView === 'default') {
            return (
                <div className='App'>
                    <NavBar/>
                    <UserCard /><br/><br/>
                    <Header as='h3'>Your Library Books</Header>
                    <Button color='blue' onClick={this.handleAddLibraryView}>Add Books To Library</Button><br/><br/>
                    <LibraryBooks /><br/><br/>
                    <Header as='h3'>Your Wish List</Header>
                    <Button color='blue' onClick={this.handleAddWishedView}>Add Books To Wish List</Button><br/><br/>
                    <WishedBooks />
                    {/* <BookSearch searchBook={this.searchBook} handleSearch={this.handleSearch}/>
                    <BookList books={this.state.books} /> */}
                </div>
            )
        } else if (this.state.profView === 'addLibrary') {
            return (
                <div className='App'>
                    <NavBar/>
                    <br/><br/><br/><Button color='blue' onClick={this.handleDefaultProfView}>Back to Profile</Button><br/><br/>
                    <Header as='h1'>Search for Library Books</Header>
                    <BookSearch searchBook={this.searchBook} handleSearch={this.handleSearch}/>
                    <AddLibraryBookList books={this.state.books} />
                    <br/><br/><Header as='h1'>Your Library Books</Header>
                    <LibraryBooks /><br/>
                    <br/><br/><br/><Button color='blue' onClick={this.handleDefaultProfView}>Back to Profile</Button><br/><br/>
                </div>
            )
        } else if (this.state.profView === 'addWished') {
            return (
                <div className='App'>
                    <NavBar/>
                    <br/><br/><br/><Button color='blue' onClick={this.handleDefaultProfView}>Back to Profile</Button><br/><br/>
                    <Header  as='h1'>Search for Wish List Books</Header>
                    <BookSearch searchBook={this.searchBook} handleSearch={this.handleSearch}/>
                    <AddWishedBookList books={this.state.books} />
                    <br/><br/><Header  as='h1'>Your Wish List</Header>
                    <WishedBooks /><br/>
                    
                    {/* <BookSearch searchBook={this.searchBook} handleSearch={this.handleSearch}/>
                    <AddWishedBookList books={this.state.books} /> */}
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(Profile)
