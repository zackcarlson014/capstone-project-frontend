import React, { Component } from 'react'
import { connect } from 'react-redux'
import WishedBookCard from './WishedBookCard.js'

export class WishedBooks extends Component {

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id === this.props.auth.id)
    }

    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id !== this.props.auth.id)
    }


    render() {
        return (
            <div>
                <div className='ui seven centered cards'>
                    {this.wishedBooks().map((wishBook, i) => {
                        if (this.libraryBooks().find(b => b[0].id === wishBook[0].id)) {
                            return <WishedBookCard key={i} book={wishBook[0]} user={wishBook[1]} userBookId={wishBook[2]} match={true}/>
                        } else {
                            return <WishedBookCard key={i} book={wishBook[0]} user={wishBook[1]} userBookId={wishBook[2]}/>
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

export default connect(mapStateToProps, null)(WishedBooks)
