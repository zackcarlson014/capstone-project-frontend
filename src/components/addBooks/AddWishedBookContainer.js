import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar';
import BookSearch from './BookSearch';
import AddWishedBookList from './AddWishedBookList';
import WishedBooks from '../userProfile/WishedBooks';
import Footer from '../Footer';
import request from 'superagent';
import { Grid, Button, Header, Icon, Loader } from 'semantic-ui-react';


export class AddWishedBookContainer extends Component {

    constructor() {
        super();
        this.state = {
            books: [],
            searchField: ''
        }
        this.bookSearch = React.createRef()
    };

    //request books from Google Books API based on searchField parameters
    searchBook = (e) => {
        e.preventDefault();
        request
            .get(`https://www.googleapis.com/books/v1/volumes`)
            .query({ q: this.state.searchField})
            .query({ maxResults: '24' })
            .then(data => {
                this.setState({ books: [...data.body.items]});
            });
    };

    //update state based on user input
    handleSearch = (e) => {
        this.setState({
            searchField: e.target.value
        });
    };

    searchAuthor = (author) => {
        this.setState({
            searchField: author
        });
        // this.bookSearch.current.getWrappedInstance().submit();
    };

    //list of Current User's WishList books ({book, user, id})
    myWishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id === this.props.auth.id);
    };

    render() {
        window.scrollTo(0, 0);
        if (!this.props.auth) {
            return <Grid style={{ height: '99vh' }}><Loader active /></Grid>
        } else {
            return (
                <div className='App'>
                    <NavBar/><br/>
                    <Grid textAlign="center">
                        <Grid.Row></Grid.Row>
                        <Grid.Row></Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='1'></Grid.Column>
                            <Grid.Column width='2'>
                                <Button as={ Link } to='/profile' fluid color='blue'>
                                    Back to Profile
                                </Button>
                            </Grid.Column>
                            <Grid.Column width='13'></Grid.Column>
                        </Grid.Row>
                        <Grid.Row></Grid.Row>
                        <Grid.Row>
                            <Header as='h3' icon style={{color: 'white'}}>
                                <Icon name='book' circular />
                                <Header.Content>
                                    Search WishList Books
                                </Header.Content>
                            </Header>
                        </Grid.Row>
                        <Grid.Row>
                            <BookSearch ref={this.bookSearch} searchField={this.state.searchField} searchBook={this.searchBook} handleSearch={this.handleSearch}/>
                        </Grid.Row>
                        <Grid.Row>
                            <AddWishedBookList books={this.state.books} searchAuthor={this.searchAuthor}/>
                        </Grid.Row>
                        <Grid.Row>
                            <Header as='h3' icon style={{color: 'white'}}>
                                <Icon name='book' circular />
                                <Header.Content>
                                    Your WishList Books
                                </Header.Content>
                            </Header>
                        </Grid.Row>
                    </Grid>
                    <WishedBooks books={this.myWishedBooks()}/><br/>
                            
                    {/* <Grid>
                        <Button as={ Link } to='/profile' color='blue'>
                            Back to Profile
                        </Button>
                    </Grid>
                         */}
                    <Footer/>
                </div>
            );
        };
    };
};

const mapStateToProps = state => {
    return {
        allWishedBooks: state.allWishedBooks,
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(AddWishedBookContainer);
