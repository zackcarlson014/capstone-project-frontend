const wishedBooks = (state=[], action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return [...action.wished_books]
        case 'CURRENT_USER':
            return [...action.wished_books]
        case 'ADD_WISHED_BOOK':
            return [...state, action.newWishBook]
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default wishedBooks