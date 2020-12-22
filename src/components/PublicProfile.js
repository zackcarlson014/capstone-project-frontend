import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'
import NavBar from './NavBar.js'
import DashboardLibraryBookCard from './DashboardLibraryBookCard'
import DashboardWishedBookCard from './DashboardWishedBookCard'


export class PublicProfile extends Component {
    
    libraryBooks = () => {
        return this.props.allLibBooks.filter(book => book[1].id === this.props.user.id)
    }

    wishedBooks = () => {
        return this.props.allWishBooks.filter(book => book[1].id === this.props.user.id)
    }

    render() {
        return (
            <div className='App'>
                <NavBar/>
                <Container>
                    <br/><br/><h1>{this.props.user.username}</h1><br/>
                    <img src={this.props.user.prof_pic_url} alt=''style={{maxWidth: 400, maxHeight: 400}}/><br/><br/>
                    <p>{this.props.user.bio}</p><br/><br/><br/>
                    {/* <Button color='red' onClick={this.handleDelete}>Delete Note</Button>
                    <Link key={this.props.book.id} exact to={`/notes/edit/${this.props.boo.id}`} ><Button color='blue' onClick={this.handleEdit}>Edit Note</Button></Link> */}
                </Container>
                <Header as='h2'>{this.props.user.username}'s Library Books</Header>
                <div>
                    <div className='ui eight cards'>
                        {this.libraryBooks().map((book, i) => {
                            return <DashboardLibraryBookCard key={i} book={book[0]} user={book[1]}/>
                        })}
                    </div>
                </div>
                <br/><br/><Header as='h2'>{this.props.user.username}'s Wished Books</Header>
                <div>
                    <div className='ui eight cards'>
                        {this.wishedBooks().map((book, i) => {
                            return <DashboardWishedBookCard key={i} book={book[0]} user={book[1]}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.showUser,
        allLibBooks: state.allLibraryBooks,
        allWishBooks: state.allWishedBooks
    }
}

export default connect(mapStateToProps, null)(PublicProfile)