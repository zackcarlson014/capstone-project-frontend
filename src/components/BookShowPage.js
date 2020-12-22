import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showUser } from '../actions/index.js'
import { Container, Button } from 'semantic-ui-react'
import NavBar from './NavBar.js'
import Comments from './Comments.js'

export class BookShowPage extends Component {

    bookComments = () => {
        return this.props.allComments.filter(comment => comment[0].book_id === this.props.book[0].id)
    }

    handleShowUser = () => {
        this.props.showUser(this.props.book[1])
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Container>
                    <br/><br/><h1>{this.props.book[0].title}</h1><br/>
                    <img src={this.props.book[0].image} alt='' width='210px' height='300px'/><br/><br/>
                    <h3><strong>{this.props.book[0].author}</strong></h3><br/>
                    {this.props.auth.id !== this.props.book[1].id ?
                    <Link exact to={`/users/${this.props.book[1].id}`}>
                        <Button color='green' onClick={this.handleShowUser}>View {this.props.book[1].username}'s Profile</Button><br/><br/>
                    </Link> 
                    :
                    null
                    }   
                    <p maxWidth='500px'>{this.props.book[0].description ? this.props.book[0].description : null}</p><br/><br/><br/>
                
                </Container>
                <Comments book={this.props.book[0]} user={this.props.book[1]} comments={this.bookComments()}/>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        book: state.showBook,
        allComments: state.allComments,
        auth: state.auth
    }
}

export default connect(mapStateToProps, { showUser })(BookShowPage)