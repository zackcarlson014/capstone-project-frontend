export const allWishedBooks = (state=[], action) => {
    let updatedBooks = []
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.all_wish_books
        case 'CURRENT_USER':
            return action.all_wish_books
        case 'ADD_WISHED_BOOK':
            return [...state, [action.newWishBook, action.auth, action.userBookId]]
        case 'DELETE_WISHED_BOOK':
            updatedBooks = state.filter(b => b[2] !== action.id)
            return updatedBooks
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default allWishedBooks
