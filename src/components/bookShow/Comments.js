import React, { Component } from 'react';
import CommentItem from './CommentItem';
import { connect } from 'react-redux';
import { addComment } from '../../actions/index';
import {
  Button,
  Comment,
  Form,
  Header,
} from 'semantic-ui-react';

export class Comments extends Component {
  state = {
    content: '',
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newComment = {
      user_id: this.props.auth.id,
      book_id: this.props.book.id,
      content: this.state.content,
    };

    const reqURL = 'http://localhost:3000/api/v1/comments';

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(newComment),
    };

    fetch(reqURL, reqObj)
    .then(resp => resp.json())
    .then(data => {
      this.props.addComment(
        data,
        this.props.auth,
        0,
      );
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
            Comments
          </Header>

          {this.props.comments.length === 0
            ? <Header as='h4' style={{color: 'red'}}>
                Be the first to leave a comment on this book!
              </Header>
            
            : <div>
                {this.props.comments.map((comment, i) => {
                  return (
                    <CommentItem
                      key={i}
                      comment={comment[0]}
                      user={comment[1]}
                      likes={comment[2]}
                    />
                  )
                })}
              </div>
          }

          <Form
            reply
            onSubmit={this.handleSubmit}
          >
            <Form.TextArea
              name='content'
              value={this.state.content}
              onChange={this.handleInputChange}
            />

            <Button
              type='submit'
              content='Comment'
              labelPosition='left'
              icon='comment' primary
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
    addComment,
  },
)(Comments);