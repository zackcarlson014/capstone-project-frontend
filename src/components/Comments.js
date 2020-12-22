import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../actions/index.js'
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import CommentItem from './Comment.js'

export class Comments extends Component {

    state = {
        // comments: [],
        content: ''
    }
    
    // componentDidMount() {
    //     fetch('http://localhost:3000/api/v1/comments')
    //     .then(resp => resp.json())
    //     .then(comments => {
    //         this.setState({
    //             comments: comments
    //         })
    //     })
    // }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const newComment = {
            user_id: this.props.auth.id,
            book_id: this.props.book.id,
            content: this.state.content
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newComment)
        }

        fetch('http://localhost:3000/api/v1/comments', reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.addComment(data, this.props.auth)
            this.setState({
                content: ''
            })
        })
    }

    render() {
        return (
            <div>
                <Comment.Group>
                    <Header as='h3' dividing>
                    Comments
                    </Header>
                    <div>
                        {this.props.comments.map((comment, i) => {
                            return <CommentItem comment={comment[0]} user={comment[1]}/>
                        })}
                    </div>
                    <Form reply onSubmit={this.handleSubmit}>
                        <Form.TextArea onChange={this.handleInputChange} name='content' value={this.state.content}/>
                        <Button type='submit' content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps, { addComment })(Comments)