import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { markMessagesRead } from '../../actions/index';
import { Grid, Message, Header, Icon, Image } from 'semantic-ui-react';

export class MessageItem extends Component {

    dateTime = () => {
        let period = 'am';
        let hour = this.props.messageItem[0].created_at.slice(11, 13);
        if (parseInt(hour) > 12) {
            hour = String(parseInt(hour) - 12);
            period = 'pm';
        };
        let minutes = this.props.messageItem[0].created_at.slice(14,16);
        let month = this.props.messageItem[0].created_at.slice(5, 7);
        if (month[0] === '0') {
            month = month;
        };
        let day = this.props.messageItem[0].created_at.slice(8, 10);
        if (day[0] === '0') {
            day = day;
        };
        let year = this.props.messageItem[0].created_at.slice(2,4);
        return `${hour}:${minutes} ${period} ${month}/${day}/${year}`;
    };
    
    receivedMessage = () => {
        return this.props.messageItem[0].recipient_id === this.props.authId;
    };

    markMessagesRead = (messages) => {
        const resBookId = parseInt(this.props.resBookId)
        const user = this.props.auth.id
        this.props.markMessagesRead(resBookId, user)
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

    sortedMessageItem = () => {
        return this.props.messageItem.sort((a, b) => 
        `${
            b.created_at.slice(0,4) + 
            b.created_at.slice(5,7) + 
            b.created_at.slice(8,10) + 
            b.created_at.slice(11,13) + 
            b.created_at.slice(14,16) +
            b.created_at.slice(17,19)
        }` - 
        `${
            a.created_at.slice(0,4) + 
            a.created_at.slice(5,7) + 
            a.created_at.slice(8,10) + 
            a.created_at.slice(11,13) + 
            a.created_at.slice(14,16) +
            a.created_at.slice(17,19)
        }`
    );
    }

    reservedBook = () => {
        const resBookId = this.props.resBookId
        return this.props.reservedBooks.find(book => 
            book.id === resBookId
        );
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
                            as={this.reservedBook() ? Link : null} 
                            exact={this.reservedBook() ? true : null} 
                            to={this.reservedBook() ? `/reserved_books/${this.props.messageItem[0].res_book}` : null}
                            onClick={this.reservedBook() ? () => this.markMessagesRead(this.props.messageItem) : () => this.props.setMessageGroupView(this.props.resBookId)}   
                        >
                            {this.receivedMessage() ?
                                <Grid.Row>
                                    <Grid.Column width='2'>
                                        <Grid.Row>
                                            {this.props.messageItem[0].read ? 
                                                <Header color='grey' textAlign='center'>read</Header> 
                                                : 
                                                <Header color='green' textAlign='center'>new</Header>
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
                                    <Grid.Column width='2'>
                                        <Icon name='arrow circle right' color='blue'/>
                                    </Grid.Column>
                                    <Grid.Column width={this.reservedBook() ? '8' : '9'}>
                                        <Header as='h4' textAlign='left'>
                                            {this.props.messageItem[0].content}
                                        </Header>
                                    </Grid.Column>
                                    {this.reservedBook() ? <Grid.Column><Image src={this.reservedBook().image}/></Grid.Column> : null}
                                    <Grid.Column width='2'>
                                        <Header color='grey'>
                                            {this.dateTime()}
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                                :
                                <Grid.Row>
                                    <Grid.Column width='2'>
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
                                    <Grid.Column width='2'>
                                        <Icon name='arrow left' color='grey'/>
                                    </Grid.Column>
                                    <Grid.Column width='9'>
                                        <Header as='h4' textAlign='left'>
                                            {this.props.messageItem[0].content}
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

const mapStateToProps = state => {
    return {
        auth: state.auth,
        reservedBooks: state.reservedBooks
    }
}

export default connect(mapStateToProps, { markMessagesRead })(MessageItem);
