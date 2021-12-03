// Copied from:
//    https://react-redux.js.org/api/hooks#recipe-useactions

import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

export const useActions = actions => {
  const dispatch = useDispatch()
  return useMemo(
    () => {
      return bindActionCreators(actions, dispatch)
    },
    [dispatch]
  )
}