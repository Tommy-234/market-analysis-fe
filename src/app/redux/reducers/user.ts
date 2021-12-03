
export const user = (
  state = {
    loggedIn: false,
    loginInProgress: false,
    createNewUser: false,
    newUserInProgress: false
  },
  action
) => {
  switch(action.type) {
    case 'USER_LOGIN_START':
      return {
        ...state,
        loginError: '',
        loginInProgress: true
      }
    case 'USER_LOGIN':
      return {
        ...state,
        loggedIn: true,
        loginInProgress: false,
        data: action.data
      }
    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        loginInProgress: false,
        loginError: action.data
      }
    case 'CREATE_NEW_USER':
      return {
        ...state,
        createNewUser: true
      }
    case 'NEW_USER_START':
      return {
        ...state,
        newUserError: '',
        newUserInProgress: true
      }
    case 'NEW_USER':
      return {
        ...state,
        createNewUser: false,
        newUserInProgress: false,
        newUser: action.data
      }
    case 'NEW_USER_ERROR':
      return {
        ...state,
        newUserInProgress: false,
        newUserError: action.data
      }
    case 'USER_LOGOUT':
      return {
        loggedIn: false,
        inProgress: false,
        newUserInProgress: false
      }
    default:
      return state;
  }
}
  