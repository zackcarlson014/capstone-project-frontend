export const showReservedBook = (state=null, action) => {
    switch(action.type) {
        case 'SHOW_RESERVED_BOOK':
            return [action.book, action.user, action.libBookId, action.id]
        case 'REMOVE_SHOW_RESERVED_BOOK':
            return null
        case 'LOGOUT_USER':
            return null
        default:
            return state
    }

}

export default showReservedBook