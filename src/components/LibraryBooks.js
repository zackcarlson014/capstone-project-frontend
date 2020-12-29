import React, { Component } from 'react'
import { connect } from 'react-redux'
import LibraryBookCard from './LibraryBookCard.js'
import { Header } from 'semantic-ui-react'


export class LibraryBooks extends Component {

    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id)
    }

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id !== this.props.auth.id)
    }

    render() {
        return (
            <div>
                {this.libraryBooks().length !== 0 ?
                    <div className='ui seven centered cards'>
                        {this.libraryBooks().map((libBook, i) => {
                            if (this.wishedBooks().find(b => b[0].id === libBook[0].id)) {
                                return <LibraryBookCard key={i} book={libBook[0]} user={libBook[1]} userBookId={libBook[2]} match={true}/>
                            } else {
                                return <LibraryBookCard key={i} book={libBook[0]} user={libBook[1]} userBookId={libBook[2]}/>
                            }
                        })}
                    </div>
                    :
                    <div>
                        <br/><br/><Header as='h3' style={{color: 'white'}} textAlign="center">
                            Your Library Bookshelf is Current Empty
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
        allWishedBooks: state.allWishedBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(LibraryBooks)
