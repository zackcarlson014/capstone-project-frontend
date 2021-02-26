import React, { Component } from 'react';
import { connect } from 'react-redux';
import { markMessagesSeen } from '../../actions/index';
import NavBar from '../NavBar';
import MessageItem from './MessageItem';
import MessageGroup from './MessageGroup';
import Footer from '../Footer';
import { Grid, Header, Segment, Icon, Image, Button, Loader } from 'semantic-ui-react';

export class Messages extends Component {

    state = {
        users: [],
        messageGroup: null
    };

    searchableMessages = () => {
        let matchedMessages = [];
        if (this.props.searchField) {
            const messages = this.props.messages.filter(m => 
                m.content.toLowerCase().includes(this.props.searchField.toLowerCase()))
            if (messages.length !== 0) {
                matchedMessages = messages
            } else {
                matchedMessages = this.props.messages
            }
        } else {
            matchedMessages = this.props.messages
        }
        return matchedMessages
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(users => {
            this.setState({
                users
            });
        });
    };

    componentWillUnmount() {
        const user = this.props.auth.id
        this.props.markMessagesSeen(user)
        this.markMessagesSeen(this.props.messages)
    };

    setMessageGroupView = (groupId) => {
        this.markMessagesSeen(this.props.messages)
        this.setState({
            messageGroup: groupId
        });
    };

    setMessageGroupUser = () => {
        const user = this.props.messages.find(message => 
           message.res_book === this.state.messageGroup
           &&
           message.user_id !== this.props.auth.id
        )
        return this.state.users.find(u => u.id === user.user_id)
    }

    setMessageGroup = (groupId) => {
        return this.props.messages.filter(message => 
            message.res_book === groupId).sort((a, b) => 
            `${
                a.created_at.slice(0,4) + 
                a.created_at.slice(5,7) + 
                a.created_at.slice(8,10) + 
                a.created_at.slice(11,13) + 
                a.created_at.slice(14,16) +
                a.created_at.slice(17,19)
            }` 
            - 
            `${
                b.created_at.slice(0,4) + 
                b.created_at.slice(5,7) + 
                b.created_at.slice(8,10) + 
                b.created_at.slice(11,13) + 
                b.created_at.slice(14,16) +
                b.created_at.slice(17,19)
            }`
        );
    };

    markMessagesSeen = (messages) => {
        const user = this.props.auth.id
        messages.filter(m => 
            m.seen === false
            &&
            m.recipient_id === user
        ).map(m => {
            return this.markMessageSeen(m); 
        });
    };

    markMessageSeen = (msg) => {
        const updatedMessage = {
            seen: true
        };
        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updatedMessage)
        };
        fetch(`http://localhost:3000/api/v1/messages/${msg.id}`, reqObj)
        .then(resp => resp.json())
    };

    myMessagesGrouped = () => {
        return Object.entries(this.searchableMessages().reduce((rv, i) => {
            (rv[i['res_book']] = rv[i['res_book']] || []).push(i);
            return rv;
        }, {})).map(m => m[1].sort((a, b) => 
            `${
                b.created_at.slice(0,4) + 
                b.created_at.slice(5,7) + 
                b.created_at.slice(8,10) + 
                b.created_at.slice(11,13) + 
                b.created_at.slice(14,16) +
                b.created_at.slice(17,19)
            }` 
            - 
            `${
                a.created_at.slice(0,4) + 
                a.created_at.slice(5,7) + 
                a.created_at.slice(8,10) + 
                a.created_at.slice(11,13) + 
                a.created_at.slice(14,16) +
                a.created_at.slice(17,19)
            }`
        )).sort((a, b) => 
            `${
                b[0]['created_at'].slice(0,4) + 
                b[0]['created_at'].slice(5,7) + 
                b[0]['created_at'].slice(8,10) + 
                b[0]['created_at'].slice(11,13) + 
                b[0]['created_at'].slice(14,16) +
                b[0]['created_at'].slice(17,19)
            }` 
            -
            `${
                a[0]['created_at'].slice(0,4) + 
                a[0]['created_at'].slice(5,7) + 
                a[0]['created_at'].slice(8,10) + 
                a[0]['created_at'].slice(11,13) + 
                a[0]['created_at'].slice(14,16) +
                a[0]['created_at'].slice(17,19)
            }`
        );
    };

    messageUser = (userId) => {
        return this.state.users.find(u => u.id === userId);
    };

    reservedBook = () => {
        const resBook = this.props.reservedBooks.find(b => 
            b.id === this.state.messageGroup
        );
        return this.props.allLibraryBooks.find(b => 
            b[2] === resBook.user_lib_book_id
        )
    };

    render() {
        window.scrollTo(0, 0);
        if (!this.props.auth || !this.state.users || !this.props.messages ) {
            return (
                <Grid style={{ height: '99vh' }}>
                    <Loader active />
                </Grid>
            );
        } else {
            return (
                <div className='App'>
                    <NavBar/><br/>
                    <Grid style={{ minHeight: '99vh' }}>
                        <Grid.Row></Grid.Row>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column width='7' textAlign='center'>
                                {this.state.messageGroup ? 
                                    <Button 
                                        icon='list' 
                                        content='Messages' 
                                        color='blue' 
                                        onClick={() => this.setMessageGroupView(null)}
                                    /> 
                                    : 
                                    null
                                }
                            </Grid.Column>
                            <Grid.Column width='2'>
                                <Header 
                                    as='h2' 
                                    icon 
                                    style={{color: 'white'}} 
                                    textAlign="center"
                                >
                                    <Icon name='mail' circular />
                                    <Header.Content>
                                        {this.state.messageGroup ? 
                                            `Reserved Book (${this.state.messageGroup}): Delivered` 
                                            : 
                                            'Your Messages'
                                        }
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            {this.state.messageGroup ?
                                <Grid.Column width='7' textAlign='center'>
                                    <Grid.Row>
                                        <Image 
                                            src={this.reservedBook()[0].image} 
                                            centered 
                                            size='tiny'
                                        />
                                    </Grid.Row><br/>
                                    <Grid.Row>
                                        <Header style={{color: 'white'}}>
                                            {this.reservedBook()[0].title}
                                        </Header>
                                        </Grid.Row>
                                </Grid.Column>
                                :
                                <Grid.Column width='7' textAlign='center'>
                                    <Button icon='mail' content='new' color='blue'/>   
                                </Grid.Column>
                            }
                        </Grid.Row>
                        {this.state.messageGroup ? 
                            <Grid.Row>
                                <Grid.Column width='3'></Grid.Column>
                                <Grid.Column width='10'>
                                    <Segment>
                                        <MessageGroup 
                                            messageGroup={this.setMessageGroup(this.state.messageGroup)}
                                            groupUser={this.setMessageGroupUser()}
                                            groupId={this.state.messageGroup}
                                        />
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column width='3'></Grid.Column>
                            </Grid.Row>
                            :
                            <Grid.Row>
                                <Grid.Column width='2'></Grid.Column>
                                <Grid.Column width='12' >
                                    {this.myMessagesGrouped().map((m, i) => {
                                        const userId = m[0].user_id === this.props.auth.id ? m[0].recipient_id : m[0].user_id
                                        return <MessageItem 
                                            key={i} 
                                            messageItem={m} 
                                            resBookId={m[0].res_book}
                                            authId={this.props.auth.id} 
                                            user={this.messageUser(userId)}
                                            setMessageGroupView={this.setMessageGroupView}
                                        />
                                    })}
                                </Grid.Column>
                                <Grid.Column width='2'></Grid.Column>
                            </Grid.Row>
                        }
                    </Grid><br/>
                    <Footer/>
                </div>
            );
        };  
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        messages: state.allMessages,
        allLibraryBooks: state.allLibraryBooks,
        reservedBooks: state.reservedBooks,
        searchField: state.searchField
    };
};

export default connect(mapStateToProps, { markMessagesSeen })(Messages);
