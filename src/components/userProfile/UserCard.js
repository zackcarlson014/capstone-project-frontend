import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Icon, Button } from 'semantic-ui-react'

export class UserCard extends Component {

    render() {
        return (
            <div>
                <br/><br/><Card color='blue'>
                    <Image src={this.props.user.prof_pic_url ? this.props.user.prof_pic_url : 'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg'} wrapped ui={false}/>
                    <Card.Content>
                        <Card.Header>
                            {this.props.user.username}
                        </Card.Header>
                        <Card.Meta>
                            <Icon name='book' />
                            {this.props.bookCount} Library Books
                        </Card.Meta><br/>
                        <Card.Description>
                            {this.props.user.bio}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra >
                        <Button as={ Link } exact='true' to={`/users/${this.props.user.id}/edit`} color='red' fluid>Edit Profile</Button>
                    </Card.Content>
                </Card>
            </div>
        )
    }
}



export default UserCard
