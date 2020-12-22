import React, { Component } from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

export class CommentItem extends Component {

    render() {
        return (
            <Comment>
                <Comment.Avatar src={this.props.user.prof_pic_url} />
                <Comment.Content>
                    <Comment.Author as='a'>{this.props.user.username}</Comment.Author>
                    <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>{this.props.comment.content}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        )
    }
}


export default CommentItem