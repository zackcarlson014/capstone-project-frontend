import React from 'react'
import { Form, Button, Icon } from 'semantic-ui-react'

const BookSearch = (props) => {
    return (
        <div>
            <Form onSubmit={props.searchBook}>
                <Form.Field>
                    <input 
                        style={{width: '400px'}} 
                        type='text' 
                        value={props.searchField} 
                        onChange={props.handleSearch} 
                        placeholder='Search Books...'
                    />
                    <Button color='blue' animated='fade' icon='search' type='submit'>
                        <Button.Content visible>
                            <Icon name='search'/>
                        </Button.Content>
                        <Button.Content hidden>
                            Search
                        </Button.Content>
                    </Button>
                    {/* <Button as={ Link } exact='true' to={`/users/${this.props.user.id}`} animated='fade' icon='user' color='green'>
                        <Button.Content visible>
                            <Icon name='user'/>
                        </Button.Content>
                        <Button.Content hidden>
                            {this.props.user.username}
                        </Button.Content>
                    </Button> */}
                </Form.Field>
            </Form><br/>
        </div>
    );
};

export default BookSearch;