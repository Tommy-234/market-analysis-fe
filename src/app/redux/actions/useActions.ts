import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

// Copied from:
//    https://react-redux.js.org/api/hooks#recipe-useactions
export const useActions = actions => {
  const dispatch = useDispatch()
  return useMemo(
    () => {
      return bindActionCreators(actions, dispatch)
    },
    [dispatch]
  )
};
