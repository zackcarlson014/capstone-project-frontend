import React, { Component } from 'react'
import { connect } from 'react-redux'
import { currentUser } from '../actions/auth'
// import BookSearch from './BookSearch.js'
// import BookList from './BookList.js'
// import request from 'superagent';

export class Profile extends Component {

    componentDidMount() {
        if (!this.props.auth) {
            this.props.history.push('/login')
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, null)(Profile)
