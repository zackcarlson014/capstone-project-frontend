import React, { Component } from 'react'
import { connect } from 'react-redux';
import FriendRequestItem from './FriendRequestItem';
import { Grid, Loader } from 'semantic-ui-react';


export class FriendRequests extends Component {

    render() {
        if (!this.props.requestObjects) {
            return <Grid style={{ height: '99vh' }}><Loader active /></Grid>;
        } else {
            return (
                <div>
                    {this.props.requestObjects.map((r, i) => {
                        return <FriendRequestItem key={i} request={r.request} user={r.user}/>
                    })}
                </div>
            );
        }
    };
};

export default connect()(FriendRequests);
