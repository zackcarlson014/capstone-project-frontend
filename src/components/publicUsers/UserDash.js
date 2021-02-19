import React, { Component } from 'react';
import DashboardLibraryBooks from '../booksDashboard/DashboardLibraryBooks';
import { Grid, Header, Button, Icon, Popup, Image } from 'semantic-ui-react';

export class UserDash extends Component {
    
    render() {
        return (
            <Grid textAlign='center'>   
                <Grid.Row> 
                    <Grid.Column width='1'></Grid.Column>
                    <Grid.Column width='4' verticalAlign='middle'>
                        <Grid.Row>
                        <Popup
                            content={this.props.user.bio}
                            key={this.props.user.username}
                            header={this.props.user.username}
                            trigger={<Image src={this.props.user.prof_pic_url} avatar size='large'/>}
                        />
                        </Grid.Row><br/>
                        <Grid.Row>
                            <Header as='h3' style={{color: 'white'}}>{this.props.user.username}</Header>
                        </Grid.Row><br/>
                        <Grid.Row>
                            <Button color='purple'><Icon name='heart'/>Friend</Button>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width='2'></Grid.Column>
                        {this.props.myBrarianLibraryBooks(this.props.user.id).length === 0 ?
                            <Grid.Column width='8' verticalAlign='middle'>
                                <Header as='h1' icon style={{color: 'white'}} textAlign='center'>
                                    <Icon name='book' circular />
                                    <Header.Content>
                                        {this.props.user.username}'s shelf is currently empty
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            :
                            <Grid.Column width='8'>
                                <DashboardLibraryBooks books={this.props.myBrarianLibraryBooks(this.props.user.id)} userDash={true}/>
                            </Grid.Column>
                        }
                    <Grid.Column width='1'></Grid.Column>
                </Grid.Row>
                <Grid.Row></Grid.Row>
                <Grid.Row></Grid.Row>
            </Grid>
        );
    };
};

export default UserDash;
