import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showUser } from '../actions/index.js'
import { Container, Button } from 'semantic-ui-react'
import NavBar from './NavBar.js'
import Comments from './Comments.js'

export class BookShowPage extends Component {

    // handleDelete = () => {
    //     fetch(`http://localhost:3000/notes/${this.props.note.id}`, {method: 'DELETE'})
    //     .then(resp => resp.json())
    //     .then(data => {
    //         this.props.deleteNote(this.props.note.id)
    //         this.props.history.push('/notes')
    //     })
    // }

    // handleEdit = () => {
    //     this.props.editNote(this.props.note)
    // }

    

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
                    <Link exact to={`/users/${this.props.book[1].id}`}>
                        <Button color='green' onClick={this.handleShowUser}>View {this.props.book[1].username}'s Profile</Button><br/><br/>
                    </Link>
                    <p maxWidth='500px'>{this.props.book[0].description ? this.props.book[0].description : null}</p><br/><br/><br/>
                    {/* <Button color='red' onClick={this.handleDelete}>Delete Note</Button>
                    <Link key={this.props.book.id} exact to={`/notes/edit/${this.props.boo.id}`} ><Button color='blue' onClick={this.handleEdit}>Edit Note</Button></Link> */}
                </Container>
                <Comments />
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        book: state.showBook
    }
}

export default connect(mapStateToProps, { showUser })(BookShowPage)