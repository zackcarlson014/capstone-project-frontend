import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addWishBook } from '../actions/index'
import { Card, Image, Button } from 'semantic-ui-react'


export class AddWishedBookCard extends Component {

    handleAddWishedBook = (book) => {
        const newWishedBook = {
            user_id: this.props.auth.id,
            book_id: book.id
        }
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newWishedBook)
        }
        fetch('http://localhost:3000/api/v1/user_wish_books', reqObj)
        .then(resp => resp.json())
        .then(newWishBook => {
            this.props.addWishBook(book, this.props.auth, newWishBook.id)
        })
    }

    handleAddBook = (e) => {
        e.preventDefault()
        const newBook = {
            title: this.props.title,
            author: this.props.author[0],
            image: this.props.image,
            published_date: this.props.published,
            description: this.props.description,
            average_rating: this.props.averageRating,
            ratings_count: this.props.ratingsCount,
            preview_link: this.props.previewLink
        }
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newBook)
        }
        fetch('http://localhost:3000/api/v1/books', reqObj)
            .then(resp => resp.json())
            .then(newWishBook => {
                this.handleAddWishedBook(newWishBook)
            })
    }

    render() {
        return (
            <Card color='blue'>
                <Image 
                    as='a' 
                    onClick={()=> window.open(this.props.previewLink, "_blank")} 
                    src={this.props.image} wrapped ui={false}
                    alt='' 
                    width='300px' 
                    height='300px'
                />
                <Card.Content>
                    <Card.Header as='a' onClick={()=> window.open(this.props.previewLink, "_blank")}>
                        {this.props.title}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                            Published in {this.props.published ? this.props.published : '???'}
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        By: {this.props.author ? this.props.author[0] : 'unknown'}
                    </Card.Description>
                </Card.Content>
                {this.props.match ?
                    <Card.Content extra>
                        <Button as={ Link } exact='true' to={`/books/${this.props.match[0].id}`} fluid color='green'>
                            View Book
                        </Button>
                    </Card.Content>
                    :
                    <Card.Content extra>
                        <Button fluid color='blue' onClick={this.handleAddBook}>
                            +WishList
                        </Button>
                    </Card.Content>
                }
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { addWishBook })(AddWishedBookCard)
