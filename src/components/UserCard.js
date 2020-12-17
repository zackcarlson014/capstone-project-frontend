import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Icon } from 'semantic-ui-react'

export class UserCard extends Component {
    render() {
        return (
            <div>
                <br/><br/><Card color='blue'>
                    <Image src={this.props.auth ? this.props.auth.picture : null} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>{this.props.auth ? this.props.auth.username : null}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Joined in 2020</span>
                        </Card.Meta>
                        <Card.Description>
                            {this.props.auth ? this.props.auth.bio : null}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                            <Icon name='user' />
                            22 Friends
                    </Card.Content>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(UserCard)
