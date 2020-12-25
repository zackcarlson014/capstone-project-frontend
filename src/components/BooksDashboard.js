import React, { Component } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import NavBar from './NavBar.js'
import DashboardLibraryBooks from './DashboardLibraryBooks.js'
import DashboardWishedBooks from './DashboardWishedBooks.js'



export class BooksDashboard extends Component {
    render() {
        return (
            <div className='App'>
                <NavBar />
                <br/><br/><Header as='h1' style={{color: 'white'}}>Let's Get Bookin'!!</Header>
                <br/><Header as='h3' icon style={{color: 'white'}}>
                    <Icon name='book' circular />
                    <Header.Content>All Library Books</Header.Content>
                </Header>
                <DashboardLibraryBooks />
                <br/><br/><br/><Header as='h3' icon style={{color: 'white'}}>
                    <Icon name='book' circular />
                    <Header.Content>All WishList Books</Header.Content>
                </Header>
                <DashboardWishedBooks />
            </div>
        )
    }
}


export default BooksDashboard