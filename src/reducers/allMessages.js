export const allMessages = (state=[], action) => {
    let updatedMessages = []
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.messages
        case 'CURRENT_USER':
            return action.messages
        case 'ADD_MESSAGE':
            return [...state, action.msg]
        case 'MARK_MESSAGES_SEEN':
            updatedMessages = state.map(m => {
                return {
                    ...m,
                    seen: true
                }
            });
            return updatedMessages
        case 'MARK_MESSAGES_READ':
            const readMessages = state.filter(m => 
                m.res_book === action.id).map(m => {
                return {
                    ...m,
                    read: true
                }
            });
            const otherMessages = state.filter(m => m.res_book !== action.id)
            updatedMessages.push(...readMessages, ...otherMessages)
            return updatedMessages
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default allMessages