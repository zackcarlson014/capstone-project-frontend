import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteLibBook, showBook } from '../actions/index.js'
import { Card, Image, Button, Icon } from 'semantic-ui-react'


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
                <Image as={ Link } exact to={`/books/${this.props.book.id}`} onClick={this.handleCardClick} src={this.props.book.image ? this.props.book.image : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} wrapped ui={false} width='300px' height='300px'/>
                <Card.Content>
                    <Card.Header>{this.props.book.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Published in {this.props.book.published_date ? this.props.book.published_date : 2020}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.book.author}
                    </Card.Description>
                    {this.props.match ? <Card.Content textAlign="center"><br/><Icon name='check' circular size='big' color='green'/></Card.Content> : null}
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
                    {/* <Button.Group widths='2'>
                        <Button as={ Link } exact to={`/books/${this.props.book.id}`} icon='eye' color='blue' onClick={this.handleCardClick} />
                        <Button icon='trash alternate outline' color='red' onClick={this.handleRemoveBook}/>
                    </Button.Group> */}
                </Card.Content>
            </Card>
        )
    }
}

export default connect(null, { deleteLibBook, showBook })(LibraryBookCard)
