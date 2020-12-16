export const libraryBooks = (state=[], action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return [...action.library_books]
        case 'ADD_LIBRARY_BOOK':
            return [...state, action.newLibBook]
        default:
            return state
    }
}

export default libraryBooks