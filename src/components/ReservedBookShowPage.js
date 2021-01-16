import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showReservedBook, removeShowReservedBook, addLibBook, deleteLibBook, updateReservedBook, reservedBookMessages } from '../actions/index'
import NavBar from './NavBar'
import ReservedMessages from './ReservedMessages'
import Footer from './Footer'
import { Grid, Container, Header, Segment, Image, Button, Icon, Loader, Modal} from 'semantic-ui-react'

export class ReservedBookShowPage extends Component {

    state = {
        open: false
    }

    setOpen = (bool) => {
        this.setState({
            open: bool
        })
    }

    componentWillMount() {
        const id = this.props.location.pathname.slice(16)

        fetch(`http://localhost:3000/api/v1/reserved_books/${id}`)
        .then(resp => resp.json())
        .then(data => {
            this.props.showReservedBook(data.book.book, data.book.user, data.book.user_lib_book, data.book.id, data.messages)
        })
    }

    componentWillUnmount() {
        this.props.removeShowReservedBook()
    }

    reservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.book[2].id)
    }

    handleRemoveLibBook = () => {
        fetch(`http://localhost:3000/api/v1/user_lib_books/${this.props.book[2]}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(data => {
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
            this.handleRemoveLibBook()
            this.props.addLibBook(this.props.book[0], this.props.auth, data.id)
            this.handleDelivered(data.id)
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
            this.props.updateReservedBook(resBook)
        })  
    }

    render() {
        window.scrollTo(0, 0)
        if (!this.props.book || !this.reservedBook()) {
           return <Grid style={{ height: '99vh' }}><Loader active /></Grid>
        } else {
            return (
                <div className='App'>
                    <NavBar/>
                    <br/><Grid>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='3'><br/><br/><Button as={ Link } exact='true' to={'/reserved_books'} color='blue'><Icon name='book'/>Reserved Books</Button></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='12'><br/><Container compact='true' as={ Link } exact='true' to={`/books/${this.props.book[0].id}`}><Header as='h1' style={{color: 'white'}}>{this.props.book[0].title}</Header></Container></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='5'><Header as='h3' style={{color: 'white'}}><strong>{this.props.book[0].author}</strong></Header></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='6'><Segment compact><Image as={ Link } exact='true' to={`/books/${this.props.book[0].id}`} src={this.props.book[0].image} alt='' width='245px' height='350px' /></Segment><br/></Grid.Column>
                            <Grid.Column width='6'>
                            <Segment compact>
                                    {this.props.book[1].id === this.props.auth.id ? 
                                        <Header as='h4' textAlign='center' color='green'><Icon name='user'/>Reserved From</Header> 
                                        : 
                                        <Header as='h4' textAlign='center' color='green'><Icon name='user'/>Reserved By</Header>
                                    }
                                    <Image src={this.props.book[1].id === this.props.auth.id ? this.props.book[2].user.prof_pic_url : this.props.book[1].prof_pic_url} alt='' size='medium'/><br/>
                                    <Button as={ Link } exact='true' to={this.props.book[1].id === this.props.auth.id ? `/users/${this.props.book[2].user.id}` : `/users/${this.props.book[1].id}`} fluid animated='fade' icon='user' color='green'>
                                        <Button.Content visible><Icon name='user'/></Button.Content>
                                        <Button.Content hidden>{this.props.book[1].id === this.props.auth.id ? this.props.book[2].user.username : this.props.book[1].username}'s Profile</Button.Content>
                                    </Button>
                                </Segment><br/>
                            </Grid.Column>
                        </Grid.Row>

                        {this.props.book[1].id === this.props.auth.id ?
                            <Grid.Row>
                                <Grid.Column width='2'></Grid.Column>
                                {/* <Grid.Column as={ Link } exact='true' to={`/profile`} width='2'> */}
                                <Grid.Column width='2'>
                                    <Modal
                                    onClose={() => this.setOpen(false)}
                                    onOpen={() => this.setOpen(true)}
                                    open={this.state.open}
                                    trigger={
                                        <Button fluid animated='fade' icon='user' color='red'>
                                            <Button.Content visible><Icon name='truck'/></Button.Content>
                                            <Button.Content hidden>Received Book</Button.Content>
                                        </Button>
                                    }
                                    >
                                        <Modal.Header>{this.props.book[0].title} - {this.props.book[0].author}</Modal.Header>
                                        <Modal.Content image>
                                            <Image size='medium' src={this.props.book[0].image} wrapped />
                                            <Modal.Description>
                                            <br/><br/><p>
                                                Have you recieved this book from {this.props.book[1].id === this.props.auth.id ? this.props.book[2].user.username : this.props.book[1].username}?
                                            </p>
                                            <p>Add it to your Currently Reading list!</p>
                                            </Modal.Description>
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button color='black' onClick={() => this.setOpen(false)}>
                                            Not yet
                                            </Button>
                                            <Button
                                            as={ Link }
                                            to='/profile'
                                            content="+Currently Reading"
                                            labelPosition='right'
                                            icon='checkmark'
                                            onClick={this.handleAddLibBook}
                                            positive
                                            />
                                        </Modal.Actions>
                                    </Modal>
                                    {/* <Button fluid animated='fade' icon='user' color='red' onClick={this.handleAddLibBook}>
                                        <Button.Content visible><Icon name='truck'/></Button.Content>
                                        <Button.Content hidden>Received Book</Button.Content>
                                    </Button> */}
                                </Grid.Column>
                            </Grid.Row>
                            :
                            null
                        }
                        {this.props.messages ? 
                            <Grid.Row>
                                <Grid.Column width='2'></Grid.Column>
                                <Grid.Column width='11'>
                                    <Segment>
                                        <ReservedMessages resBookId={this.props.book[1].id} messages={this.props.messages} userName={this.props.book[1].username}/>
                                    </Segment><br/><br/>
                                </Grid.Column>
                            </Grid.Row>
                            :
                            null
                        }

                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='3'><br/><Button as={ Link } exact='true' to={'/reserved_books'} color='blue'><Icon name='book'/>Reserved Books</Button></Grid.Column>
                        </Grid.Row>
                    </Grid><br/><br/>
                    <Footer/>
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
        auth: state.auth,
        messages: state.allMessages
    }
}

export default connect(mapStateToProps, { showReservedBook, removeShowReservedBook, addLibBook, deleteLibBook, updateReservedBook, reservedBookMessages })(ReservedBookShowPage)
