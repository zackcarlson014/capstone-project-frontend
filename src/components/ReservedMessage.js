import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteMessage } from '../actions/index.js'
import { Comment, Icon } from 'semantic-ui-react'

export class ReservedMessage extends Component {

    handleDeleteMessage = (e) => {
        e.preventDefault()

        fetch(`http://localhost:3000/api/v1/reserved_messages/${this.props.message.id}`, {method: 'DELETE'})
            .then(resp => resp.json())
            .then(data => {
                this.props.deleteMessage(data.id)
            })
    }

    render() {
        return (
            <div>
                <Comment>
                    <Comment.Avatar src={this.props.user.prof_pic_url}/>
                    <Comment.Content>
                        <Comment.Author>{this.props.user.username}</Comment.Author>
                        <Comment.Metadata>
                            <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>{this.props.message.content}</Comment.Text>
                        {this.props.auth.id === this.props.user.id ?
                            <Comment.Actions color='red'>
                                <Comment.Action onClick={this.handleDeleteMessage} ><Icon name='trash alternate outline'/></Comment.Action>
                            </Comment.Actions>
                            :
                            null
                        }
                    </Comment.Content>
                </Comment>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { deleteMessage })(ReservedMessage)
