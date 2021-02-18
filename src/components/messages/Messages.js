import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from '../NavBar'
import MessageItem from './MessageItem'
import Footer from '../Footer'
import { Grid, Header, Icon, Button, Loader } from 'semantic-ui-react'

export class Messages extends Component {

    state = {
        messages: []
    };

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/messages')
        .then(resp => resp.json())
        .then(messages => {
            this.setState({
                messages
            })
        })
    };

    myMessagesGrouped = () => {
        return Object.entries(this.myMessages().reduce((rv, i) => {
            (rv[i['res_book']] = rv[i['res_book']] || []).push(i);
            return rv;
        }, {})).sort((a, b) => 
            `${
                b[1][b[1].length - 1]['created_at'].slice(0,4) + 
                b[1][b[1].length - 1]['created_at'].slice(5,7) + 
                b[1][b[1].length - 1]['created_at'].slice(8,10) + 
                b[1][b[1].length - 1]['created_at'].slice(11,13) + 
                b[1][b[1].length - 1]['created_at'].slice(14,16) +
                b[1][b[1].length - 1]['created_at'].slice(17,19)
            }` - 
            `${
                a[1][a[1].length - 1]['created_at'].slice(0,4) + 
                a[1][a[1].length - 1]['created_at'].slice(5,7) + 
                a[1][a[1].length - 1]['created_at'].slice(8,10) + 
                a[1][a[1].length - 1]['created_at'].slice(11,13) + 
                a[1][a[1].length - 1]['created_at'].slice(14,16) +
                a[1][a[1].length - 1]['created_at'].slice(17,19)
            }`
        )
    };


    myMessages = () => {
        return this.state.messages.filter(m => m.user_id === this.props.auth.id || m.recipient_id === this.props.auth.id)
    }


    render() {
        debugger
        window.scrollTo(0, 0)
        if (!this.props.auth || !this.myMessages) {
            return <Grid style={{ height: '99vh' }}><Loader active /></Grid>
        } else {
            return (
                <div className='App'>
                    <NavBar/><br/>
                    <Grid style={{ minHeight: '99vh' }}>
                        <Grid.Row></Grid.Row>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column width='7'></Grid.Column>
                            <Grid.Column width='2'>
                                <Header as='h2' icon style={{color: 'white'}} textAlign="center">
                                    <Icon name='mail' circular />
                                    <Header.Content>
                                        Your Messages
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column width='7' textAlign='center'><Button icon='mail' content='new' color='blue'/></Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='12'>
                                {this.myMessagesGrouped().map(m => {
                                    return <MessageItem messageItem={m} currentUserId={this.props.auth.id}/>
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
