import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddWishedBookCard from './AddWishedBookCard'
import { Grid, Header, Icon } from 'semantic-ui-react'

export class AddWishedBookList extends Component {
    render() {
        return (
            <div>
                <br/><Grid>
                    <Grid.Column width='1'></Grid.Column>
                    <Grid.Column width='14'>
                        <div className='ui eight cards'>
                            {this.props.books.map((b, i) => {
                                if (this.props.allWishedBooks.find(book => book[0].title === b.volumeInfo.title && book[1].id === this.props.auth.id)) {
                                    return <AddWishedBookCard key={i} image={b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} title={b.volumeInfo.title} author={b.volumeInfo.authors} published={b.volumeInfo.publishedDate} description={b.volumeInfo.description} match={this.props.allWishedBooks.find(book => book[0].title === b.volumeInfo.title && book[1].id === this.props.auth.id)}/>
                                } else {
                                    return <AddWishedBookCard key={i} image={b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} title={b.volumeInfo.title} author={b.volumeInfo.authors} published={b.volumeInfo.publishedDate} description={b.volumeInfo.description}/>
                                }     
                            })}
                        </div>
                    </Grid.Column>
                </Grid><br/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allWishedBooks: state.allWishedBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(AddWishedBookList);