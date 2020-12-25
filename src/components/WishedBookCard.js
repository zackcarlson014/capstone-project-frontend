import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteWishBook, showBook } from '../actions/index.js'
import { Card, Image, Button, Icon } from 'semantic-ui-react'

export class WishedBookCard extends Component {

    handleRemoveBook = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/v1/user_wish_books/${this.props.userBookId}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(data => {
                this.props.deleteWishBook(data.id)
            })
    }

    handleCardClick = () => {
        this.props.showBook(this.props.book, this.props.user)
    }

    render() {
        return (
            <Card color='blue'>
                <Image src={this.props.book.image ? this.props.book.image : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} wrapped ui={false} width='300px' height='300px'/>
                <Card.Content>
                    <Card.Header>{this.props.book.title}</Card.Header>
                    {/* <Card.Meta>
                        <span className='date'>Published in {this.props.book.published_date ? this.props.book.published_date : 2020}</span>
                    </Card.Meta> */}
                    <Card.Description>
                        {this.props.book.author}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths='2'>
                        <Button as={ Link } exact to={`/books/${this.props.book.id}`} animated='fade' icon='eye' color='blue' onClick={this.handleCardClick}>
                            <Button.Content visible><Icon name='eye'/></Button.Content>
                            <Button.Content hidden>View</Button.Content>
                        </Button>
                        <Button animated='fade' icon='trash alternate outline' color='red' onClick={this.handleRemoveBook}>
                            <Button.Content visible><Icon name='trash alternate outline'/></Button.Content>
                            <Button.Content hidden>Delete</Button.Content>
                        </Button>
                    </Button.Group>
                </Card.Content>
            </Card>
        )
    }
}

export default connect(null, { deleteWishBook, showBook })(WishedBookCard)
