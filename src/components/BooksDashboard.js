import React, { Component } from 'react'
import NavBar from './NavBar.js'
import DashboardLibraryBooks from './DashboardLibraryBooks.js'
import DashboardWishedBooks from './DashboardWishedBooks.js'

export class BooksDashboard extends Component {


    render() {
        return (
            <div>
                <NavBar />
                <br/><br/><h1>Let's Get Bookin'!!</h1>
                <br/><h3>All Library Books</h3>
                <DashboardLibraryBooks />
                <br/><br/><br/><h3>All Wished Books</h3>
                <DashboardWishedBooks />
            </div>
        )
    }
}


export default BooksDashboard