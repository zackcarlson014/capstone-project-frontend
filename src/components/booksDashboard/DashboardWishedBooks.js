import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardWishedBookCard from './DashboardWishedBookCard'
import { Grid, Segment, Pagination } from 'semantic-ui-react'

export class DashboardWishedBooks extends Component {

    state = { 
        activePage: 1 
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ 
            activePage 
        })
    }

    wishedBooks = () => {
        return this.props.books.filter(book => book[1].id !== this.props.auth.id)
    }

    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id)
    }

    indexCount = () => {
        return Math.ceil(this.wishedBooks().length / 8)
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
                    <Grid.Row>
                        <Grid.Column width='1'></Grid.Column>
                        <Grid.Column width='14'>
                            <br/><div className='ui eight centered cards'>
                                {this.wishedBooks().slice(this.bookIndex(), this.bookIndex() + 8).map((book, i) => {
                                    if (this.libraryBooks().find(b => b[0].id === book[0].id)) {
                                        return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} match={this.libraryBooks().find(b => b[0].id === book[0].id)}/>
                                    } else {
                                        return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]}/>
                                    }
                                })}
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Grid textAlign='center'>
                    <Grid.Row>
                        <Segment color='blue' compact='true'>
                            <Pagination 
                                activePage={this.state.activePage} 
                                onPageChange={this.handlePaginationChange} 
                                totalPages={this.indexCount()}
                            />
                        </Segment>
                    </Grid.Row>
                </Grid><br/>
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