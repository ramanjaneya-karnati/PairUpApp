export const Actions = {
  USER_CARDS_COMPONENT_INIT: 'USER_CARDS_COMPONENT_INIT',
  USER_CARDS_DATA_SUCCESS: 'USER_CARDS_DATA_SUCCESS',
  USER_CARDS_DATA_FAILURE: 'USER_CARDS_DATA_FAILURE',
  SELECTED_USER_PROFILE:'SELECTED_USER_PROFILE'

};

export function raiseAction(type, payload) {
  return {
    type,
    payload
  }
}
