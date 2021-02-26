import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage, markMessagesRead } from '../../actions/index.js';
import MessageGroupItem from './MessageGroupItem.js';
import { Button, Comment, Form } from 'semantic-ui-react';

export class MessageGroup extends Component {

    state = {
        content: ''
    };

    componentWillUnmount() {
        this.markMessagesRead(this.props.messageGroup);
    }

    markMessagesRead = (messages) => {
        const resBookId = this.props.groupId;
        const user = this.props.auth.id;
        this.props.markMessagesRead(resBookId, user);
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
        .then(resp => resp.json());
    };

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmitMessage = (e) => {
        e.preventDefault();
        const newMessage = {
            user_id: this.props.auth.id,
            recipient_id: this.props.groupUser.id,
            res_book: this.props.groupId,
            seen: false,
            read: false,
            content: this.state.content
        };
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newMessage)
        };
        fetch('http://localhost:3000/api/v1/messages', reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.addMessage(data);
            this.setState({
                content: ''
            });
        });
    };

    render() {
        return (
            <Comment.Group size='large'>
                {this.props.messageGroup.map((message, i) => {
                    return <MessageGroupItem 
                        key={i} message={message} 
                        user={message.recipient_id === this.props.auth.id ? 
                            this.props.groupUser 
                            : 
                            this.props.auth}
                        />
                })}
                <Form 
                    reply 
                    onSubmit={this.handleSubmitMessage}
                >
                    <Form.TextArea 
                        onChange={this.handleInputChange} 
                        name='content' 
                        value={this.state.content}
                    />
                    <Button 
                        type='submit' 
                        content='Send' 
                        labelPosition='left' 
                        icon='send' 
                        primary 
                    />
                </Form>
            </Comment.Group>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { addMessage, markMessagesRead })(MessageGroup);
