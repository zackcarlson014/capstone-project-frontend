import React, { Component } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import NavBar from './NavBar.js'
import DashboardLibraryBooks from './DashboardLibraryBooks.js'
import DashboardWishedBooks from './DashboardWishedBooks.js'



export class BooksDashboard extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className='App'>
                <NavBar />
                <br/><br/><Header as='h2' icon style={{color: 'white'}} textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>All Library Books</Header.Content>
                </Header>
                <DashboardLibraryBooks />
                <br/><br/><br/><Header as='h2' icon style={{color: 'white'}} textAlign="center">
                    <Icon name='book' circular />
                    <Header.Content>All WishList Books</Header.Content>
                </Header>
                <DashboardWishedBooks /><br/><br/><br/><br/><br/><br/>
                <div className="ui inverted vertical footer segment form-page">
                    <div className="ui container">
                        MyBrary
                    </div>
                </div>
            </div>
        )
    }
}


export default BooksDashboard