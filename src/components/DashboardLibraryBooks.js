import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashboardLibraryBookCard from './DashboardLibraryBookCard'
import { Grid } from 'semantic-ui-react'

export class DashboardLibraryBooks extends Component {

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id === this.props.auth.id)
    }

    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id !== this.props.auth.id)
    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Column width='1'></Grid.Column>
                    <Grid.Column width='14'>
                        <br/><div className='ui eight centered cards'>
                            {this.libraryBooks().map((book, i) => {
                                if (this.wishedBooks().find(b => b[0].id === book[0].id)) {
                                    return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} match={true}/>
                                } else {
                                    return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]}/>
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
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(DashboardLibraryBooks)