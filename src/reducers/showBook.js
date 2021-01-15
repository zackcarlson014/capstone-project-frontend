export const showBook = (state=null, action) => {
    switch(action.type) {
        case 'SHOW_BOOK':
            return action.book
        case 'REMOVE_SHOW_BOOK':
            return null
        case 'LOGOUT_USER':
            return null
        default:
            return state
    }

}

export default showBook