
export const user = (
  state = {
    loggedIn: false,
    inProgress: false
  },
  action
) => {
  switch(action.type) {
    case 'USER_LOGIN_START':
      return {
        loggedIn: false,
        inProgress: true
      }
    case 'USER_LOGIN':
      return {
        loggedIn: true,
        data: action.data
      }
    case 'USER_LOGIN_ERROR':
      return {
        loggedIn: false,
        inProgress: false,
        error: action.data
      }
    case 'USER_LOGOUT':
      return {
        loggedIn: false,
        inProgress: false
      }
    default:
      return state;
  }
}
  