import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import request from 'superagent';
import BookSearch from './BookSearch.js'
import AddLibraryBookList from './AddLibraryBookList.js'
import LibraryBooks from './LibraryBooks.js'
import NavBar from './NavBar.js'
import { Grid, Button, Header, Icon } from 'semantic-ui-react'

export class AddLibraryBookContainer extends Component {

    constructor() {
        super();
        this.state = {
            books: [],
            searchField: ''
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
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

    render() {
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
                <LibraryBooks /><br/>
                <br/><br/><br/><Button as={ Link } to='/profile' color='blue'>Back to Profile</Button><br/><br/><br/>
            </div>
        )
    }
}

export default AddLibraryBookContainer
