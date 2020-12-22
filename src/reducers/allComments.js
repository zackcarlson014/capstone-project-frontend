export const allComments = (state=[], action) => {
    let updatedComments = []
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.comments
        case 'CURRENT_USER':
            return action.comments
        case 'ADD_COMMENT':
            return [...state, [action.comment, action.user]]
        // case 'DELETE_COMMENT':
        //     updatedComments = state.filter(b => b[2] !== action.id)
        //     return updatedComments
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default allComments