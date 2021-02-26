import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Comment, Icon } from 'semantic-ui-react';

export class MessageGroupItem extends Component {

    //parse and format date/time 
    dateTime = () => {
        let period = 'am';
        let hour = this.props.message.created_at.slice(11, 13); 
        if (parseInt(hour) > 12) {
            hour = String(parseInt(hour) - 12);
            period = 'pm';
        };
        let minutes = this.props.message.created_at.slice(14,16);
        let month = this.props.message.created_at.slice(5, 7);
        if (month[0] === '0') {
            month = month[1];
        };
        let day = this.props.message.created_at.slice(8, 10);
        if (day[0] === '0') {
            day = day[1];
        };
        let year = this.props.message.created_at.slice(2,4);
        return `${hour}:${minutes} ${period} ${month}/${day}/${year}`;
    };

    render() {
        return (
            <div>
                <Comment>
                    <Comment.Avatar src={this.props.user.prof_pic_url}/>
                    <Comment.Content>
                        <Comment.Author 
                            as={ Link } 
                            exact='true' 
                            to={this.props.user.id !== this.props.auth.id ? 
                                `/users/${this.props.user.id}` 
                                : 
                                '/profile'
                            }
                        >
                            {this.props.user.username}
                        </Comment.Author>
                        <Comment.Metadata>
                            <div>
                                {this.dateTime()}
                            </div>
                        </Comment.Metadata>
                        <Comment.Text>
                            {this.props.message.content}
                        </Comment.Text>
                    </Comment.Content>
                </Comment>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

export default connect(mapStateToProps, null)(MessageGroupItem);
