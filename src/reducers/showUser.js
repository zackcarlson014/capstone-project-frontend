export const showUser = (state=null, action) => {
    switch(action.type) {
        case 'SHOW_USER':
            return action.user
        case 'REMOVE_SHOW_USER':
            return null
        case 'LOGOUT_USER':
            return null
        default:
            return state
    }

}

export default showUser