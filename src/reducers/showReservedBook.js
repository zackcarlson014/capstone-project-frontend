export const showReservedBook = (state=null, action) => {
    switch(action.type) {
        case 'SHOW_RESERVED_BOOK':
            return [action.book, action.user, action.libBookId]
        case 'LOGOUT_USER':
            return null
        default:
            return state
    }

}

export default showReservedBook