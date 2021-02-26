import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showReservedBook, addReservedBook, deleteWishBook, showUser } from '../../actions/index'
import { Card, Image, Button, Icon, Header } from 'semantic-ui-react'

export class DashboardLibraryBookCard extends Component {
    
    handleAddReservedBook = async () => {
        const newReservedBook = {
            user_id: this.props.auth.id,
            user_lib_book_id: this.props.userBookId,
            delivered: false,
            completed: false
        };
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newReservedBook)
        };
        fetch('http://localhost:3000/api/v1/reserved_books', reqObj)
        .then(resp => resp.json())
        .then(newReservedBook => {
            this.props.addReservedBook(newReservedBook);
        });
        
        if (this.props.allWishedBooks.find(b => b[0].id === this.props.book.id && b[1].id === this.props.auth.id)) {
            const wishBook = this.props.allWishedBooks.find(b => b[0].id === this.props.book.id && b[1].id === this.props.auth.id);
            await fetch(`http://localhost:3000/api/v1/user_wish_books/${wishBook[2]}`, { method: 'DELETE' });
            this.props.deleteWishBook(wishBook[2]);
        };
    };

    reservedBook = () => {
        return this.props.reservedBooks.find(b => 
            b.user_lib_book_id === this.props.userBookId 
            && 
            b.user_id !== this.props.user.id
            &&
            !b.completed 

        );
    };

    reservedBookUser = () => {
        if (this.reservedBook()) {
            const book = this.props.allLibraryBooks.find(b => b[1].id === this.reservedBook().user_id);
            return book[1];
        };
    };

    myReservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.userBookId && b.user_id === this.props.auth.id);
    };

    userReservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.userBookId && b.user_id === this.props.user.id);
    };

    render() {
        return (
            <Card color='blue'>
                <Image 
                    as={ Link } 
                    exact='true' 
                    to={`/books/${this.props.book.id}`} 
                    src={this.props.book.image ? this.props.book.image : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} 
                    alt=''
                    wrapped 
                    ui={false} 
                    width='300px' 
                    height='300px'
                />
                {this.props.userDash ? 
                    <Card.Content>
                        <Card.Description as={ Link } exact='true' to={`/books/${this.props.book.id}`}>
                            {this.props.book.title}
                        </Card.Description>
                    </Card.Content>
                    :
                    <Card.Content>
                        <Card.Header>
                            {this.props.book.title}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                Avg Rating: {this.props.book.averageRating ? this.props.book.averageRating : 'N/A'}
                            </span>
                        </Card.Meta>
                        <Card.Meta>
                            <span className='date'>
                                # of Ratings: {this.props.book.ratingCount ? this.props.book.ratingCount : 'N/A'}
                            </span>
                        </Card.Meta>
                        <Card.Description>
                            {this.props.book.author}
                        </Card.Description>
                    </Card.Content>
                }
                {this.reservedBook() ?
                    <Card.Content extra textAlign="center">
                        <Header as='h5' icon color={this.myReservedBook() ? 'green' : 'red'} textAlign="center">
                            <Icon name='registered' circular/>
                            <Header.Content>
                                Reserved by {this.myReservedBook() ? 'Me' : this.reservedBookUser().username}
                            </Header.Content>
                        </Header>
                    </Card.Content> 
                    :
                    null
                }
                {this.props.match && !this.reservedBook() ? 
                    <Card.Content extra textAlign="center">
                        <Header as='h5' icon color='green' textAlign="center">
                            <Icon name='check' circular/>
                            <Header.Content>
                                Match
                            </Header.Content>
                        </Header>
                    </Card.Content> 
                    : 
                    null
                }
                {this.props.userDash ?
                <Card.Content extra>
                    <Button 
                        as={ Link } 
                        exact='true' 
                        to={this.myReservedBook() ? `/reserved_books/${this.myReservedBook().id}` : `/books/${this.props.book.id}`} 
                        animated='fade' 
                        icon='eye' 
                        color='blue'
                    >
                        <Button.Content visible>
                            <Icon name='eye'/>
                        </Button.Content>
                        <Button.Content hidden>
                            View
                        </Button.Content>
                    </Button>
                </Card.Content>
                :
                <Card.Content extra>
                    <Button.Group widths='2' >
                        {this.props.pub && !this.reservedBook() ? 
                            <Button 
                                animated='fade' 
                                icon='user' 
                                color='green' 
                                onClick={this.handleAddReservedBook}
                            >
                                <Button.Content visible>
                                    <Icon name='tag'/>
                                </Button.Content>
                                <Button.Content hidden>
                                    Reserve
                                </Button.Content>
                            </Button>
                            :
                            null
                        }
                        {this.reservedBook() && !this.myReservedBook() ?
                            <Button 
                                as={ Link } 
                                exact='true' 
                                to={this.props.pub ? `/users/${this.reservedBookUser().id}` : `/users/${this.props.user.id}`} 
                                animated='fade' 
                                icon='user' 
                                color='green'
                            >
                                <Button.Content visible>
                                    <Icon name='user'/>
                                </Button.Content>
                                <Button.Content hidden>
                                    {this.props.pub ? this.reservedBookUser().username : this.props.user.username}
                                </Button.Content>
                            </Button>
                            :
                            null
                        }
                        {!this.props.pub && !this.reservedBook() ?
                            <Button as={ Link } exact='true' to={`/users/${this.props.user.id}`} animated='fade' icon='user' color='green'>
                                <Button.Content visible>
                                    <Icon name='user'/>
                                </Button.Content>
                                <Button.Content hidden>
                                    {this.props.user.username}
                                </Button.Content>
                            </Button>
                            :
                            null
                        }
                        {!this.props.pub && this.myReservedBook() ?
                            <Button 
                                as={ Link } 
                                exact='true' 
                                to={`/users/${this.props.user.id}`} 
                                animated='fade' 
                                icon='user' 
                                color='green'
                            >
                                <Button.Content visible>
                                    <Icon name='user'/>
                                </Button.Content>
                                <Button.Content hidden>
                                    {this.props.user.username}
                                </Button.Content>
                            </Button>
                            :
                            null
                        }
                        <Button 
                            as={ Link } 
                            exact='true' 
                            to={this.myReservedBook() ? `/reserved_books/${this.myReservedBook().id}` : `/books/${this.props.book.id}`} 
                            animated='fade' 
                            icon='eye' 
                            color='blue'
                        >
                            <Button.Content visible>
                                <Icon name='eye'/>
                            </Button.Content>
                            <Button.Content hidden>
                                View
                            </Button.Content>
                        </Button>
                    </Button.Group>
                </Card.Content>
                }
            </Card>
        );
    };
};

const mapStateToProps = state => {
    return {
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        reservedBooks: state.reservedBooks,
        auth: state.auth
    };
};

export default connect(mapStateToProps, { showReservedBook, addReservedBook, deleteWishBook, showUser })(DashboardLibraryBookCard);
