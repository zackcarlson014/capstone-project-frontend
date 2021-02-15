import React, { Component } from 'react'
import DashboardLibraryBooks from '../booksDashboard/DashboardLibraryBooks'
import { Grid, Loader, Header, Button, Icon, Popup, Image } from 'semantic-ui-react'

export class UserDash extends Component {

    myBrarianLibraryBooks = (id) => {
        return this.props.allLibraryBooks.filter(b => b[1].id === id)
    }
    
    render() {
        return (
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
        )
    }
}

export default UserDash
