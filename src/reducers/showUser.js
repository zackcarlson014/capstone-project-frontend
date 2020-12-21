export const showUser = (state=null, action) => {
    switch(action.type) {
        case 'SHOW_USER':
            return action.user
        case 'LOGOUT_USER':
            return null
        default:
            return state
    }

}

export default showUser