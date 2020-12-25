import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteComment, addLike } from '../actions/index.js'
import { Comment, Icon } from 'semantic-ui-react'

export class CommentItem extends Component {

    handleRemoveComment = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/v1/comments/${this.props.comment.id}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(data => {
                this.props.deleteComment(data.id)
            })
    }

    handleAddLike = (e) => {
        e.preventDefault()

        const newCommentLike = {
            user_id: this.props.user.id,
            comment_id: this.props.comment.id
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCommentLike)
        }

        fetch('http://localhost:3000/api/v1/comment_likes', reqObj)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            this.props.addLike(this.props.comment, this.props.user, this.props.likes + 1)
        }) 
    }

    render() {
        return (
            <Comment>
                <Comment.Avatar src={this.props.user.prof_pic_url}/>
                <Comment.Content>
                    <Comment.Author as='a'>{this.props.user.username}</Comment.Author>
                    <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>{this.props.comment.content}</Comment.Text>
                    
                    <Comment.Actions color='red'>
                        {this.props.auth.id === this.props.user.id ?     
                        <Comment.Action onClick={this.handleRemoveComment} style={{color: 'red'}}><Icon name='trash alternate outline'/></Comment.Action>
                        :
                        null
                        }
                        {this.props.auth.id !== this.props.user.id ?     
                        <Comment.Action onClick={this.handleAddLike} style={{color: 'red'}}><Icon name='heart'/>{this.props.likes !== 0 ? this.props.likes : null}</Comment.Action>
                        :
                        null
                        }
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps, { deleteComment, addLike })(CommentItem)