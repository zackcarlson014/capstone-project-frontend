export const allWishedBooks = (state=[], action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.all_wish_books
        case 'CURRENT_USER':
            return action.all_wish_books
        case 'ADD_WISHED_BOOK':
            return [...state, action.newWishBook]
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default allWishedBooks
