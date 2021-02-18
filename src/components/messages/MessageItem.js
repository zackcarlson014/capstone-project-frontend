import React, { Component } from 'react'
import { Grid, Message, Header, Icon } from 'semantic-ui-react'

export class MessageItem extends Component {

    dateTime = () => {
        let period = 'am'
        let hour = this.props.messageItem[1][this.props.messageItem[1].length - 1].created_at.slice(11, 13) 
        if (parseInt(hour) > 12) {
            hour = String(parseInt(hour) - 12)
            period = 'pm'
        }

        let minutes = this.props.messageItem[1][this.props.messageItem[1].length - 1].created_at.slice(14,16)

        let month = this.props.messageItem[1][this.props.messageItem[1].length - 1].created_at.slice(5, 7)
        if (month[0] === '0') {
            month = month[1]
        } 

        let day = this.props.messageItem[1][this.props.messageItem[1].length - 1].created_at.slice(8, 10)
        if (day[0] === '0') {
            day = day[1]
        } 

        let year = this.props.messageItem[1][this.props.messageItem[1].length - 1].created_at.slice(2,4)

        return `${hour}:${minutes} ${period} ${month}/${day}/${year}`
    }
    
    receivedMessage = () => {
        return this.props.messageItem[1][this.props.messageItem[1].length - 1].recipient_id === this.props.currentUserId
    }

    render() {
        if (!this.props.messageItem) {
            return null
        } else {
            return (
                <div>
                    <Message>
                        <Grid verticalAlign='middle'>
                            {this.receivedMessage() ?
                                <Grid.Row>
                                    <Grid.Column width='2'>{this.props.messageItem[1][this.props.messageItem[1].length - 1].read ? <Header color='grey'>read</Header> : <Header color='green'>new</Header>}</Grid.Column>
                                    <Grid.Column width='2'>
                                        <Icon name='arrow circle right' color='blue'/>
                                    </Grid.Column>
                                    <Grid.Column width='10'><Header as='h4'>{this.props.messageItem[1][this.props.messageItem[1].length - 1].content}</Header></Grid.Column>
                                    <Grid.Column width='2'><Header color='grey'>{this.dateTime()}</Header></Grid.Column>
                                </Grid.Row>
                                :
                                <Grid.Row>
                                    <Grid.Column width='2'><Header color='grey'>sent</Header></Grid.Column>
                                    <Grid.Column width='2'>
                                        <Icon name='arrow left' color='red'/>
                                    </Grid.Column>
                                    <Grid.Column width='10'><Header as='h4'>{this.props.messageItem[1][this.props.messageItem[1].length - 1].content}</Header></Grid.Column>
                                    <Grid.Column width='2'><Header color='grey'>{this.dateTime()}</Header></Grid.Column>
                                </Grid.Row>
                            }      
                        </Grid>
                    </Message><br/>
                </div>
            )
        }
    }
}

export default MessageItem
