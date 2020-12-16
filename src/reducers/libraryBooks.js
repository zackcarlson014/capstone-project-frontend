const libraryBooks = (state=[], action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return [...action.library_books]
        default:
            return state
    }
}

export default libraryBooks