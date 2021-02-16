import React, { Component } from 'react'
import { Grid, Message, Header, Icon } from 'semantic-ui-react'

export class MessageItem extends Component {
    render() {
        return (
            <div>
                <Message>
                    <Grid verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column width='2'>{this.props.messageItem.read ? <Header color='grey'>read</Header> : <Header color='green'>new</Header>}</Grid.Column>
                            <Grid.Column width='2'><Icon name={this.props.messageSent ? 'book' : 'user'} color='grey'/></Grid.Column>
                            <Grid.Column width='12'><Header as='h4'>{this.props.messageItem.content}</Header></Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Message><br/>
            </div>
        )
    }
}

export default MessageItem
