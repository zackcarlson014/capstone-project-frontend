import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteLibBook, showBook } from '../actions/index.js'
import { Card, Image, Button } from 'semantic-ui-react'


export class LibraryBookCard extends Component {

    
    handleRemoveBook = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/v1/user_lib_books/${this.props.userBookId}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(data => {
                this.props.deleteLibBook(data.id)
            })
    }

    handleCardClick = () => {
        this.props.showBook(this.props.book, this.props.user)
    }

    render() {
        return (
            <Card color='blue'>
                {/* <Link onClick={this.handleCardClick} exact to={`/books/${this.props.book.id}`}> */}
                    <Image src={this.props.book.image ? this.props.book.image : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} wrapped ui={false} width='300px' height='300px'/>
                {/* </Link> */}
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
                    <div className='ui two buttons'>
                        <Link exact to={`/books/${this.props.book.id}`}>
                            <Button color='blue' onClick={this.handleCardClick}>
                                View
                            </Button>
                        </Link>
                        <Button color='red' onClick={this.handleRemoveBook}>
                            Remove
                        </Button>
                    </div>
                    {/* <Button color='blue' onClick={this.handleRemoveBook}>Remove</Button>
                    <Link exact to={`/books/${this.props.book.id}`}><Button onClick={this.handleCardClick} color='blue'>View</Button></Link> */}
                </Card.Content>
            </Card>
        )
    }
}

export default connect(null, { deleteLibBook, showBook })(LibraryBookCard)
