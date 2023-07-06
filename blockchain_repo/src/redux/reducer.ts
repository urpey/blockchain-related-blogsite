import { RootState } from './state'
import { RootAction } from './action'
import { combineReducers, Reducer } from 'redux'
import { userReducer } from './user/userReducer'

export let reducer: Reducer<RootState, RootAction> = combineReducers({
  user: userReducer,
})
