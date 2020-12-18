import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardWishedBookCard from './DashboardWishedBookCard'

export class DashboardWishedBooks extends Component {

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id !== this.props.auth.id)
    }

    render() {
        return (
            <div>
                <div className='ui ten cards'>
                    {this.wishedBooks().map((book, i) => {
                        return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]}/>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allWishedBooks: state.allWishedBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(DashboardWishedBooks)