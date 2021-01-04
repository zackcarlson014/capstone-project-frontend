import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import LibraryBooks from './LibraryBooks.js'
import WishedBooks from './WishedBooks.js'
import NavBar from './NavBar.js'
import UserCard from './UserCard.js'
import CurrentlyReadingCarousel from './CurrentlyReadingCarousel.js'
import { Grid, Button, Header, Icon } from 'semantic-ui-react'


export class Profile extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    deliveredBooks = () => {
        const books = this.props.reservedBooks.filter(b => b.user_id === this.props.auth.id && b.delivered === true)
        const libBooks = books.map(b => {
            return this.props.allLibraryBooks.find(book => book[2] === b.user_lib_book_id )
        })
        return libBooks.map(b => b[0])
    }

    render() {
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
                <LibraryBooks /><br/><br/><br/><br/>
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
        reservedBooks: state.reservedBooks,
        allLibraryBooks: state.allLibraryBooks
    }
}

export default connect(mapStateToProps, null)(Profile)
