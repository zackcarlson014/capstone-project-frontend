import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardLibraryBookCard from './DashboardLibraryBookCard';
import { Grid, Segment, Pagination } from 'semantic-ui-react';

export class DashboardLibraryBooks extends Component {

    state = { 
        activePage: 1 
    };

    handlePaginationChange = (e, { activePage }) => {
        this.setState({ 
            activePage 
        });
    };

    cardCount = () => {
        return this.props.userDash ? 5 : 8;
    };

    indexCount = () => {
        return Math.ceil(this.libraryBooks().length / this.cardCount());
    };

    currentStartIndex = () => {
        if (this.state.activePage === 1) {
            return this.state.activePage - 1;
        };
        return (this.state.activePage - 1) * this.cardCount();
    };

    currentEndIndex = () => {
        return this.currentStartIndex() + this.cardCount();
    };

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id === this.props.auth.id);
    };

    libraryBooks = () => {
        const reservedBooks = this.props.reservedBooks.filter(r => r.delivered === true)
        return this.props.books.filter(book => book[1].id !== this.props.auth.id && !reservedBooks.find(r => r.user_lib_book_id === book[2]));
    };
    
    render() {
        const reservedBooks = this.props.reservedBooks
        if (this.props.pub) {
            return (
                <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width='1'></Grid.Column>
                            <Grid.Column width='14'>
                                {/* <Card.Group itemsPerRow={3} centered inverted> */}
                                <br/><div className='ui eight centered cards'>
                                    {this.props.books.slice(this.currentStartIndex(), this.currentEndIndex()).map((book, i) => {
                                        if (this.wishedBooks().find(b => b[0].id === book[0].id && !reservedBooks.find(r => r.user_lib_book_id === book[2]))) {
                                            return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} pub={true} match={true}/>
                                        } else {
                                            return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} pub={true}/>
                                        }
                                    })}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid textAlign='center'>
                        <Grid.Row>
                            <Segment compact='true' color='blue'>
                                <Pagination activePage={this.state.activePage} onPageChange={this.handlePaginationChange} totalPages={this.indexCount()}/>
                            </Segment>
                        </Grid.Row>
                    </Grid>
                </div>
            )
        } else {
            return (
                <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width='1'></Grid.Column>
                            <Grid.Column width='14'>
                                <br/><div className={this.props.userDash ? 'ui five centered cards' : 'ui eight centered cards'}>
                                    {this.libraryBooks().slice(this.currentStartIndex(), this.currentEndIndex()).map((book, i) => {
                                        if (this.wishedBooks().find(b => b[0].id === book[0].id)) {
                                            return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} userDash={this.props.userDash ? true : false} match={true}/>
                                        } else {
                                            return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} userDash={this.props.userDash ? true : false}/>
                                        }
                                    })}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Grid textAlign='center'>
                        <Grid.Row>
                            <Segment compact='true' color='blue'>
                                <Pagination activePage={this.state.activePage} onPageChange={this.handlePaginationChange} totalPages={this.indexCount()}/>
                            </Segment>
                        </Grid.Row>
                        <Grid.Row></Grid.Row>
                    </Grid>
                </div>
            );
        };
    };
};

const mapStateToProps = state => {
    return {
        allWishedBooks: state.allWishedBooks,
        reservedBooks: state.reservedBooks,
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(DashboardLibraryBooks);