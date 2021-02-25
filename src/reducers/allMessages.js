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
            const seenMessages = state.filter(m => 
                m.recipient_id === action.user).map(m => {
                return {
                    ...m,
                    seen: true
                }
            });
            const otherMessages = state.filter(m => m.recipient_id !== action.user)
            updatedMessages.push(...seenMessages, ...otherMessages)
            return updatedMessages
        case 'MARK_MESSAGES_READ':
            const readMessages = state.filter(m => 
                m.res_book === action.id && m.recipient_id === action.user).map(m => {
                return {
                    ...m,
                    read: true
                }
            });
            const sentMessages = state.filter(m => 
                m.res_book === action.id && m.recipient_id !== action.user)
            const additionalMessages = state.filter(m => m.res_book !== action.id)
            updatedMessages.push(...readMessages, ...sentMessages, ...additionalMessages)
            return updatedMessages
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default allMessages