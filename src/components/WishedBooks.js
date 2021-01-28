import React, { Component } from 'react'
import { connect } from 'react-redux'
import WishedBookCard from './WishedBookCard'
import { Grid, Header, Pagination, Segment } from 'semantic-ui-react'

export class WishedBooks extends Component {

    state = { 
        activePage: 1 
    }

    //set state's activePage to integer of page clicked
    handlePaginationChange = (e, { activePage }) => {
        this.setState({ 
            activePage 
        })
    }

    //amount of page buttons that should appear on pagination component
    paginationCount = () => {
        return this.myWishedBooks().length / 8
    }

    //remove page if deleted book last on page
    deleteBookIndex = () => {
        const updatedPage = this.state.activePage - 1
        if ((this.myWishedBooks().length / 8) < this.state.activePage && this.state.activePage > 1) {
            this.setState({
                activePage: updatedPage
            })
        }
    }

    //all Wish List books that belong to current user
    myWishedBooks = () => {
        return this.props.books.filter(book => book[1].id === this.props.auth.id)
    }

    //all Library books that belong to users other than current user
    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id !== this.props.auth.id)
    }

    //index of myWishedBooks return array that slice should intiate for pagination view
    bookIndex = () => {
        if (this.state.activePage === 1) {
            return this.state.activePage - 1
        }
        return (this.state.activePage - 1) * 8
    }

    render() {
        return (
            <div>
                {this.myWishedBooks().length !== 0 ?
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width='1'></Grid.Column>
                            <Grid.Column width='14'>
                                <div className='ui eight centered cards'>
                                    {this.myWishedBooks().slice(this.bookIndex(), this.bookIndex() + 8).map((wishBook, i) => {
                                        if (this.libraryBooks().find(b => b[0].id === wishBook[0].id)) {
                                            return <WishedBookCard key={i} book={wishBook[0]} user={wishBook[1]} userBookId={wishBook[2]} deleteBookIndex={this.deleteBookIndex} match={this.libraryBooks().filter(b => b[0].id === wishBook[0].id)}/>
                                        } else {
                                            return <WishedBookCard key={i} book={wishBook[0]} user={wishBook[1]} userBookId={wishBook[2]} deleteBookIndex={this.deleteBookIndex}/>
                                        }
                                    })}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    :
                    <Grid textAlign='centered'>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as='h3' style={{color: 'white'}} textAlign="center">
                                    {this.props.searchField ? "No Books Match Your Search" : "Your WishList Bookshelf is Current Empty"}
                                </Header>
                                {this.props.searchField ? 
                                    null 
                                    : 
                                    <Header as='h4' style={{color: 'white'}} textAlign="center">
                                        Search for Books to add to you WishList
                                    </Header>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                }
                <Grid textAlign='center'>
                    <Grid.Row>
                        <Segment color='blue' compact='true'>
                            <Pagination 
                                activePage={this.state.activePage} 
                                onPageChange={this.handlePaginationChange} 
                                totalPages={this.paginationCount()} 
                            />
                        </Segment>
                    </Grid.Row>
                    <Grid.Row></Grid.Row>
                    <Grid.Row></Grid.Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allWishedBooks: state.allWishedBooks,
        allLibraryBooks: state.allLibraryBooks,
        auth: state.auth,
        searchField: state.searchField
    }
}

export default connect(mapStateToProps, null)(WishedBooks)
