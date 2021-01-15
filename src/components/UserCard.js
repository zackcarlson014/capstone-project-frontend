import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Button } from 'semantic-ui-react'

export class UserCard extends Component {

    bookCount = () => {
        let books = []
        books = this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id)
        return books.length
    }

    render() {
        return (
            <div>
                <br/><br/><Card color='blue'>
                    <Image src={this.props.auth && this.props.auth.prof_pic_url ? this.props.auth.prof_pic_url : 'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg'} wrapped ui={false}/>
                    <Card.Content>
                        <Card.Header>{this.props.auth ? this.props.auth.username : null}</Card.Header>
                        <Card.Meta>
                            <Icon name='book' />
                            {this.bookCount()} Library Books
                        </Card.Meta>
                        <Card.Description>
                            {this.props.auth ? this.props.auth.bio : null}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra >
                        <Button as={ Link } exact='true' to={this.props.auth ? `/users/${this.props.auth.id}/edit` : null} color='red' fluid>Edit Profile</Button>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        allLibraryBooks: state.allLibraryBooks
    }
}

export default connect(mapStateToProps, null)(UserCard)
