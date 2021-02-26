import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showUser, removeShowUser } from '../../actions/index';
import NavBar from '../NavBar';
import CurrentlyReadingCarousel from '../carousels/CurrentlyReadingCarousel';
import DashboardLibraryBooks from '../booksDashboard/DashboardLibraryBooks';
import DashboardWishedBooks from '../booksDashboard/DashboardWishedBooks';
import Footer from '../Footer';
import { Grid, Header, Icon, Segment, Image, Loader } from 'semantic-ui-react';

export class PublicProfile extends Component {

    //set showUser store state
    componentWillMount() {
        const id = this.props.location.pathname.slice(7);
        fetch(`http://localhost:3000/api/v1/users/${id}`)
        .then(resp => resp.json())
        .then(user => this.props.showUser(user))
    };

    //remove showUser store state
    componentWillUnmount() {
        this.props.removeShowUser();
    };

    //list of all Library Books, searchField conditional results
    libraryBooks = () => {
        if (this.props.searchField)  {
            const books = this.props.allLibraryBooks.filter(b => 
                b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) 
                || 
                b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()));
            if (books.length !== 0) {
                return books;
            } else {
                return this.props.allLibraryBooks;
            };
        } else {
            return this.props.allLibraryBooks;
        };
    };

    //list of all Wish List Books, searchField conditional results
    wishedBooks = () => {
        if (this.props.searchField)  {
            const books = this.props.allWishedBooks.filter(b => 
                b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) 
                || 
                b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()));
            if (books.length !== 0) {
                return books;
            } else {
                return this.props.allWishedBooks;
            };
        } else {
            return this.props.allWishedBooks;
        };
    };
    
    //Library books that belong to Profile User
    userLibraryBooks = () => {
        return this.libraryBooks().filter(book => book[1].id === this.props.user.id);
    };

    //Wish List books that belong to Profile User
    userWishedBooks = () => {
        return this.wishedBooks().filter(book => book[1].id === this.props.user.id);
    };

    //Library books that belong to Current User
    myLibraryBooks = () => {
        return this.props.allLibraryBooks.filter(book => book[1].id === this.props.auth.id);
    };

    //Wish List books that belong to Current User
    myWishedBooks = () => {
        return this.props.allWishedBooks.filter(book => book[1].id === this.props.auth.id);
    };

    //Library books on Profile User's Currently Reading list
    currentlyReading = () => {
        const books = this.props.reservedBooks.filter(b => 
            b.user_id === this.props.user.id 
            && 
            b.delivered
            &&
            !b.completed
        );
        const libBooks = books.map(b => {
            return this.props.allLibraryBooks.find(book => book[2] === b.user_lib_book_id);
        });
        return libBooks.map(b => b[0]);
    };

    render() {
        window.scrollTo(0, 0);
        if (!this.props.user) {
            return <Grid style={{ height: '99vh' }}><Loader active /></Grid>;
        } else {
            return (
                <div className='App'>
                    <NavBar/>
                    <br/><Grid>
                        <Grid.Row></Grid.Row>
                        <Grid.Row></Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='1'></Grid.Column>
                            <Grid.Column width='5'>
                                <Grid textAlign='centered'>
                                    <Grid.Row>
                                        <Header as='h1' style={{color: 'white'}}>
                                            {this.props.user.username}
                                        </Header>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Image avatar src={this.props.user.prof_pic_url} alt='' size='large'/>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Segment color='blue' textAlign="center" compact>
                                            {this.props.user.bio}
                                        </Segment>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                            <Grid.Column width='5'></Grid.Column>
                            {this.currentlyReading().length !== 0 ?
                                <Grid>
                                    <Grid.Row></Grid.Row>
                                    <Grid.Row>
                                        <CurrentlyReadingCarousel books={this.currentlyReading()} pub={true}/>
                                    </Grid.Row>
                                </Grid>
                                :
                                null
                            }
                        </Grid.Row>
                        <Grid.Row></Grid.Row>
                        <Grid.Row></Grid.Row>
                    </Grid><br/>
                    <Header as='h2' icon style={{color: 'white'}} textAlign="center">
                            <Icon name='book' circular />
                            <Header.Content>
                                {this.props.user.username}'s Library Books ({this.userLibraryBooks().length})
                            </Header.Content>
                    </Header><br/>
                    <DashboardLibraryBooks books={this.userLibraryBooks()} pub={true}/><br/>
                    <Grid>
                        <Grid.Row></Grid.Row>
                        <Grid.Row></Grid.Row>
                        <Grid.Row></Grid.Row>
                    </Grid>
                    <Header as='h2' icon style={{color: 'white'}} textAlign="center">
                            <Icon name='book' circular />
                            <Header.Content>
                                {this.props.user.username}'s WishList Books ({this.userWishedBooks().length})
                            </Header.Content>
                    </Header><br/><br/>
                    <DashboardWishedBooks books={this.userWishedBooks()} pub={true}/>
                    <Footer/>
                </div>
            );
        };
    };
};

const mapStateToProps = state => {
    return {
        user: state.showUser,
        auth: state.auth,
        reservedBooks: state.reservedBooks,
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        searchField: state.searchField
    };
};

export default connect(mapStateToProps, { showUser, removeShowUser })(PublicProfile);