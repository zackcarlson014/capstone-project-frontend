import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { addLibBook } from '../actions/index'

export class BookCard extends Component {

    // constructor() {
    //     super()
    //     this.state({
    //         title: this.props.title,
    //         author: this.props.author,
    //         image: this.props.image,
    //         published: this.props.published
    //     })
    // }

    handleAddLibraryBook = (e) => {
        e.preventDefault()

        const newLibraryBook = {
            title: this.props.title,
            author: this.props.author,
            image: this.props.image,
            published_date: this.props.published
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newLibraryBook)
        }
        fetch('http://localhost:3000/api/v1/books', reqObj)
            .then(resp => resp.json())
            .then(newLibBook => {
                this.props.addLibBook(newLibBook)
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
                        By: {this.props.author}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                        <Icon name='user' />
                        22 Wishes
                        <Button color='blue' onClick={this.handleAddLibraryBook}>Add Book To Library</Button>
                </Card.Content>
            </Card>
        )
    }
}

const mapDispatchToProps = {
    addLibBook
}

export default connect(null, mapDispatchToProps)(BookCard)
