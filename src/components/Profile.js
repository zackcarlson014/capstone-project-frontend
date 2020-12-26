import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import request from 'superagent';
// import BookSearch from './BookSearch.js'
// import AddLibraryBookList from './AddLibraryBookList.js'
// import AddWishedBookList from './AddWishedBookList.js'
import LibraryBooks from './LibraryBooks.js'
import WishedBooks from './WishedBooks.js'
import NavBar from './NavBar.js'
import UserCard from './UserCard.js'
import { Grid, Button, Header, Icon } from 'semantic-ui-react'


export class Profile extends Component {

    // constructor() {
    //     super();
    //     this.state = {
    //         books: [],
    //         searchField: '',
    //         profView: 'default'
    //     }
    // }

    // searchBook = (e) => {
    //     e.preventDefault();
    //     request
    //         .get(`https://www.googleapis.com/books/v1/volumes`)
    //         .query({ q: this.state.searchField})
    //         .query({ maxResults: '16' })
    //         .then(data => {
    //             console.log(data)
    //             this.setState({ books: [...data.body.items]})
    //         })
    // }

    // handleSearch = (e) => {
    //     this.setState({
    //         searchField: e.target.value
    //     })
    // }

    // handleAddLibraryView = () => {
    //     this.setState({
    //         profView: 'addLibrary'
    //     })
    // }

    // handleAddWishedView = () => {
    //     this.setState({
    //         profView: 'addWished'
    //     })
    // }

    // handleDefaultProfView = () => {
    //     this.setState({
    //         books: [],
    //         searchField: '',
    //         profView: 'default'
    //     })
    // }

    render() {
        // if (this.state.profView === 'default') {
            return (
                <div className='App'>
                    <NavBar/>
                    <UserCard /><br/><br/>
                    <Header as='h3' icon style={{color: 'white'}} textAlign="center">
                        <Icon name='book' circular />
                        <Header.Content>Your Library Books</Header.Content>
                    </Header><br/>
                    <Grid>
                        <Grid.Column textAlign="center">
                            <Button as={ Link } to='/user_lib_books/new' color='blue'>Add Books To Library</Button><br/><br/>
                        </Grid.Column>
                    </Grid>
                    <LibraryBooks /><br/><br/>
                    <Header as='h3' icon style={{color: 'white'}} textAlign="center">
                        <Icon name='book' circular />
                        <Header.Content>Your WishList Books</Header.Content>
                    </Header><br/>
                    <Grid>
                        <Grid.Column textAlign="center">
                            <Button  as={ Link } to='/user_wish_books/new' color='blue'>Add Books To Wish List</Button><br/><br/>
                        </Grid.Column>
                    </Grid>
                    <WishedBooks /> 
                </div>
            )
    //     } else if (this.state.profView === 'addLibrary') {
    //         return (
    //             <div className='App'>
    //                 <NavBar/>
    //                 <br/><br/><br/><Button color='blue' onClick={this.handleDefaultProfView}>Back to Profile</Button><br/><br/>
    //                 <Header as='h3' icon style={{color: 'white'}}>
    //                     <Icon name='book' circular />
    //                     <Header.Content>Search Library Books</Header.Content>
    //                 </Header>
    //                 <BookSearch searchBook={this.searchBook} handleSearch={this.handleSearch}/>
    //                 <AddLibraryBookList books={this.state.books} />
    //                 <br/><br/><Header as='h3' icon style={{color: 'white'}}>
    //                     <Icon name='book' circular />
    //                     <Header.Content>Your Library Books</Header.Content>
    //                 </Header>
    //                 <LibraryBooks /><br/>
    //                 <br/><br/><br/><Button color='blue' onClick={this.handleDefaultProfView}>Back to Profile</Button><br/><br/>
    //             </div>
    //         )
    //     } else if (this.state.profView === 'addWished') {
    //         return (
    //             <div className='App'>
    //                 <NavBar/>
    //                 <br/><br/><br/><Button color='blue' onClick={this.handleDefaultProfView}>Back to Profile</Button><br/><br/>
    //                 <Header  as='h1'>Search for Wish List Books</Header>
    //                 <BookSearch searchBook={this.searchBook} handleSearch={this.handleSearch}/>
    //                 <AddWishedBookList books={this.state.books} />
    //                 <br/><br/><Header  as='h1'>Your Wish List</Header>
    //                 <WishedBooks /><br/>
    //             </div>
    //         )
    //     }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(Profile)
