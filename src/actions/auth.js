export const loginSuccess = (user) => {
    return {
      type: 'LOGIN_SUCCESS',
      user
    }
  }
  
  export const logoutUser = () => {
    return {
      type: 'LOGOUT_USER',
    }
  }