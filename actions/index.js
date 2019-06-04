export const Actions = {
  COMPONENT_INITIALIZING: 'COMPONENT_INITIALIZING',
  INVALID_SESSION:'INVALID_SESSION',
  LOGIN_BUTTON_ACTION:'LOGIN_BUTTON_ACTION',
  LOGIN_SUCCESS:'LOGIN_SUCCESS'

};

export function raiseAction(type, payload) {
  return {
    type,
    payload
  }
}
