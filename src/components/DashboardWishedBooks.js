import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardWishedBookCard from './DashboardWishedBookCard'
import { Grid } from 'semantic-ui-react'

export class DashboardWishedBooks extends Component {

    wishedBooks = () => {
        return this.props.books.filter(book => book[1].id !== this.props.auth.id)
    }

    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id)
    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column width='1'></Grid.Column>
                    <Grid.Column width='14'>
                        <br/><div className='ui eight centered cards'>
                            {this.wishedBooks().map((book, i) => {
                                if (this.libraryBooks().find(b => b[0].id === book[0].id)) {
                                    return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} match={this.libraryBooks().find(b => b[0].id === book[0].id)}/>
                                } else {
                                    return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]}/>
                                }
                            })}
                        </div>
                    </Grid.Column>
                </Grid>
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