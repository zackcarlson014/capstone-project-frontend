export const loginSuccess = ({user, library_books, wished_books}) => {
    return {
      type: 'LOGIN_SUCCESS',
      user,
      library_books,
      wished_books
    }
  }

  export const currentUser= ({user, library_books, wished_books}) => {
    return {
      type: 'CURRENT_USER',
      user,
      library_books,
      wished_books
    }
  }
  
  export const logoutUser = () => {
    return {
      type: 'LOGOUT_USER',
    }
  }