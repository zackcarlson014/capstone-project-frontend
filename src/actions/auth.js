export const loginSuccess = ({user, all_lib_books, all_wish_books, comments}) => {
    return {
      type: 'LOGIN_SUCCESS',
      user,
      all_lib_books,
      all_wish_books,
      comments
    }
  }

  export const currentUser= ({user, all_lib_books, all_wish_books, comments}) => {
    return {
      type: 'CURRENT_USER',
      user,
      all_lib_books,
      all_wish_books,
      comments
    }
  }
  
  export const logoutUser = () => {
    return {
      type: 'LOGOUT_USER',
    }
  }