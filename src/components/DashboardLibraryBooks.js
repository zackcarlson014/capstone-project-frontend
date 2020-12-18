import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardLibraryBookCard from './DashboardLibraryBookCard'

export class DashboardLibraryBooks extends Component {
    render() {
        return (
            <div>
                <div className='ui ten cards'>
                    {this.props.allLibraryBooks.map((book, i) => {
                        return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]}/>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allLibraryBooks: state.allLibraryBooks
    }
}

export default connect(mapStateToProps, null)(DashboardLibraryBooks)