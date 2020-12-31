import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddLibraryBookCard from './AddLibraryBookCard'
import { Header, Icon } from 'semantic-ui-react'

export class AddLibraryBookList extends Component {
    render() {
        return (
            <div>
                {this.props.books.length !== 0 ? <Header as='h3' style={{color: 'white'}} textAlign="center"><Icon name='book'/>Add Library Books Below...</Header> : null}
                <div className='ui eight cards'>
                    {this.props.books.map((b, i) => {
                        if (this.props.allLibraryBooks.find(book => book[0].title === b.volumeInfo.title && book[1].id === this.props.auth.id)) {
                            return <AddLibraryBookCard key={i} image={b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} title={b.volumeInfo.title} author={b.volumeInfo.authors} published={b.volumeInfo.publishedDate} description={b.volumeInfo.description} match={this.props.allLibraryBooks.find(book => book[0].title === b.volumeInfo.title && book[1].id === this.props.auth.id)}/>
                        } else {
                            return <AddLibraryBookCard key={i} image={b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} title={b.volumeInfo.title} author={b.volumeInfo.authors} published={b.volumeInfo.publishedDate} description={b.volumeInfo.description}/>
                        }  
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allLibraryBooks: state.allLibraryBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(AddLibraryBookList);
