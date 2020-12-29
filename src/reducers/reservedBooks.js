export const reservedBooks = (state=[], action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.reserved_books
        case 'CURRENT_USER':
            return action.reserved_books
        case 'RESERVE_BOOK':
            return [...state, action.newReservedBook]
        default:
            return state
    }

}

export default reservedBooks