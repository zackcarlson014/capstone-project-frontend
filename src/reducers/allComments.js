export const allComments = (state=[], action) => {
    let updatedComments = []
    switch(action.type) {
        case 'SHOW_BOOK':
            return action.comments
        case 'REMOVE_SHOW_BOOK':
            return []
        case 'ADD_COMMENT':
            return [...state, [action.comment, action.user, action.likes]]
        case 'ADD_COMMENT_LIKE':
            updatedComments = state.map(c => {
                if (c[0].id === action.comment.id) {
                    return [action.comment, action.user, action.likes]
                }
                else {
                    return c
                }
            })
            return updatedComments 
        case 'DELETE_LIKE':
            updatedComments = state.map(c => {
                if (c[0].id === action.like) {
                    return [c[0], c[1], action.likes]
                } else {
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