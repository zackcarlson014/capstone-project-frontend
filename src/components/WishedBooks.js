import React, { Component } from 'react'
import { connect } from 'react-redux'
import WishedBookCard from './WishedBookCard.js'
import { Grid, Header } from 'semantic-ui-react'

export class WishedBooks extends Component {

    wishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id === this.props.auth.id)
    }

    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id !== this.props.auth.id)
    }


    render() {
        return (
            <div>
                {this.wishedBooks().length !== 0 ?
                    <Grid>
                        <Grid.Column width='1'></Grid.Column>
                        <Grid.Column width='14'>
                            <div className='ui seven centered cards'>
                                {this.wishedBooks().map((wishBook, i) => {
                                    if (this.libraryBooks().find(b => b[0].id === wishBook[0].id)) {
                                        return <WishedBookCard key={i} book={wishBook[0]} user={wishBook[1]} userBookId={wishBook[2]} match={true}/>
                                    } else {
                                        return <WishedBookCard key={i} book={wishBook[0]} user={wishBook[1]} userBookId={wishBook[2]}/>
                                    }
                                })}
                            </div>
                        </Grid.Column>
                    </Grid>
                    :
                    <div>
                        <br/><br/><Header as='h3' style={{color: 'white'}} textAlign="center">
                            Your WishList Bookshelf is Current Empty
                        </Header>
                        <Header as='h4' style={{color: 'white'}} textAlign="center">
                            Search for Books and Start Adding to Your Collection
                        </Header><br/><br/><br/><br/><br/><br/><br/><br/>
                    </div>
                }
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

export default connect(mapStateToProps, null)(WishedBooks)
