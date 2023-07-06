import { User, UserState } from './userState'
import { UserAction } from './userAction'
import { storages } from '../../storage'
import jwt_decode from 'jwt-decode'

function decodeToken(token: string | null): UserState {
  try {
    if (token) {
      let user = jwt_decode<User>(token)
      return { user, token }
    }
  } catch (error) {
    console.error('fail to decode jwt:', error)
  }
  return {
    user: {
      role: 'guest',
    },
  }
}
function initialState(): UserState {
  let token = storages.token.getValue()
  return decodeToken(token)
}

export function userReducer(
  state: UserState = initialState(),
  action: UserAction
): UserState {
  switch (action.type) {
    case '@@User/login':
      return decodeToken(action.token)

    case '@@User/logout':
      return { user: { role: 'guest' } }

    case '@@User/loginFail':
      return { error: action.error, user: { role: 'guest' } }

    ////////////////////////////////

    case '@@User/changePassword':
      return decodeToken(action.token)

    case '@@User/changePasswordFail':
      return { error: action.error, user: { role: 'user' } }

    default:
      return state
  }
}
