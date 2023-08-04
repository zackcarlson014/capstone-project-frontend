import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReservedMessage, addMessage } from '../../actions/index.js';
import ReservedMessage from './ReservedMessage.js';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

export class ReservedMessages extends Component {
  state = {
    content: '',
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
      content: this.state.content,
    };

    const reservedMsgReqURL = 'http://localhost:3000/api/v1/reserved_messages';

    const reservedMsgReqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newReservedMessage),
    };

    fetch(reservedMsgReqURL, reservedMsgReqObj)
    .then(resp => resp.json())
    .then(data => {
      this.props.addReservedMessage(data, this.props.auth);
    });

    const newMessage = {
      user_id: this.props.auth.id,
      recipient_id: this.props.user.id,
      res_book: this.props.resBookId,
      seen: false,
      read: false,
      content: this.state.content,
    };

    const msgReqURL = 'http://localhost:3000/api/v1/messages';

    const msgReqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newMessage),
    };

    fetch(msgReqURL, msgReqObj)
    .then(resp => resp.json())
    .then(data => {
      this.props.addMessage(data);
      this.setState({
        content: '',
      });
    });
  };

  render() {
    return (
      <div>
        <Comment.Group size='large'>
          <Header as='h3' dividing>
              Messages
          </Header>

          {this.props.messages.length === 0
            ? <Header as='h4' style={{color: 'red'}}>

                Send {this.props.user.username} a message!
              </Header>

            : <div>
                {this.props.messages.map((message, i) => {
                  return <ReservedMessage
                    key={i}
                    message={message[0]}
                    user={message[1]}
                  />
                })}
              </div>
          }

          <Form reply onSubmit={this.handleSubmit}>
            <Form.TextArea
              value={this.state.content}
              name='content'
              onChange={this.handleInputChange}
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
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  {
    addReservedMessage,
    addMessage,
  },
)(ReservedMessages);
