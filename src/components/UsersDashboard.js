import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import UserCard from './UserCard'
import { Header, Card, Image, Button, Icon } from 'semantic-ui-react'

export class UsersDashboard extends Component {

    state = {
        users: [],
        books: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(users => {
            this.setState({
                users
            })
        })
        fetch('http://localhost:3000/api/v1/reserved_books')
        .then(resp => resp.json()) 
        .then(books => {
            const currentlyReading = books.filter(b => b.delivered === true)
            this.setState({
                books: currentlyReading
            })
        })

    }

    render() {
        const currentlyReading = this.props.allLibraryBooks
        return (
            <div className='App'>
                <NavBar/>
                <br/><br/><Header as='h2' icon style={{color: 'white'}} textAlign='center'>
                    <Icon name='user' circular />
                    <Header.Content>MyBrarians</Header.Content>
                </Header><br/><br/>
                {currentlyReading ?
                    <Card.Group itemsPerRow={9} centered inverted>
                    {this.state.books.map(b => {
                        const user = this.state.users.find(u => u.id === b.user_id)
                        const libBook = currentlyReading.find(lb => lb[2] === b.user_lib_book_id)
                        return (
                            <Card color='blue'>
                                <Image size='medium' src={libBook[0].image} wrapped />
                                <Card.Content>
                                    <Card.Header>{libBook[0].title}</Card.Header>
                                    <Card.Meta>
                                        {libBook[0].published}
                                    </Card.Meta>
                                    <Card.Description>
                                        {libBook[0].author}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra >
                                    <Button color='red' fluid>{user.username}</Button>
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
                :
                null
                }
                <Card.Group itemsPerRow={6} centered inverted>
                    {this.state.users ? 
                        this.state.users.map(u => <UserCard user={u}/>)
                        :
                        null
                    }
                </Card.Group><br/><br/>
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
        allLibraryBooks: state.allLibraryBooks
    }
}

export default connect(mapStateToProps, null)(UsersDashboard)
