export const reservedBooks = (state=[], action) => {
    let updatedBooks = []
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.reserved_books
        case 'CURRENT_USER':
            return action.reserved_books
        case 'ADD_RESERVED_BOOK':
            return [...state, action.newReservedBook]
        case 'UPDATE_RESERVED_BOOK':
        updatedBooks = state.map(b => {
            if (b.id === action.book.id) {
                return action.book
            } else {
                return b
            }
        })
            return updatedBooks
        case 'DELETE_RESERVED_BOOK':
            updatedBooks = state.filter(b => b.id !== action.id)
            return updatedBooks
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }

}

export default reservedBooks