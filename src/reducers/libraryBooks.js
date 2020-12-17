export const libraryBooks = (state=[], action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return [...action.library_books]
        case 'CURRENT_USER':
            return [...action.library_books]
        case 'ADD_LIBRARY_BOOK':
            return [...state, action.newLibBook]
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }
}

export default libraryBooks