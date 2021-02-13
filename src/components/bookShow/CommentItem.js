import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteComment, addLike, addCommentLike, deleteLike } from '../actions/index'
import { Comment, Icon, Loader } from 'semantic-ui-react'


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
            user_id: this.props.auth.id,
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
            this.props.addLike(data.id, data.comment_id)
            this.props.addCommentLike(this.props.comment, this.props.user, this.props.likes + 1)
        }) 
    }

    handleRemoveLike = (e) => {
        const updatedLikes = this.props.likes - 1

        e.preventDefault()

        fetch(`http://localhost:3000/api/v1/comment_likes/${this.likedByMe().id}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                this.props.deleteLike(this.props.comment.id, updatedLikes)
            })

    }

    dateTime = () => {
        let period = 'am'
        let hour = this.props.comment.created_at.slice(11, 13) 
        if (parseInt(hour) > 12) {
            hour = String(parseInt(hour) - 12)
            period = 'pm'
        }

        let minutes = this.props.comment.created_at.slice(14,16)

        let month = this.props.comment.created_at.slice(5, 7)
        if (month[0] === '0') {
            month = month[1]
        } 

        let day = this.props.comment.created_at.slice(8, 10)
        if (day[0] === '0') {
            day = day[1]
        } 

        let year = this.props.comment.created_at.slice(2,4)

        return `${hour}:${minutes} ${period} ${month}/${day}/${year}`
    }

    likedByMe = () => {
        return this.props.myLikes.find(l => l.comment_id === this.props.comment.id)
    }

    render() {
        if (this.props.auth) {
            return (
                <Comment>
                    <Comment.Avatar as={ Link } exact='true' to={this.props.user.id !== this.props.auth.id ? `/users/${this.props.user.id}` : '/profile'} src={this.props.user.prof_pic_url}/>
                    <Comment.Content>
                        <Comment.Author as={ Link } exact='true' to={this.props.user.id !== this.props.auth.id ? `/users/${this.props.user.id}` : '/profile'}>{this.props.user.username}</Comment.Author>
                        <Comment.Metadata>
                            <div>{this.dateTime()}</div>
                        </Comment.Metadata>
                        <Comment.Text>{this.props.comment.content}</Comment.Text>
                        {this.props.auth.id === this.props.user.id ?
                            <Comment.Actions color='red'>
                                <Comment.Action><Icon name={this.props.likes !== 0 ? 'heart' : 'heart outline'}/>{this.props.likes !== 0 ? this.props.likes : 0}</Comment.Action>
                                <Comment.Action style={{color: 'red'}} onClick={this.handleRemoveComment} ><Icon name='trash alternate outline'/></Comment.Action>
                            </Comment.Actions>
                            :
                            <Comment.Actions color='red'>
                                {this.likedByMe() ?
                                    <Comment.Action onClick={this.handleRemoveLike} style={{color: 'red'}}><Icon name='heart'/>{this.props.likes !== 0 ? this.props.likes : null}</Comment.Action>
                                    :
                                    <Comment.Action onClick={this.handleAddLike} style={{color: 'red'}}><Icon name='heart outline'/>{this.props.likes !== 0 ? this.props.likes : null}</Comment.Action>
                                }
                                
                            </Comment.Actions>
                         }
                    </Comment.Content>
                </Comment>
            )
        } else {
            return <Loader active/>
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        myLikes: state.myLikes
    }
}


export default connect(mapStateToProps, { deleteComment, addLike, addCommentLike, deleteLike })(CommentItem)