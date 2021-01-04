export const reservedBooks = (state=[], action) => {
    let updatedBooks = []
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.reserved_books
        case 'CURRENT_USER':
            return action.reserved_books
        case 'RESERVE_BOOK':
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
        default:
            return state
    }

}

export default reservedBooks