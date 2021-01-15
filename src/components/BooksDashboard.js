import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import DashboardLibraryBooks from './DashboardLibraryBooks'
import DashboardWishedBooks from './DashboardWishedBooks'
import Footer from './Footer'
import { Header, Icon } from 'semantic-ui-react'


export class BooksDashboard extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    libraryBooks = () => {
        if (this.props.searchField)  {
            const books = this.props.allLibraryBooks.filter(b => b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()))
            if (books.length !== 0) {
                return books
            } else {
                return this.props.allLibraryBooks
            } 
        } else {
            return this.props.allLibraryBooks
        }   
    }

    wishedBooks = () => {
        if (this.props.searchField)  {
            const books = this.props.allWishedBooks.filter(b => b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()))
            if (books.length !== 0) {
                return books
            } else {
                return this.props.allWishedBooks
            } 
        } else {
            return this.props.allWishedBooks
        }   
    }

    render() {
        return (
            <div className='App'>
                <NavBar />
                <br/><br/><Header as='h2' icon style={{color: 'white'}} textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>All Library Books</Header.Content>
                </Header>
                <DashboardLibraryBooks books={this.libraryBooks()}/>
                <br/><br/><br/><Header as='h2' icon style={{color: 'white'}} textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>All WishList Books</Header.Content>
                </Header>
                <DashboardWishedBooks books={this.wishedBooks()}/><br/><br/><br/><br/><br/><br/>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        allLibraryBooks: state.allLibraryBooks,
        allWishedBooks: state.allWishedBooks,
        searchField: state.searchField
    }
}

export default connect(mapStateToProps, null)(BooksDashboard)