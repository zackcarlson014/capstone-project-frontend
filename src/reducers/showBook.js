export const showBook = (state=null, action) => {
    switch(action.type) {
        case 'SHOW_BOOK':
            return [action.book, action.user]
        case 'LOGOUT_USER':
            return null
        default:
            return state
    }

}

export default showBook