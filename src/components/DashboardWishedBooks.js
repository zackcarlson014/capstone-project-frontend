import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardWishedBookCard from './DashboardWishedBookCard'

export class DashboardWishedBooks extends Component {

    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id)
    }

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id !== this.props.auth.id)
    }

    render() {
        return (
            <div>
                <br/><div className='ui eight centered cards'>
                    {this.wishedBooks().map((book, i) => {
                        if (this.libraryBooks().find(b => b[0].id === book[0].id)) {
                            return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]} match={true}/>
                        } else {
                            return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]}/>
                        }
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allWishedBooks: state.allWishedBooks,
        allLibraryBooks: state.allLibraryBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(DashboardWishedBooks)