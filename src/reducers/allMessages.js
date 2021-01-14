export const allMessages = (state=[], action) => {
    let updatedMessages = []
    switch(action.type) {
        // case 'LOGIN_SUCCESS':
        //     return action.reserved_messages
        // case 'CURRENT_USER':
        //     return action.reserved_messages
        case 'RESERVED_BOOK_MESSAGES':
            return action.messages
        case 'ADD_MESSAGE':
            return [...state, [action.message, action.user]]
        case 'DELETE_MESSAGE':
            updatedMessages = state.filter(m => m[0].id !== action.id)
            return updatedMessages
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default allMessages