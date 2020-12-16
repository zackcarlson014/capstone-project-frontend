import React, { Component } from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

export class WishedBookCard extends Component {
    render() {
        return (
            <Card color='blue'>
                <Image src='https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png' wrapped ui={false} width='300px' height='300px'/>
                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Published in 2020</span>
                    </Card.Meta>
                    <Card.Description>
                        By: {this.props.author}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                        <Icon name='user' />
                        22 Wishes
                </Card.Content>
            </Card>
        )
    }
}

export default WishedBookCard
