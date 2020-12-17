import React, { Component } from 'react'
import { connect } from 'react-redux'
import LibraryBookCard from './LibraryBookCard.js'

export class LibraryBooks extends Component {
    render() {
        return (
            <div>
                <div className='ui eight cards'>
                    {this.props.libraryBooks.map(libBook => {
                        return <LibraryBookCard key={libBook.id} {...libBook}/>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        libraryBooks: state.libraryBooks
    }
}

export default connect(mapStateToProps, null)(LibraryBooks)
