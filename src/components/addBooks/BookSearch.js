import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const BookSearch = (props) => {
    return (
        <div>
            <Form onSubmit={props.searchBook}>
                <Form.Field><input style={{width: '400px'}} type='text' onChange={props.handleSearch} placeholder='Search Books...'/><Button color='blue' type='submit'>Search</Button></Form.Field>
            </Form><br/>
        </div>
    )
}

export default BookSearch;