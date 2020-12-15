import React, { Component } from 'react'

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
            published: this.props.published
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newLibraryBook)
        }
        fetch('http://localhost:3000/books', reqObj)
            .then(resp => resp.json())
            // .then(newLibBook => {
            // })
    }

    render() {
        return (
            <div>
            <img src={this.props.image} alt=''></img>
            <h4>{this.props.title}</h4>
            <h5>{this.props.author}</h5>
            <h5>{this.props.published.split("-")[0]}</h5>
            <button type='submit'>Add to Library</button><br/><br/><br/>
            </div>
        )
    }
}

export default BookCard
