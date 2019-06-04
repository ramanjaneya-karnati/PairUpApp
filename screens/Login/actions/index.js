export const Actions = {
  LOGIN_COMPONENT_INIT: 'LOGIN_COMPONENT_INIT',
  SUBMIT_LOGIN: 'SUBMIT_LOGIN',
  SUBMIT_LOGIN_SUCCESS: 'SUBMIT_LOGIN_SUCCESS',
  SUBMIT_LOGIN_FAILURE: 'SUBMIT_LOGIN_FAILURE'
}

export function raiseAction(type, payload) {
  return {
    type,
    payload
  }
}
