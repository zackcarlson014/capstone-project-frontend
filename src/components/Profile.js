import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LibraryBooks from './LibraryBooks.js'
import WishedBooks from './WishedBooks.js'
import NavBar from './NavBar.js'
import UserCard from './UserCard.js'
import { Grid, Button, Header, Icon } from 'semantic-ui-react'


export class Profile extends Component {


    componentDidMount() {
        window.scrollTo(0, 0)

    }

    render() {
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
                    <WishedBooks /><br/><br/><br/><br/>
                    <div className="ui inverted vertical footer segment form-page">
                        <div className="ui container">
                            MyBrary
                        </div>
                    </div>
                </div>
            )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        reservedBooks: state.reservedBooks
    }
}

export default connect(mapStateToProps, null)(Profile)
