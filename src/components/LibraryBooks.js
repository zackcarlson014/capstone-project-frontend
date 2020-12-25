import React, { Component } from 'react'
import { connect } from 'react-redux'
import LibraryBookCard from './LibraryBookCard.js'

export class LibraryBooks extends Component {

    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id)
    }

    render() {
        return (
            <div>
                <div className='ui seven cards'>
                    {this.libraryBooks().map((libBook, i) => {
                        return <LibraryBookCard key={i} book={libBook[0]} user={libBook[1]} userBookId={libBook[2]}/>
                    })}
                </div>
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

export default connect(mapStateToProps, null)(LibraryBooks)
