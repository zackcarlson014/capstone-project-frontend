import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showUser } from '../actions/index.js'
import { Grid, Card, Image, Icon, Button } from 'semantic-ui-react'

export class PublicUserCard extends Component {

    libraryCount = () => {
        const books = this.props.allLibraryBooks.filter(b => b[1].id === this.props.user.id)
        return books.length
    }

    handleShowUser = () => {
        this.props.showUser(this.props.user)
    }

    render() {
        return (
            <Card color='blue' textAlign='center'>
                <Card.Content>
                <Image as={ Link } exact to={`/users/${this.props.user.id}`} onClick={this.handleShowUser} fluid src={this.props.user.prof_pic_url ? this.props.user.prof_pic_url : 'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg'} />
                </Card.Content>
                <Card.Content extra textAlign='center'>
                    <Card.Header>{this.props.user.username}</Card.Header>
                    <Card.Meta>
                        <Icon name='book' />{this.libraryCount()} Library Books
                    </Card.Meta>
                    <Card.Description>
                        {this.props.user.bio}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button color='red' fluid>+Friend</Button>
                </Card.Content>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        allLibraryBooks: state.allLibraryBooks
    }
}

export default connect(mapStateToProps, { showUser })(PublicUserCard)