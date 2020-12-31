export const loginSuccess = ({user, all_lib_books, all_wish_books, comments, reserved_books, reserved_messages}) => {
    return {
      type: 'LOGIN_SUCCESS',
      user,
      all_lib_books,
      all_wish_books,
      comments,
      reserved_books,
      reserved_messages
    }
  }

  export const currentUser = ({user, all_lib_books, all_wish_books, comments, reserved_books, reserved_messages}) => {
    return {
      type: 'CURRENT_USER',
      user,
      all_lib_books,
      all_wish_books,
      comments,
      reserved_books,
      reserved_messages
    }
  }

  export const updateUser = (user) => {
    return {
      type: 'UPDATE_USER',
      user
    }
  }
  
  export const logoutUser = () => {
    return {
      type: 'LOGOUT_USER',
    }
  }