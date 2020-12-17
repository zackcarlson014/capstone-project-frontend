import React from 'react'
import AddWishedBookCard from './AddWishedBookCard'

const AddWishedBookList = (props) => {
    return (
        <div>
            <div className='ui eight cards'>
                {props.books.map((b, i) => {
                    return <AddWishedBookCard key={i} image={b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} title={b.volumeInfo.title} author={b.volumeInfo.authors} published={b.volumeInfo.publishedDate}/>
                })}
            </div>
        </div>
    )
}

export default AddWishedBookList;