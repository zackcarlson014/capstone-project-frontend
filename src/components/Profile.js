import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { currentUser } from '../actions/auth'
import { Redirect } from 'react-router'
import BookSearch from './BookSearch.js'
import BookList from './BookList.js'
import LibraryBooks from './LibraryBooks.js'
import WishedBooks from './WishedBooks.js'
import NavBar from './NavBar.js'
import UserCard from './UserCard.js'
import request from 'superagent';

export class Profile extends Component {

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
            .then(data => {
                this.setState({ books: [...data.body.items]})
            })
    }

    handleSearch = (e) => {
        this.setState({
            searchField: e.target.value
        })
    }

    render() {
        if (!this.props.auth) {
            return(
                <Redirect to='/login'/>
            )
        }
        return (
            <div>
                <NavBar/>
                <UserCard /><br/><br/><br/>
                <LibraryBooks /><br/><br/><br/>
                <WishedBooks />
                <BookSearch searchBook={this.searchBook} handleSearch={this.handleSearch}/>
                <BookList books={this.state.books} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(Profile)
