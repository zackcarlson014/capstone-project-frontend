export const allLibraryBooks = (state=[], action) => {
    let updatedBooks = []
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.all_lib_books
        case 'CURRENT_USER':
            return action.all_lib_books
        case 'ADD_LIBRARY_BOOK':
            if (state.find(b => b[2] === action.userBookId)) {
                return state
            } else {
                return [...state, [action.newLibBook, action.auth, action.userBookId, action.originalUserId]]
            }
        case 'UPDATE_LIBRARY_BOOK':
            updatedBooks = state.map(b => {
                if (b[2] === action.book[2]) {
                    return action.book
                } else {
                    return b
                }
            })
            return updatedBooks
        case 'DELETE_LIBRARY_BOOK':
            updatedBooks = state.filter(b => b[2] !== action.id)
            return updatedBooks
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default allLibraryBooks

