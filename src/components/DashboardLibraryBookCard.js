import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showBook, showUser } from '../actions/index.js'
import { Card, Image, Button, Icon } from 'semantic-ui-react'

export class DashboardLibraryBookCard extends Component {

    handleBookView = () => {
        this.props.showBook(this.props.book, this.props.user)
    }

    handleUserView = () => {
        this.props.showUser(this.props.user)
    }

    render() {
        return (
            <Card color='blue'>
                <Image src={this.props.book.image ? this.props.book.image : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} wrapped ui={false} width='300px' height='300px'/>
                <Card.Content>
                    <Card.Header>{this.props.book.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Published in {this.props.book.published_date ? this.props.book.published_date : 2020}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.book.author}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button as={ Link } exact to={`/users/${this.props.user.id}`} animated='fade' icon='user' color='green' onClick={this.handleUserView}>
                            <Button.Content visible><Icon name='user'/></Button.Content>
                            <Button.Content hidden>{this.props.user.username}</Button.Content>
                        </Button>
                        <Button as={ Link } exact to={`/books/${this.props.book.id}`} animated='fade' icon='eye' color='blue' onClick={this.handleBookView}>
                            <Button.Content visible><Icon name='eye'/></Button.Content>
                            <Button.Content hidden>View</Button.Content>
                        </Button>
                    </Button.Group>
                    {/* <Link exact to={`/users/${this.props.user.id}`}>
                        <Button fluid color='green' onClick={this.handleUserView}>
                            <Icon name='user' />
                            {this.props.user.username}
                        </Button>
                    </Link>
                    <Link exact to={`/books/${this.props.book.id}`}>
                        <Button fluid color='blue' onClick={this.handleBookView}>
                            View Book
                        </Button>
                    </Link> */}
                </Card.Content>
            </Card>
        )
    }
}

export default connect(null, { showBook, showUser })(DashboardLibraryBookCard)
