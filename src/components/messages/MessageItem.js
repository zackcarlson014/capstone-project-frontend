import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { markMessagesRead } from '../../actions/index';
import { Grid, Message, Header, Icon } from 'semantic-ui-react';

export class MessageItem extends Component {

    dateTime = () => {
        let period = 'am';
        let hour = this.props.messageItem[this.props.messageItem.length - 1].created_at.slice(11, 13);
        if (parseInt(hour) > 12) {
            hour = String(parseInt(hour) - 12);
            period = 'pm';
        };
        let minutes = this.props.messageItem[this.props.messageItem.length - 1].created_at.slice(14,16);
        let month = this.props.messageItem[this.props.messageItem.length - 1].created_at.slice(5, 7);
        if (month[0] === '0') {
            month = month;
        };
        let day = this.props.messageItem[this.props.messageItem.length - 1].created_at.slice(8, 10);
        if (day[0] === '0') {
            day = day;
        };
        let year = this.props.messageItem[this.props.messageItem.length - 1].created_at.slice(2,4);
        return `${hour}:${minutes} ${period} ${month}/${day}/${year}`;
    };
    
    receivedMessage = () => {
        return this.props.messageItem[this.props.messageItem.length - 1].recipient_id === this.props.authId;
    };

    markMessagesRead = (messages) => {
        const resBookId = parseInt(this.props.resBookId)
        this.props.markMessagesRead(resBookId)
        messages.filter(m => 
            m.read === false
        ).map(m => {
            return this.markMessageRead(m); 
        });
    };

    markMessageRead = (msg) => {
        const updatedMessage = {
            read: true
        };
        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updatedMessage)
        };
        fetch(`http://localhost:3000/api/v1/messages/${msg.id}`, reqObj)
        .then(resp => resp.json())
    };

    render() {
        if (!this.props.messageItem || !this.props.user) {
            return null;
        } else {
            return (
                <div>
                    <Message>
                        <Grid 
                            verticalAlign='middle' 
                            as={ Link } 
                            exact={true} 
                            to={`/reserved_books/${this.props.messageItem[this.props.messageItem.length - 1].res_book}`}
                            onClick={() => this.markMessagesRead(this.props.messageItem)}
                        >
                            {this.receivedMessage() ?
                                <Grid.Row>
                                    <Grid.Column width='1'>
                                        <Grid.Row>
                                            {this.props.messageItem[this.props.messageItem.length - 1].read ? 
                                                <Header color='grey'>read</Header> 
                                                : 
                                                <Header color='green'>new</Header>
                                            }
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Header as='h6' textAlign='center' color='grey'>
                                                from
                                            </Header>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Header textAlign='center' color='blue'>
                                                {this.props.user.username}
                                            </Header>
                                        </Grid.Row>
                                    </Grid.Column>
                                    <Grid.Column></Grid.Column>
                                    <Grid.Column width='2'>
                                        <Icon name='arrow circle right' color='blue'/>
                                    </Grid.Column>
                                    <Grid.Column width='10'>
                                        <Header as='h4'>
                                            {this.props.messageItem[this.props.messageItem.length - 1].content}
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column width='2'>
                                        <Header color='grey'>
                                            {this.dateTime()}
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                :
                                <Grid.Row>
                                    <Grid.Column width='1'>
                                        <Grid.Row>
                                            <Header textAlign='center' color='red'>
                                                sent
                                            </Header>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Header as='h6' textAlign='center' color='grey'>
                                                to
                                            </Header>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Header as={ Link } exact={true} to={`/users/${this.props.user.id}`} textAlign='center' color='blue'>
                                                {this.props.user.username}
                                            </Header>
                                        </Grid.Row>
                                    </Grid.Column>
                                    <Grid.Column></Grid.Column>
                                    <Grid.Column width='2'>
                                        <Icon name='arrow left' color='grey'/>
                                    </Grid.Column>
                                    <Grid.Column width='10'>
                                        <Header as='h4'>
                                            {this.props.messageItem[this.props.messageItem.length - 1].content}
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column width='2'>
                                        <Header color='grey'>
                                            {this.dateTime()}
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                            }      
                        </Grid>
                    </Message><br/>
                </div>
            );
        };
    };
};

export default connect(null, { markMessagesRead })(MessageItem);
