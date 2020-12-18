import React, { Component } from 'react'
import { connect } from 'react-redux'
import WishedBookCard from './WishedBookCard.js'

export class WishedBooks extends Component {

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id === this.props.auth.id)
    }

    render() {
        return (
            <div>
                <div className='ui ten cards'>
                    {this.wishedBooks().map((wishBook, i) => {
                        return <WishedBookCard key={i} book={wishBook[0]} userBookId={wishBook[2]}/>
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

export default connect(mapStateToProps, null)(WishedBooks)
