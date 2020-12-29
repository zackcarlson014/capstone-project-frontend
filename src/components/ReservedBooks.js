import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showBook } from '../actions/index.js'
import NavBar from './NavBar.js'
import LibraryBookCard from './LibraryBookCard.js'
import { Header, Icon } from 'semantic-ui-react'

export class ReservedBooks extends Component {


    reservedBooks = () => {
        return this.props.reservedBooks.filter(b => b.user_id === this.props.auth.id)
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
                                return <LibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]}/>
                            }
                        })}
                    </div><br/><br/><br/><br/>
                </div>
                :
                <div>
                    <br/><br/><Header as='h3' style={{color: 'white'}} textAlign="center">
                        Your Do Not Have Any Reserved Books at the Moment
                    </Header>
                    <Header as='h4' style={{color: 'white'}} textAlign="center">
                        Search for Books and Start Adding to Your Collection
                    </Header><br/>
                </div>
                }
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
