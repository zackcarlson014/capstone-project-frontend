const wishedBooks = (state=[], action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return [...action.wished_books]
        default:
            return state
    }
}

export default wishedBooks