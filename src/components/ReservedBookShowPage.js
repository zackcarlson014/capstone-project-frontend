import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ReservedBookShowPage extends Component {
    render() {
        return (
            <div>
                Hello
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        showBook: state.showBook
    }
}

export default connect(mapStateToProps, null)(ReservedBookShowPage)
