export const notifications = (
  state = {
    inProgress: false
  },
  action
) => {
  switch(action.type) {
    case 'NOTIFICATION_START':
      return {
        ...state,
        error: '',
        inProgress: true
      }
    case 'NOTIFICATION':
      return {
        ...state,
        inProgress: false,
        data: action.data
      }
    case 'NOTIFICATION_ERROR':
      return {
        ...state,
        inProgress: false,
        error: action.data
      }
    default:
      return state;
  }
}