export const friends = (state=[], action) => {
    let updatedFriends = [];
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return action.friends
        case 'CURRENT_USER':
            return action.friends
        case 'ADD_FRIEND_REQUEST':
            return [...state, action.friendReq]
        case 'APPROVE_FRIEND_REQUEST':
            updatedFriends = state.map(f => {
                if (action.id === f.id) {
                    return {
                        ...f,
                        pending: false
                    };
                } else {
                    return f
                };
            });
            return updatedFriends
        case 'LOGOUT_USER':
            return []
        default:
            return state
    }

}

export default friends