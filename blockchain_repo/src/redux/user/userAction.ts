export function loginAction(token: string) {
  return {
    type: '@@User/login' as const,
    token,
  }
}

export function logoutAction() {
  return {
    type: '@@User/logout' as const,
  }
}

export function loginFailedAction(error: string) {
  return { type: '@@User/loginFail' as const, error }
}

export function changePasswordAction(token: string) {
  return {
    type: '@@User/changePassword' as const,
    token,
  }
}
export function changePasswordFailedAction(error: string) {
  return {
    type: '@@User/changePasswordFail' as const,
    error,
  }
}

export type UserAction =
  | ReturnType<typeof loginAction>
  | ReturnType<typeof logoutAction>
  | ReturnType<typeof loginFailedAction>
  | ReturnType<typeof changePasswordAction>
  | ReturnType<typeof changePasswordFailedAction>
