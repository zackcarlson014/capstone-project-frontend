import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { showBook, showUser, addLibBook, deleteLibBook, updateReservedBook } from '../actions/index.js'
import NavBar from './NavBar.js'
import ReservedMessages from './ReservedMessages.js'
import { Grid , Header, Segment, Image, Button} from 'semantic-ui-react'

export class ReservedBookShowPage extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    handleShowUser = () => {
        this.props.showUser(this.props.book[1])
    }

    handleShowBook = () => {
        this.props.showBook(this.props.book[0], this.props.book[1])
    }

    reservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.book[2])
    }

    messages = () => {
        return this.props.allMessages.filter(m => m[0].reserved_book_id === this.reservedBook().id)
    }

    handleRemoveLibBook = () => {
        fetch(`http://localhost:3000/api/v1/user_lib_books/${this.props.book[2]}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.props.deleteLibBook(this.props.book[2])
        })
    }

    handleAddLibBook = () => {
        const newLibraryBook = {
            user_id: this.props.auth.id,
            book_id: this.props.book[0].id
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newLibraryBook)
        }
        fetch('http://localhost:3000/api/v1/user_lib_books', reqObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.handleRemoveLibBook()
            this.props.addLibBook(this.props.book[0], this.props.auth, data.id)
            this.handleDelivered(data.id)
            this.props.history.push('/profile')
        })
    }

    handleDelivered = (newLibBookId) => {
        const deliveredBook = {
            user_lib_book_id: newLibBookId,
            delivered: true
        }
        
        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(deliveredBook)
        }

        fetch(`http://localhost:3000/api/v1/reserved_books/${this.reservedBook().id}`, reqObj)
        .then(resp => resp.json())
        .then(resBook => {
            console.log(resBook)
            this.props.updateReservedBook(resBook)
        })   
    }



    render() {
        if (!this.props.book) {
           return <Redirect to='/reserved_books'/>
        } else {
            return (
                <div className='App'>
                    <NavBar/>
                    <br/><Grid>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='2'><br/><br/><Button as={ Link } exact to={'/reserved_books'} fluid color='blue'>Reserved Books</Button></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='8'><br/><Header as='h1' style={{color: 'white'}}>{this.props.book[0].title}</Header></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='5'><Header as='h3' style={{color: 'white'}}><strong>{this.props.book[0].author}</strong></Header></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='6'><Segment compact><Image as={ Link } exact to={`/books/${this.props.book[0].id}`} src={this.props.book[0].image} alt='' width='245px' height='350px' onClick={this.handleShowBook}/></Segment><br/></Grid.Column>
                            <Grid.Column width='6'>
                            <Segment compact>
                                    <Image src={this.props.book[1].prof_pic_url} alt='' size='medium'/><br/>
                                    <Button as={ Link } exact to={`/users/${this.props.book[1].id}`} fluid color='green' onClick={this.handleShowUser}>{this.props.book[1].username}'s Profile</Button>
                                </Segment><br/>
                            </Grid.Column>
                        </Grid.Row>

                        {this.reservedBook().user_id === this.props.auth.id ?
                            <Grid.Row>
                                <Grid.Column width='2'></Grid.Column>
                                <Grid.Column width='2'><Button color='green' onClick={this.handleAddLibBook}>Delivered</Button></Grid.Column>
                            </Grid.Row>
                            :
                            null
                        }
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='11'>
                                <Segment>
                                    <ReservedMessages resBookId={this.reservedBook().id} messages={this.messages()} userName={this.props.book[1].username}/>
                                </Segment><br/><br/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='2'><br/><Button as={ Link } exact to={'/reserved_books'} fluid color='blue'>Reserved Books</Button></Grid.Column>
                        </Grid.Row>
                    </Grid><br/><br/>
                    <div className="ui inverted vertical footer segment form-page">
                        <div className="ui container">
                            MyBrary
                        </div>
                    </div>
                </div>
            )
        }

    }
}

const mapStateToProps = state => {
    return {
        book: state.showReservedBook,
        allLibraryBooks: state.allLibraryBooks,
        reservedBooks: state.reservedBooks,
        allMessages: state.allMessages,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { showBook, showUser, addLibBook, deleteLibBook, updateReservedBook })(ReservedBookShowPage)
