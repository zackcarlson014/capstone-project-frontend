import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'
import NavBar from './NavBar.js'


export class PublicProfile extends Component {
    
    libraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id === this.props.user.id)
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Container>
                    <br/><br/><h1>{this.props.user.username}</h1><br/>
                    <img src={this.props.user.prof_pic_url} alt=''style={{maxWidth: 400, maxHeight: 400}}/><br/><br/>
                    <p maxWidth='500px'>{this.props.user.bio}</p><br/><br/><br/>
                    {/* <Button color='red' onClick={this.handleDelete}>Delete Note</Button>
                    <Link key={this.props.book.id} exact to={`/notes/edit/${this.props.boo.id}`} ><Button color='blue' onClick={this.handleEdit}>Edit Note</Button></Link> */}
                </Container>
                <Header as='h3'>{this.props.user.username}'s Library Books</Header>
                <Header as='h3'>{this.props.user.username}'s Wished Books</Header>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.showUser,
        libBooks: state.allLibraryBooks,
        wishBooks: state.allWishedBooks
    }
}

export default connect(mapStateToProps, null)(PublicProfile)