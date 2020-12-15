import React from 'react'
import BookCard from './BookCard'

const BookList = (props) => {
    return (
        <div>
            {props.books.map((b, i) => {
                return <BookCard key={i} image={b.volumeInfo.imageLinks.thumbnail} title={b.volumeInfo.title} author={b.volumeInfo.authors} published={b.volumeInfo.publishedDate}/>
            })}
        </div>
    )
}

export default BookList;
