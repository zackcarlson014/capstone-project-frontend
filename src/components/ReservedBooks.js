import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showBook } from '../actions/index.js'
import NavBar from './NavBar.js'
import LibraryBookCard from './LibraryBookCard.js'
import DashboardLibraryBookCard from './DashboardLibraryBookCard'
import { Grid, Header, Icon, Button } from 'semantic-ui-react'

export class ReservedBooks extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    reservedBooks = () => {
        return this.props.reservedBooks.filter(b => b.user_id === this.props.auth.id)
    }

    reservedFromMyLibrary = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id && this.props.reservedBooks.find(b => b.user_lib_book_id === book[2]))
    }

    render() {
        return (
            <div className='App'>
                <NavBar />
                <br/><br/><Header as='h2' icon style={{color: 'white'}} textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>Your Reserved Books</Header.Content>
                </Header>
                {this.reservedBooks().length !== 0 ?
                <div>
                    <br/><br/><div className='ui seven centered cards'>
                        {this.props.allLibraryBooks.map((book, i) => {
                            if (this.reservedBooks().find(b => b.user_lib_book_id === book[2])){
                                return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]}/>
                            }
                        })}
                    </div><br/><br/><br/><br/>
                </div>
                :
                <div>
                    <br/><br/><Header as='h3' style={{color: 'white'}} textAlign="center">
                        You do not have any Reserved Books at the moment
                    </Header><br/><br/>
                    <Header as='h3' style={{color: 'white'}} textAlign="center">
                        Search for Books to Reserve
                    </Header><br/>
                    <Grid>
                        <Grid.Column textAlign="center">
                            <Button as={ Link } exact to={`/books`} color='blue'>All Books</Button>
                        </Grid.Column>
                    </Grid><br/><br/>
                </div>
                }
                <br/><br/><Header as='h2' icon style={{color: 'white'}} textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>Books Reserved from Your Library</Header.Content>
                </Header>
                {this.reservedFromMyLibrary().length !== 0 ?
                    <div>
                        <br/><br/><div className='ui seven centered cards'>
                            {this.reservedFromMyLibrary().map((book, i) => {
                                return <LibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]}/>
                            })}
                        </div><br/><br/>
                    </div>
                    :
                    <div>
                    <br/><br/><Header as='h3' style={{color: 'white'}} textAlign="center">
                        You do not have any Reserved Books at the moment
                    </Header><br/><br/>
                    <Header as='h3' style={{color: 'white'}} textAlign="center">
                        Search for Books to Reserve
                    </Header><br/>
                    <Grid>
                        <Grid.Column textAlign="center">
                            <Button color='blue'>All Books</Button>
                        </Grid.Column>
                    </Grid><br/><br/>
                </div>
                }
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
        allLibraryBooks: state.allLibraryBooks,
        reservedBooks: state.reservedBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { showBook })(ReservedBooks)
