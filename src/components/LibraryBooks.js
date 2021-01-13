import React, { Component } from 'react'
import { connect } from 'react-redux'
import LibraryBookCard from './LibraryBookCard.js'
import { Grid, Header, Icon } from 'semantic-ui-react'


export class LibraryBooks extends Component {

    libraryBooks = () => {
        return this.props.books.filter(book => book[1].id === this.props.auth.id)
    }

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id !== this.props.auth.id)
    }

    render() {
        return (
            <div>
                {this.libraryBooks().length !== 0 ?
                    <Grid>
                        <Grid.Column width='1'></Grid.Column>
                        <Grid.Column width='14'>
                            <div className='ui eight centered cards'>
                                {this.libraryBooks().map((libBook, i) => {
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
