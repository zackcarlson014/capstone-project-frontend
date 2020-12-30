import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Comment, Form, Header } from 'semantic-ui-react'

export class ReservedMessages extends Component {

    state = {
        content: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div>
                <Comment.Group size='large'>
                    <Header as='h3' dividing>
                        Messages
                    </Header>
                    <Form reply onSubmit={this.handleSubmit}>
                        <Form.TextArea onChange={this.handleInputChange} name='content' value={this.state.content}/>
                        <Button type='submit' content='Add Reply' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
            </div>
        )
    }
}

export default ReservedMessages
