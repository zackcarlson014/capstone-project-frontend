import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from '../NavBar'
import MessageItem from './MessageItem'
import Footer from '../Footer'
import { Grid, Header, Icon, Loader } from 'semantic-ui-react'

export class Messages extends Component {

    state = {
        messages: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/messages')
        .then(resp => resp.json())
        .then(messages => {
            this.setState({
                messages
            })
        })
    }

    myMessages = () => {
        return this.state.messages.filter(m => m.user_id === this.props.auth.id || m.recipient_id === this.props.auth.id)
    }


    render() {
        window.scrollTo(0, 0)
        if (!this.props.auth || !this.myMessages) {
            return <Grid style={{ height: '99vh' }}><Loader active /></Grid>
        } else {
            return (
                <div className='App'>
                    <NavBar/><br/><br/>
                    <Header as='h2' icon style={{color: 'white'}} textAlign="center">
                            <Icon name='mail' circular />
                            <Header.Content>
                                Your Messages
                            </Header.Content>
                    </Header><br/>
                    <Grid style={{ height: '99vh' }}>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='12'>
                                {this.myMessages().map(m => {
                                    if (m.user_id === this.props.auth.id){
                                        return <MessageItem messageItem={m} messageSent={true}/>
                                    } else {
                                        return <MessageItem messageItem={m}/>
                                    }
                                })}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid><br/>
                    <Footer/>
                </div>
            )
        }    
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(Messages)
