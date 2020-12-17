import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Button } from 'semantic-ui-react'
import { addWishBook } from '../actions/index'

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
        .then(data => {
            console.log(data)
        })
    }

    handleAddBook = (e) => {
        e.preventDefault()

        const newBook = {
            title: this.props.title,
            author: this.props.author[0],
            image: this.props.image,
            published_date: this.props.published
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
                console.log(newWishBook)
                this.handleAddWishedBook(newWishBook)
                this.props.addWishBook(newWishBook)

            })
    }



    render() {
        return (
            <Card color='blue'>
                <Image src={this.props.image} wrapped ui={false} width='300px' height='300px'/>
                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Published in {this.props.published.split("-")[0]}</span>
                    </Card.Meta>
                    <Card.Description>
                        By: {this.props.author[0]}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                        {/* <Icon name='user' />
                        22 Wishes */}
                        <Button color='blue' onClick={this.handleAddBook}>Add Book To Wish List</Button>
                </Card.Content>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = {
    addWishBook
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWishedBookCard)
