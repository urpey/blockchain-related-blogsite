import { post } from '../../api'
import { storages } from '../../storage'
import { RootDispatch } from '../dispatch'
import { changePasswordAction, changePasswordFailedAction, loginAction, loginFailedAction, logoutAction } from './userAction'

export function loginThunk(user: { username: string; password: string }) {
  return (dispatch: RootDispatch) => {
    post('/login', user, (json) => {
      if (json.error) {
        dispatch(loginFailedAction(json.error))
      } else {
        dispatch(loginAction(json.token))
        storages.token.setValue(json.token)
      }
    })
  }
}

export function logoutThunk() {
  return (dispatch: RootDispatch) => {
    storages.token.clear()
    dispatch(logoutAction())
  }
}

export function changePasswordThunk(user: { username: string; password: string }) {
  return (dispatch: RootDispatch) => {
    post('/login', user, (json) => {
      if (json.error) {
        dispatch(changePasswordFailedAction(json.error))
      } else {
        dispatch(changePasswordAction(json.token))
        storages.token.setValue(json.token)
      }
    })
  }
}