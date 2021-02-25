import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { } from '../../actions/index.js';
import MessageGroupItem from './MessageGroupItem.js';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

export class MessageGroup extends Component {

    state = {
        content: ''
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <Comment.Group size='large'>
                {this.props.messageGroup.map((message, i) => {
                    return <MessageGroupItem key={i} message={message} user={message.recipient_id === this.props.auth.id ? this.props.groupUser : this.props.auth}/>
                })}
                <Form reply onSubmit={this.handleSubmit}>
                    <Form.TextArea onChange={this.handleInputChange} name='content' value={this.state.content}/>
                    <Button type='submit' content='Send' labelPosition='left' icon='send' primary />
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

export default connect(mapStateToProps, null)(MessageGroup);
