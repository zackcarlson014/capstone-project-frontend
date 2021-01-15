export const loginSuccess = ({user, all_lib_books, all_wish_books, comments, reserved_books, my_likes}) => {
    return {
      type: 'LOGIN_SUCCESS',
      user,
      all_lib_books,
      all_wish_books,
      comments,
      reserved_books,
      my_likes
    }
  }

  export const currentUser = ({user, all_lib_books, all_wish_books, comments, reserved_books, my_likes}) => {
    return {
      type: 'CURRENT_USER',
      user,
      all_lib_books,
      all_wish_books,
      comments,
      reserved_books,
      my_likes
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