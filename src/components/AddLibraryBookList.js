import React from 'react'
import AddLibraryBookCard from './AddLibraryBookCard'

const AddLibraryBookList = (props) => {
    return (
        <div>
            <div className='ui eight cards'>
                {props.books.map((b, i) => {
                    return <AddLibraryBookCard key={i} image={b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} title={b.volumeInfo.title} author={b.volumeInfo.authors} published={b.volumeInfo.publishedDate} description={b.volumeInfo.description}/>
                })}
            </div>
        </div>
    )
}

export default AddLibraryBookList;
