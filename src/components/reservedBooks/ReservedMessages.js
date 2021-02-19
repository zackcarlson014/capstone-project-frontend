import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../../actions/index.js';
import ReservedMessage from './ReservedMessage.js';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

export class ReservedMessages extends Component {

    state = {
        content: ''
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const newReservedMessage = {
            user_id: this.props.auth.id,
            reserved_book_id: this.props.resBookId,
            content: this.state.content
        };
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newReservedMessage)
        };
        fetch('http://localhost:3000/api/v1/reserved_messages', reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.addMessage(data, this.props.auth)
        });
        const newMessage = {
            user_id: this.props.auth.id,
            recipient_id: this.props.user.id,
            res_book: this.props.resBookId,
            seen: false,
            read: false,
            content: this.state.content
        };
        const reqObj2 = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newMessage)
        };
        fetch('http://localhost:3000/api/v1/messages', reqObj2)
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                content: ''
            })
        });
    };

    render() {
        return (
            <div>
                <Comment.Group size='large'>
                    <Header as='h3' dividing>
                        Messages
                    </Header>
                    {this.props.messages.length === 0 ?
                        <Header as='h4' style={{color: 'red'}}>
                        Send {this.props.user.username} a message!
                        </Header>
                        :
                        <div>
                            {this.props.messages.map((message, i) => {
                                return <ReservedMessage key={i} message={message[0]} user={message[1]}/>
                            })}
                        </div>
                    }
                    <Form reply onSubmit={this.handleSubmit}>
                        <Form.TextArea onChange={this.handleInputChange} name='content' value={this.state.content}/>
                        <Button type='submit' content='Send' labelPosition='left' icon='send' primary />
                    </Form>
                </Comment.Group>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, { addMessage })(ReservedMessages);
