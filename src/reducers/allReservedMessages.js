export const allReservedMessages = (state=[], action) => {
    let updatedMessages = []
    switch(action.type) {
        case 'SHOW_RESERVED_BOOK':
            return action.messages
        case 'REMOVE_SHOW_RESERVED_BOOK':
            return []
        case 'ADD_RESERVED_MESSAGE':
            return [...state, [action.message, action.user]]
        case 'DELETE_RESERVED_MESSAGE':
            updatedMessages = state.filter(m => m[0].id !== action.id)
            return updatedMessages
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default allReservedMessages