export const allMessages = (state=[], action) => {
    let updatedMessages = []
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.messages
        case 'CURRENT_USER':
            return action.messages
            case 'ADD_MESSAGE':
                return [...state, action.message]
        case 'MARK_MESSAGES_SEEN':
            updatedMessages = state.map(m => {
                return {
                    ...m,
                    seen: true
                }
            });
            return updatedMessages
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default allMessages