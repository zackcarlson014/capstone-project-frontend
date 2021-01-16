import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardLibraryBookCard from './DashboardLibraryBookCard'
import { Grid, Segment, Pagination } from 'semantic-ui-react'

export class DashboardLibraryBooks extends Component {

    state = { 
        activePage: 1 
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ 
            activePage 
        })
    }

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id === this.props.auth.id)
    }

    libraryBooks = () => {
        return this.props.books.filter(book => book[1].id !== this.props.auth.id)
    }

    count = () => {
        return this.libraryBooks().length / 8
    }

    bookIndex = () => {
        if (this.state.activePage === 1) {
            return this.state.activePage - 1
        }
        return (this.state.activePage - 1) * 8
    }
    
    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column width='1'></Grid.Column>
                    <Grid.Column width='14'>
                        <br/><div className='ui eight centered cards'>
                            {this.libraryBooks().slice(this.bookIndex(), this.bookIndex() + 8).map((book, i) => {
                                if (this.wishedBooks().find(b => b[0].id === book[0].id)) {
                                    return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} match={true}/>
                                } else {
                                    return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]}/>
                                }
                            })}
                        </div>
                    </Grid.Column>
                </Grid>
                <Grid textAlign='center'><Segment compact='true'><Pagination activePage={this.state.activePage} onPageChange={this.handlePaginationChange} totalPages={this.count()}/></Segment></Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        reservedBooks: state.reservedBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(DashboardLibraryBooks)