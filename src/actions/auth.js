export const loginSuccess = ({user, library_books, wished_books, all_lib_books, all_wish_books}) => {
    return {
      type: 'LOGIN_SUCCESS',
      user,
      library_books,
      wished_books,
      all_lib_books,
      all_wish_books
    }
  }

  export const currentUser= ({user, library_books, wished_books, all_lib_books, all_wish_books}) => {
    return {
      type: 'CURRENT_USER',
      user,
      library_books,
      wished_books,
      all_lib_books,
      all_wish_books
    }
  }
  
  export const logoutUser = () => {
    return {
      type: 'LOGOUT_USER',
    }
  }