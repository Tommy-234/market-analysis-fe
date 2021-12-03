import { map } from 'lodash';

export const tableData = ( state = {}, action ) => {
  switch(action.type) {
    case 'TABLE_DATA_UPDATE':
      return action.data
    default:
      return state;
  }
}
  