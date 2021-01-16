import React, { Component } from 'react'
import { connect } from 'react-redux'
import LibraryBookCard from './LibraryBookCard'
import { Grid, Header, Icon, Segment, Pagination } from 'semantic-ui-react'


export class LibraryBooks extends Component {

    state = { 
        activePage: 1 
    }

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ 
            activePage 
        })
    }

    libraryBooks = () => {
        return this.props.books.filter(book => book[1].id === this.props.auth.id)
    }

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id !== this.props.auth.id)
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
                {this.libraryBooks().length !== 0 ?
                    <Grid>
                        <Grid.Column width='1'></Grid.Column>
                        <Grid.Column width='14'>
                            <div className='ui eight centered cards'>
                                {this.libraryBooks().slice(this.bookIndex(), this.bookIndex() + 8).map((libBook, i) => {
                                    if (this.wishedBooks().find(b => b[0].id === libBook[0].id)) {
                                        return <LibraryBookCard key={i} book={libBook[0]} user={libBook[1]} userBookId={libBook[2]} match={true}/>
                                    } else {
                                        return <LibraryBookCard key={i} book={libBook[0]} user={libBook[1]} userBookId={libBook[2]}/>
                                    }
                                })}
                            </div>
                        </Grid.Column>
                    </Grid>
                    :
                    <div>
                        <br/><br/><Header as='h3' style={{color: 'white'}} textAlign="center">
                            {this.props.searchField ? "No Books Match Your Search" : "Your Library Bookshelf is Current Empty"}
                        </Header>
                        {this.props.searchField ? null : <Header as='h4' style={{color: 'white'}} textAlign="center"><Icon name='heart'/>Search for Books You'd Like to Donate</Header>}<br/><br/><br/><br/><br/>
                    </div>
                }
                <Grid textAlign='center'><Segment compact='true'><Pagination activePage={this.state.activePage} onPageChange={this.handlePaginationChange} totalPages={this.count()}/></Segment></Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        auth: state.auth,
        searchField: state.searchField
    }
}

export default connect(mapStateToProps, null)(LibraryBooks)
