import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from '../NavBar'
import DashboardLibraryBooks from '../booksDashboard/DashboardLibraryBooks'
import Footer from '../Footer'
import { Grid, Loader, Header, Button, Icon, Popup, Image } from 'semantic-ui-react'

export class UsersDashboard extends Component {

    state = {
        users: []
    }

    componentWillMount() {
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(users => {
            this.setState({
                users
            })
        })
    }

    fellowMyBrarians = () => {
        let matchedUsers = []
        const allUsers = this.state.users.filter(u => u.id !== this.props.auth.id)
        if (this.props.searchField)  {
            const users = this.state.users.filter(u => u.username.toLowerCase().includes(this.props.searchField.toLowerCase()))
            if (users.length !== 0) {
                matchedUsers = users
            } else {
                matchedUsers = allUsers
            } 
        } else {
            matchedUsers = allUsers
        }
        return matchedUsers
    }

    myBrarianLibraryBooks = (id) => {
        return this.props.allLibraryBooks.filter(b => b[1].id === id)
    }

    render() {
        if (!this.props.auth) {
            return <Grid style={{ height: '99vh' }}><Loader active /></Grid>
        } else {
            return (
                <div className='App'>
                    <NavBar/><br/>
                    <Grid textAlign='center'>
                        <Grid.Row></Grid.Row>
                        <Grid.Row></Grid.Row>
                        <Grid.Row>
                            <Header as='h1' icon style={{color: 'white'}} textAlign='center'>
                                <Icon name='user' circular />
                                <Header.Content>
                                    MyBrarians
                                </Header.Content>
                            </Header>
                        </Grid.Row>
                        <Grid.Row></Grid.Row>
                        </Grid>
                            {this.fellowMyBrarians().map(u =>   
                            <Grid textAlign='center'>   
                                <Grid.Row> 
                                    <Grid.Column width='1'></Grid.Column>
                                    <Grid.Column width='4' verticalAlign='middle'>
                                        <Grid.Row>
                                        <Popup
                                            content={u.bio}
                                            key={u.username}
                                            header={u.username}
                                            trigger={<Image src={u.prof_pic_url} avatar size='large'/>}
                                        />
                                        </Grid.Row><br/>
                                        <Grid.Row>
                                            <Header as='h3' style={{color: 'white'}}>{u.username}</Header>
                                        </Grid.Row><br/>
                                        <Grid.Row>
                                            <Button color='purple'><Icon name='heart'/>Friend</Button>
                                        </Grid.Row>
                                    </Grid.Column>
                                    <Grid.Column width='2'></Grid.Column>
                                        {this.myBrarianLibraryBooks(u.id).length === 0 ?
                                            <Grid.Column width='8' verticalAlign='middle'>
                                                <Header as='h1' icon style={{color: 'white'}} textAlign='center'>
                                                    <Icon name='book' circular />
                                                    <Header.Content>
                                                        {u.username}'s shelf is currently empty
                                                    </Header.Content>
                                                </Header>
                                            </Grid.Column>
                                            :
                                            <Grid.Column width='8'>
                                                <DashboardLibraryBooks books={this.myBrarianLibraryBooks(u.id)} userDash={true}/>
                                            </Grid.Column>
                                        }
                                    <Grid.Column width='1'></Grid.Column>
                                </Grid.Row>
                                <Grid.Row></Grid.Row>
                                <Grid.Row></Grid.Row>
                            </Grid>
                            )}    
                    <Footer/>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        allLibraryBooks: state.allLibraryBooks,
        searchField: state.searchField
    }
}

export default connect(mapStateToProps, null)(UsersDashboard)
