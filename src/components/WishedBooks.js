import React, { Component } from 'react'
import { connect } from 'react-redux'
import WishedBookCard from './WishedBookCard.js'

export class WishedBooks extends Component {
    render() {
        return (
            <div>
                <div className='ui five cards'>
                    {this.props.wishedBooks.map(wishBook => {
                        return <WishedBookCard key={wishBook.id} {...wishBook}/>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        wishedBooks: state.wishedBooks
    }
}

export default connect(mapStateToProps, null)(WishedBooks)
