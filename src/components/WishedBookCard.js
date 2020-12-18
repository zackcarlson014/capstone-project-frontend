import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteWishBook } from '../actions/index.js'
import { Card, Image, Button } from 'semantic-ui-react'

export class WishedBookCard extends Component {

    handleRemoveBook = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/v1/user_wish_books/${this.props.userBookId}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(data => {
                this.props.deleteWishBook(data.id)
            })
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
                        By: {this.props.book.author}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button color='blue' onClick={this.handleRemoveBook}>Remove from Wish List</Button>
                </Card.Content>
            </Card>
        )
    }
}

export default connect(null, { deleteWishBook })(WishedBookCard)
