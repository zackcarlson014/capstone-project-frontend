import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showUser, removeShowUser } from '../actions/index'
import NavBar from './NavBar'
import DashboardLibraryBookCard from './DashboardLibraryBookCard'
import DashboardWishedBookCard from './DashboardWishedBookCard'
import CurrentlyReadingCarousel from './CurrentlyReadingCarousel'
import Footer from './Footer'
import { Grid, Header, Icon, Segment, Image, Loader } from 'semantic-ui-react'

export class PublicProfile extends Component {

    componentWillMount() {
        const id = this.props.location.pathname.slice(7)
        fetch(`http://localhost:3000/api/v1/users/${id}`)
        .then(resp => resp.json())
        .then(user => this.props.showUser(user))
    }

    componentWillUnmount() {
        this.props.removeShowUser()
    }

    libraryBooks = () => {
        if (this.props.searchField)  {
            const books = this.props.allLibraryBooks.filter(b => b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()))
            if (books.length !== 0) {
                return books
            } else {
                return this.props.allLibraryBooks
            } 
        } else {
            return this.props.allLibraryBooks
        }   
    }

    wishedBooks = () => {
        if (this.props.searchField)  {
            const books = this.props.allWishedBooks.filter(b => b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()))
            if (books.length !== 0) {
                return books
            } else {
                return this.props.allWishedBooks
            } 
        } else {
            return this.props.allWishedBooks
        }   
    }
    
    userLibraryBooks = () => {
        return this.libraryBooks().filter(book => book[1].id === this.props.user.id)
    }

    userWishedBooks = () => {
        return this.wishedBooks().filter(book => book[1].id === this.props.user.id)
    }

    myLibraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id)
    }

    myWishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id === this.props.auth.id)
    }

    currentlyReading = () => {
        const books = this.props.reservedBooks.filter(b => b.user_id === this.props.user.id && b.delivered === true)
        const libBooks = books.map(b => {
            return this.props.allLibraryBooks.find(book => book[2] === b.user_lib_book_id )
        })
        return libBooks.map(b => b[0])
    }

    render() {
        window.scrollTo(0, 0)
        if (!this.props.user) {
            return <Grid style={{ height: '99vh' }}><Loader active /></Grid>
        } else {
            return (
                <div className='App'>
                    <NavBar/>
                    <br/><Grid>
                        <Grid.Row>
                            <Grid.Column width='1'></Grid.Column>
                            <Grid.Column width='8'><br/><Header as='h1' style={{color: 'white'}}>{this.props.user.username}</Header></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='1'></Grid.Column>
                            <Grid.Column width='10'>
                            <Grid>
                            <Grid.Row>
                                <Segment color='blue' textAlign="center" compact><Image src={this.props.user.prof_pic_url} alt='' size='large'/></Segment>
                            </Grid.Row>
                            <Grid.Row>
                                <Segment color='blue' textAlign="center" compact>{this.props.user.bio}</Segment>
                            </Grid.Row>
                            </Grid>
                            </Grid.Column>
                            {this.currentlyReading().length !== 0 ?
                            <Grid>
                            <Grid.Row><CurrentlyReadingCarousel books={this.currentlyReading()} pub={true}/></Grid.Row>
                            </Grid>
                            :
                            null
                            }
                        </Grid.Row>

                    </Grid><br/><br/><br/>
                    <Header as='h3' icon style={{color: 'white'}} textAlign="center">
                            <Icon name='book' circular />
                            <Header.Content>{this.props.user.username}'s Library Books ({this.userLibraryBooks().length})</Header.Content>
                    </Header><br/><br/> 
                    <div>
                        <Grid>
                            <Grid.Column width='1'></Grid.Column>
                            <Grid.Column width='14'>
                                <div className='ui eight centered cards'>
                                    {this.userLibraryBooks().map((book, i) => {
                                        if (this.myWishedBooks().find(b => b[0].id === book[0].id)) {
                                            return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} match={true} pub={true}/>
                                        } else {
                                            return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]} userBookId={book[2]} pub={true}/>
                                        } 
                                    })}
                                </div>
                            </Grid.Column>
                        </Grid>
                    </div><br/><br/><br/>
                    <Header as='h3' icon style={{color: 'white'}} textAlign="center">
                            <Icon name='book' circular />
                            <Header.Content>{this.props.user.username}'s WishList Books ({this.userWishedBooks().length})</Header.Content>
                    </Header><br/><br/>
                    <div>
                        <Grid>
                            <Grid.Column width='1'></Grid.Column>
                            <Grid.Column width='14'>
                                <div className='ui eight centered cards'>
                                    {this.userWishedBooks().map((book, i) => {
                                        if (this.myLibraryBooks().find(b => b[0].id === book[0].id)) {
                                            return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]} match={true}  pub={true}/>
                                        } else {
                                            return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]}  pub={true}/>
                                        }
                                    })}
                                </div>
                            </Grid.Column>
                        </Grid>
                    </div><br/><br/><br/><br/>
                    <Footer/>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.showUser,
        auth: state.auth,
        reservedBooks: state.reservedBooks,
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        searchField: state.searchField
    }
}

export default connect(mapStateToProps, { showUser, removeShowUser })(PublicProfile)