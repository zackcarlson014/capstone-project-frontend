export const searchField = (state=null, action) => {
    switch(action.type) {
        case 'SEARCH_BOOKS':
            return action.string
        case 'CLEAR_SEARCH':
            return null
        case 'LOGOUT_USER':
            return null
        default:
            return state
    }

}

export default searchField