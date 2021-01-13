import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar.js'
import DashboardLibraryBooks from './DashboardLibraryBooks.js'
import DashboardWishedBooks from './DashboardWishedBooks.js'
import { Header, Icon } from 'semantic-ui-react'


export class BooksDashboard extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    libraryBooks = () => {
        if (this.props.searchField)  {
            return this.props.allLibraryBooks.filter(b => b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()))
        } else {
            return this.props.allLibraryBooks
        }   
    }

    wishedBooks = () => {
        if (this.props.searchField)  {
            return this.props.allWishedBooks.filter(b => b[0].title.toLowerCase().includes(this.props.searchField.toLowerCase()) || b[0].author.toLowerCase().includes(this.props.searchField.toLowerCase()))
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
                <div className="ui inverted vertical footer segment form-page">
                    <div className="ui container">
                        MyBrary
                    </div>
                </div>
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