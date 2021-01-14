import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addLibBook, showBook } from '../actions/index'
import { Card, Image, Button } from 'semantic-ui-react'


export class AddLibraryBookCard extends Component {

    handleAddLibraryBook = (book) => {
        const newLibraryBook = {
            user_id: this.props.auth.id,
            book_id: book.id
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newLibraryBook)
        }
        fetch('http://localhost:3000/api/v1/user_lib_books', reqObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.props.addLibBook(book, this.props.auth, data.id)
        })
    }

    handleAddBook = (e) => {
        e.preventDefault()
        const newBook = {
            title: this.props.title,
            author: this.props.author[0],
            image: this.props.image,
            published_date: this.props.published,
            description: this.props.description
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
            .then(newLibBook => {
                this.handleAddLibraryBook(newLibBook)
            })
    }

    handleViewBook = () => {
        this.props.showBook(this.props.match[0], this.props.match[1])
    }

    render() {
        return (
            <Card color='blue'>
                <Image as='a' onClick={()=> window.open(this.props.link, "_blank")} src={this.props.image} wrapped ui={false} width='300px' height='300px'/>
                <Card.Content>
                    <Card.Header as='a' onClick={()=> window.open(this.props.link, "_blank")}>{this.props.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Published in {this.props.published ? this.props.published.split("-")[0] : '???'}</span>
                    </Card.Meta>
                    <Card.Description>
                        By: {this.props.author ? this.props.author[0] : 'unknown'}
                    </Card.Description>
                </Card.Content>
                {this.props.match ? 
                <Card.Content extra>
                    <Button as={ Link } exact to={`/books/${this.props.match[0].id}`} fluid color='green' onClick={this.handleViewBook}>View Book</Button>
                </Card.Content>
                :
                <Card.Content extra>
                    <Button fluid color='blue' onClick={this.handleAddBook}>Add Book to Library</Button>
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


export default connect(mapStateToProps, { addLibBook, showBook })(AddLibraryBookCard)
