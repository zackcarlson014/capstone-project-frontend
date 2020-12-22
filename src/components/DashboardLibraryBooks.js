import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardLibraryBookCard from './DashboardLibraryBookCard'

export class DashboardLibraryBooks extends Component {

    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id !== this.props.auth.id)
    }

    render() {
        return (
            <div>
                <div className='ui eight cards'>
                    {this.libraryBooks().map((book, i) => {
                        return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]}/>
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

export default connect(mapStateToProps, null)(DashboardLibraryBooks)