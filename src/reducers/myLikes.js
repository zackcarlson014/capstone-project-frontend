export const myLikes = (state=[], action) => {
    let updatedLikes = []
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.my_likes
        case 'CURRENT_USER':
            return action.my_likes
        case 'ADD_LIKE':
            if (state.find(l => l === action.like)) {
                return state
            } else {
                return [...state, {id: action.id, comment_id: action.like}]
            }
        case 'DELETE_LIKE':
            updatedLikes = state.filter(l => l.comment_id !== action.like)
            return updatedLikes
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }

}

export default myLikes