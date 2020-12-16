import React from 'react'

const BookSearch = (props) => {
    return (
        <div>
            <br/><br/><br/><form onSubmit={props.searchBook}>
                <input type='text' onChange={props.handleSearch} placeholder='Search Books...'/>
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}

export default BookSearch;