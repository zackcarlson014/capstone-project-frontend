import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardWishedBookCard from './DashboardWishedBookCard'

export class DashboardWishedBooks extends Component {
    render() {
        return (
            <div>
                <div className='ui ten cards'>
                    {this.props.allWishedBooks.map((book, i) => {
                        return <DashboardWishedBookCard key={i} {...book}/>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allWishedBooks: state.allWishedBooks
    }
}

export default connect(mapStateToProps, null)(DashboardWishedBooks)