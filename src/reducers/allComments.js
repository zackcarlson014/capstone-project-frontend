export const allComments = (state=[], action) => {
    let updatedComments = []
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.comments
        case 'CURRENT_USER':
            return action.comments
        case 'ADD_COMMENT':
            return [...state, [action.comment, action.user, action.likes]]
        case 'ADD_LIKE':
            updatedComments = state.map(c => {
                if (c[0].id === action.comment.id) {
                    return [action.comment, action.user, action.likes]
                }
                else {
                    return c
                }
            })
            return updatedComments 
        case 'DELETE_COMMENT':
            updatedComments = state.filter(c => c[0].id !== action.id)
            return updatedComments
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default allComments